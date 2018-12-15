'use strict';
const _ = require("underscore");

const putArrayType = subType => {
  return `array<${subType}>`;
}

const putMapType = subType => {
    return `map<${subType}>`;
}

const fieldTypes = {
  number: 'number',    
  boolean: 'boolean',   
  string: 'string',  
  array: putArrayType,   
  object: 'object',
  map: putMapType,
};

class SanitizeError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, SanitizeError);
  }
}


const getType = def => {
  if (!def.type) return null;
  const isArray = def.type.match(/^array<(.+?)>$/);
  const isMap = def.type.match(/^map<(.+?)>$/)
  if (isArray) {
    return { type: 'array', subType: fieldTypes[isArray[1]]};
  }
  if (isMap) {
      return { type: 'map', subType: fieldTypes[isMap[1]]};
  }
  return {type: fieldTypes[def.type]};
}

const validate = (obj, def) => {
  if (def.validation) {

    let valid = false;
    try { 
      valid = def.validation(obj);
    } catch (e) {  
      throw new SanitizeError(`${def.name ? def.name + ':' : 'input' } is invalid. ${e.message}`);
    }

    if (!valid) {
      throw new SanitizeError(`${def.name ? def.name + ':' : 'input' } is invalid.`);
    }
  }
}

const checkBoolean = (obj, def) => {
  // convert strings to booleans
  if (_.isString(obj)) {
    obj = obj.toLowerCase();
    if (obj === 'true') obj = true;
    if (obj === 'false') obj = false;
  }

  if (_.isBoolean(obj)) {
    validate(obj, def);
    //if there is a mutate attribute then do mutate after validation
    if (def.mutate) obj = _.isFunction(def.mutate) ? def.mutate(obj) : obj;
    return obj;
  }
  
  throw new SanitizeError(`${def.name ? def.name + ': ' : '' }expected type ${def.type}.`);
}

const checkString = (obj, def) => {
  // convert number and boolean types to strings
  if (_.isBoolean(obj) || _.isNumber(obj) && !_.isNaN(obj)) {
    obj = `${obj}`;
  }

  if (_.isString(obj)) {
    validate(obj, def);
    //if there is a mutate attribute then do mutate after validation
    if (def.mutate) obj = _.isFunction(def.mutate) ? def.mutate(obj) : obj;
    return obj;
  }

  throw new SanitizeError(`${def.name ? def.name + ': ' : '' }expected type ${def.type}.`);
}

const checkNumber = (obj, def) => {
  // convert strings representing numbers to numbers
  if (_.isString(obj)) {
    obj = +obj;
  }  

  if (_.isNumber(obj) && !_.isNaN(obj)) {
    validate(obj, def);
    //if there is a mutate attribute then do mutate after validation
    if (def.mutate) obj = _.isFunction(def.mutate) ? def.mutate(obj) : obj;
    return obj;
  }

  throw new SanitizeError(`${def.name ? def.name + ': ' : '' }expected type ${def.type}.`);
}

const fieldChecks = {
  number: checkNumber,   
  boolean: checkBoolean,
  string: checkString,   
  array: checkArray,
  object: checkObject,  
};

function checkObject(obj, def) {
  if (!_.isObject(obj)) {
    throw new SanitizeError(`${def.name ? def.name + ': ' : '' }expected type ${def.type}.`); 
  }
 
  // if no fields property is defined then all we can do is return the unfiltered object
  if (!def.fields) return obj;

  let filtered = {};
  def.fields.forEach( field => {
    // if the field has no name we cant find it in the object
    if (!field.name) return;
    
    const o = obj[field.name];
    // check that the required fields exist
    if (o === undefined && field.required) {
      throw new SanitizeError(`${field.name}: required field not found.`);
    }

    // if the object does not include the field there is nothing to sanitize
    if (o === undefined) return;

    // map any names if specified
    let name = field.name;
    if (field.map) name = _.isString(field.map) ? field.map: `${field.map}`;
    
    //type check and validate the fields
    const sanitized = sanitize(o, field);
    if (sanitized) {
      filtered[name] = sanitized;
    }
  
  });

  // if there is a mutate property mutate the filtered object
  if (def.mutate) filtered = _.isFunction(def.mutate) ? def.mutate(filtered) : filtered;

  return filtered;
}

function checkMap(obj, def) {
  if (!_.isObject(obj)) {
    throw new SanitizeError(`${def.name ? def.name + ': ' : '' }expected type ${def.type}.`);
  }

  const mapType = getType(def);
  // subdef follows array def except for type, ie validators follow through
  const subDef = {... def, type: mapType.subType};
  // type check and validate the elements in array
  let newMap = {};
  try {
    Object.keys(obj).forEach( key => {
      const o = obj[key];
      const sanitized = sanitize(o, subDef);
      if (sanitized) {
        newMap[key] = sanitized;
      }
    });
  } catch (e) {
    if (e.message.match(/expected type/)) throw new SanitizeError(`${def.name ? def.name + ': ' : '' }expected type ${def.type}.`);
    throw e
  }

  return newMap;  
}
 
function checkArray(obj, def) {
  if (!_.isArray(obj)) {
    throw new SanitizeError(`${def.name ? def.name + ': ' : '' }expected type ${def.type}.`);
  }
  
  const arrayType = getType(def);
  // subdef follows array def except for type, ie validators follow through
  const subDef = {... def, type: arrayType.subType};
  

  // type check and validate the elements in array
  let newArray = [];
  try {
    obj.forEach( o => {
      const sanitized = sanitize(o, subDef);
      if (sanitized) {
        newArray.push(sanitized);
      }
    });
  } catch (e) {
    if (e.message.match(/expected type/)) throw new SanitizeError(`${def.name ? def.name + ': ' : '' }expected type ${def.type}.`);
    throw e
  }

  return newArray;
 }

function sanitize(obj , def) {
  const type = getType(def)
  if (!type) return obj;
  return fieldChecks[type.type](obj, def);
}

module.exports = {
  sanitize,
  putArrayType,
  putMapType,
  fieldTypes,
  SanitizeError,
}
