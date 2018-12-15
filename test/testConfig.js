const sanity = require('../src');
const fieldTypes = sanity.fieldTypes;
const putArrayType = sanity.putArrayType;
const putMapType = sanity.putMapType;
const shoulds = require("../lib/functionTest").shoulds;

const manifest = {
  function: sanity.sanitize,
  testCases: [
    // integer definitions
    {
      description: "number input, number definition",
      should: shoulds.pass,
      args: [
        1,
        {type: fieldTypes.number, }
      ],
      return: 1,
    },
    {
      description: "boolean input, number definition",
      should: shoulds.throw,
      args: [
        true,
        {type: fieldTypes.number, }
      ],
      return: "expected type number",
    },
    {
      description: "string '1' input, number definition",
      should: shoulds.pass,
      args: [
        '1',
        {type: fieldTypes.number, }
      ],
      return: 1
    },
    {
      description: "string 'abc' input, number definition",
      should: shoulds.throw,
      args: [
        'abc',
        {type: fieldTypes.number, }
      ],
      return: 'expected type number'
    },

    // boolean definitons
    {
      description: "boolean input, boolean definition",
      should: shoulds.pass,
      args: [
        true,
        {type: fieldTypes.boolean, }
      ],
      return: true,
    },
    {
      description: "string 'true' input, boolean definiton",
      should: shoulds.pass,
      args: [
        "true",
        {type: fieldTypes.boolean, }
      ],
      return: true,
    },
    {
      description: "string 'abc' input, boolean definiton",
      should: shoulds.throw,
      args: [
        "abc",
        {type: fieldTypes.boolean, }
      ],
      return: 'expected type boolean',
    },
    {
      description: `${putArrayType(fieldTypes.number)} input, boolean definiton`,
      should: shoulds.throw,
      args: [
        [1,2,3],
        {type: fieldTypes.boolean, }
      ],
      return: 'expected type boolean',
    },
    {
      description: "object input, boolean definiton",
      should: shoulds.throw,
      args: [
        {param1: 1},
        {type: fieldTypes.boolean, }
      ],
      return: 'expected type boolean',
    },

    // string definitions
    {
      description: "number input, string definiton",
      should: shoulds.pass,
      args: [
        1,
        {type: fieldTypes.string, }
      ],
      return: '1',
    },
    {
      description: "boolean input, string definiton",
      should: shoulds.pass,
      args: [
        true,
        {type: fieldTypes.string, }
      ],
      return: 'true',
    },
    {
      description: "string 'abc' input, string definiton",
      should: shoulds.pass,
      args: [
        'abc',
        {type: fieldTypes.string, }
      ],
      return: 'abc',
    },
    {
      description: `${putArrayType('number')} input, string definiton`,
      should: shoulds.throw,
      args: [
        [1,2,3],
        {type: fieldTypes.string, }
      ],
      return: 'expected type string',
    },
    {
      description: "object input, string definiton",
      should: shoulds.throw,
      args: [
        {param1: 1},
        {type: fieldTypes.string, }
      ],
      return: 'expected type string',
    },
    
    // array definitions
    {
      description: `number input, ${putArrayType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        1,
        {type: putArrayType(fieldTypes.number), }
      ],
      return: `expected type ${putArrayType(fieldTypes.number)}`,
    },
    {
      description: `empty array input, ${putArrayType(fieldTypes.number)}  definiton`,
      should: shoulds.pass,
      args: [
        [],
        {type: putArrayType(fieldTypes.number), }
      ],
      return: [],
    },
    {
      description: `${putArrayType(fieldTypes.number)} input, ${putArrayType(fieldTypes.number)} definiton`,
      should: shoulds.pass,
      args: [
        [1],
        {type: putArrayType(fieldTypes.number), }
      ],
      return: [1],
    },
    {
      description: `${putArrayType(putArrayType(fieldTypes.number))} input, ${putArrayType(fieldTypes.number)} definiton`,
      should: shoulds.pass,
      args: [
        [[1,2,3]],
        {type: putArrayType(putArrayType(fieldTypes.number)), }
      ],
      return: [[1,2,3]],
    },
    {
      description: `string 'abc' input, ${putArrayType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        'abc',
        {type: putArrayType(fieldTypes.number), }
      ],
      return: `expected type ${putArrayType(fieldTypes.number)}`,
    },
    {
      description: `boolean input, ${putArrayType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        true,
        {type: putArrayType(fieldTypes.number), }
      ],
      return: `expected type ${putArrayType(fieldTypes.number)}`,
    },
    {
      description: `object input, ${putArrayType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        {param: 1},
        {type: putArrayType(fieldTypes.number), }
      ],
      return: `expected type ${putArrayType(fieldTypes.number)}`,
    },
    {
      description: `${putArrayType(fieldTypes.boolean)} input, ${putArrayType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        [true, false],
        {type: putArrayType(fieldTypes.number), }
      ],
      return: `expected type ${putArrayType(fieldTypes.number)}`,
    },
    {
      description: `${putArrayType(fieldTypes.boolean)} input, ${putArrayType(fieldTypes.string)} definiton`,
      should: shoulds.pass,
      args: [
        [true, false],
        {type: putArrayType(fieldTypes.string), }
      ],
      return: ['true', 'false'],
    },
    {
      description: `${putArrayType(fieldTypes.object)} input, ${putArrayType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        [{param:1}, {param:2}],
        {type: putArrayType(fieldTypes.number), }
      ],
      return: `expected type ${putArrayType(fieldTypes.number)}`,
    },
    {
      description: `${putArrayType(fieldTypes.object)} input, ${putArrayType(fieldTypes.object)} definiton`,
      should: shoulds.pass,
      args: [
        [{param:1}, {param:2}],
        {type: putArrayType(fieldTypes.object), fields: [{name: 'param', type: fieldTypes.number}]}
      ],
      return: [{param:1}, {param:2}],
    },

    // map definitions
    {
      description: `number input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        1,
        {type: putMapType(fieldTypes.number), }
      ],
      return: `expected type ${putMapType(fieldTypes.number)}`,
    },
    {
      description: `empty array input, ${putMapType(fieldTypes.number)}  definiton`,
      should: shoulds.throw,
      args: [
        [],
        {type: putMapType(fieldTypes.number), }
      ],
      return: `expected type ${putMapType(fieldTypes.number)}`,
    },
    {
      description: `empty map input, ${putMapType(fieldTypes.number)}  definiton`,
      should: shoulds.pass,
      args: [
        {},
        {type: putMapType(fieldTypes.number), }
      ],
      return: {},
    },
    {
      description: `${putArrayType(fieldTypes.number)} input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        [1],
        {type: putMapType(fieldTypes.number), }
      ],
      return: `expected type ${putMapType(fieldTypes.number)}`,
    },
    {
      description: `${putMapType(fieldTypes.number)} input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.pass,
      args: [
        {key1: 1},
        {type: putMapType(fieldTypes.number), }
      ],
      return: {key1: 1},
    },
    {
      description: `${putMapType(putMapType(fieldTypes.number))} input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.pass,
      args: [
        {outerKey: { innerKey1: 1, interKey2: 2, innerKey3: 3}},
        {type: putMapType(putMapType(fieldTypes.number)), }
      ],
      return: {outerKey: { innerKey1: 1, interKey2: 2, innerKey3: 3}},
    },
    {
      description: `string 'abc' input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        'abc',
        {type: putMapType(fieldTypes.number), }
      ],
      return: `expected type ${putMapType(fieldTypes.number)}`,
    },
    {
      description: `boolean input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        true,
        {type: putMapType(fieldTypes.number), }
      ],
      return: `expected type ${putMapType(fieldTypes.number)}`,
    },
    {
      description: `object with mixed value types as input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        {param: 1,
        param2: "hello"},
        {type: putMapType(fieldTypes.number), }
      ],
      return: `expected type ${putMapType(fieldTypes.number)}`,
    },
    {
      description: `${putMapType(fieldTypes.boolean)} input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        {key1: true, key2: false},
        {type: putMapType(fieldTypes.number), }
      ],
      return: `expected type ${putMapType(fieldTypes.number)}`,
    },
    {
      description: `${putMapType(fieldTypes.boolean)} input, ${putMapType(fieldTypes.string)} definiton`,
      should: shoulds.pass,
      args: [
        {key1: true, key2: false},
        {type: putMapType(fieldTypes.string), }
      ],
      return: {key1: 'true', key2: 'false'},
    },
    {
      description: `${putMapType(fieldTypes.object)} input, ${putMapType(fieldTypes.number)} definiton`,
      should: shoulds.throw,
      args: [
        {key1: {param:1}, key2: {param:2}},
        {type: putMapType(fieldTypes.number), }
      ],
      return: `expected type ${putMapType(fieldTypes.number)}`,
    },
    {
      description: `${putMapType(fieldTypes.object)} input, ${putMapType(fieldTypes.object)} definiton`,
      should: shoulds.pass,
      args: [
        {key1: {param:1}, key2: {param:2}},
        {type: putMapType(fieldTypes.object), fields: [{name: 'param', type: fieldTypes.number}]}
      ],
      return: {key1: {param:1}, key2: {param:2}},
    },
    
    // object definitons
    {
      description: "number input, object definiton",
      should: shoulds.throw,
      args: [
        1,
        {type: fieldTypes.object, }
      ],
      return: 'expected type object',
    },
    {
      description: "object input, object definiton",
      should: shoulds.pass,
      args: [
        {
          integer: 1,
          boolean: true,
          string: 'hello',
          array: [1,2,3],
          object: {param1: 1, param2: 2}
        },
        {
          type: fieldTypes.object, 
          fields: [
            {name: 'integer', type: fieldTypes.number},
            {name: 'boolean', type: fieldTypes.boolean},
            {name: 'string', type: fieldTypes.string},
            {name: 'array', type: putArrayType(fieldTypes.number)},
            {name: 'object', type: fieldTypes.object, 
              fields: [
                {name: 'param1', type: fieldTypes.number},
                {name: 'param2', type: fieldTypes.number},
              ]}
          ]
        }
      ],
      return: {
        integer: 1,
        boolean: true,
        string: 'hello',
        array: [1,2,3],
        object: {param1: 1, param2: 2}
      },
    },
    {
      description: "object input, object definiton, remove fields not in def",
      should: shoulds.pass,
      args: [
        {
          integer: 1,
          boolean: true,
          string: 'hello',
          array: [1,2,3],
          object: {param1: 1, param2: 2},
          remove: 'im gone',
        },
        {
          type: fieldTypes.object, 
          fields: [
            {name: 'integer', type: fieldTypes.number},
            {name: 'boolean', type: fieldTypes.boolean},
            {name: 'string', type: fieldTypes.string},
            {name: 'array', type: putArrayType(fieldTypes.number)},
            {name: 'object', type: fieldTypes.object, 
              fields: [
                {name: 'param1', type: fieldTypes.number},
                {name: 'param2', type: fieldTypes.number},
              ]}
          ]
        }
      ],
      return: {
        integer: 1,
        boolean: true,
        string: 'hello',
        array: [1,2,3],
        object: {param1: 1, param2: 2}
      },
    },
    {
      description: "object input, object definiton, required field not in input",
      should: shoulds.throw,
      args: [
        {
          integer: 1,
          boolean: true,
          string: 'hello',
          array: [1,2,3],
          object: {param1: 1, param2: 2},
        },
        {
          type: fieldTypes.object, 
          fields: [
            {name: 'integer', type: fieldTypes.number},
            {name: 'boolean', type: fieldTypes.boolean},
            {name: 'string', type: fieldTypes.string},
            {name: 'array', type: putArrayType(fieldTypes.number)},
            {name: 'object', type: fieldTypes.object, 
              fields: [
                {name: 'param1', type: fieldTypes.number},
                {name: 'param2', type: fieldTypes.number},
              ]},
            {name: 'absent', type: fieldTypes.string, required: true,},
          ]
        }
      ],
      return: 'required field not found'
    },

    {
      description: `${putMapType(fieldTypes.object)} input, ${ putMapType(fieldTypes.object)} definiton, required field not in subtype input`,
      should: shoulds.throw,
      args: [
        {
          key1: {
            integer: 1,
            boolean: true,
            string: 'hello',
            array: [1,2,3],
            object: {param1: 1, param2: 2},
          }
        },
        {
          type: putMapType(fieldTypes.object), 
          fields: [
            {name: 'integer', type: fieldTypes.number},
            {name: 'boolean', type: fieldTypes.boolean},
            {name: 'string', type: fieldTypes.string},
            {name: 'array', type: putArrayType(fieldTypes.number)},
            {name: 'object', type: fieldTypes.object, 
              fields: [
                {name: 'param1', type: fieldTypes.number},
                {name: 'param2', type: fieldTypes.number},
              ]},
            {name: 'absent', type: fieldTypes.string, required: true,},
          ]
        }
      ],
      return: 'required field not found'
    },
    
    // validate
    {
      description: "valid number input, number definition",
      should: shoulds.pass,
      args: [
        1,
        {type: fieldTypes.number, validation: (int) => {return int === 1;}}
      ],
      return: 1,
    },
    {
      description: "invalid number input, validation return false, number definition",
      should: shoulds.throw,
      args: [
        2,
        {type: fieldTypes.number, validation: (int) => {return int === 1;}}
      ],
      return: 'is invalid.',
    },
    {
      description: "invalid number input, validation throws Error, number definition",
      should: shoulds.throw,
      args: [
        2,
        {type: fieldTypes.number, validation: (int) => {
            if (int === 1) { 
              return true;
            } 
            throw new Error("must === 1");
          }
        }
      ],
      return: 'is invalid. must === 1',
    },

    //malformed inputs
    {
      description: "no type defined",
      should: shoulds.pass,
      args: [
        1,
        {}
      ],
      return: 1,
    },
    {
      description: "object input, object definiton, no fields present empty object returned",
      should: shoulds.pass,
      args: [
        {
          integer: 1,
          boolean: true,
        },
        {
          type: fieldTypes.object, 
          fields: [
            {name: 'string', type: fieldTypes.string},
          ]
        }
      ],
      return: {},
    },
    {
      description: "object input, object definiton, empty fields empty object returned",
      should: shoulds.pass,
      args: [
        {
          integer: 1,
          boolean: true,
        },
        {
          type: fieldTypes.object, 
          fields: []
        }
      ],
      return: {},
    },
    {
      description: "object input, object definiton, no fields definition object returned",
      should: shoulds.pass,
      args: [
        {
          integer: 1,
          boolean: true,
        },
        {
          type: fieldTypes.object, 
        }
      ],
      return: {
        integer: 1,
        boolean: true,
      },
    },
    {
      description: "object input, object definiton, field definition with no name ignored, filtered object returned",
      should: shoulds.pass,
      args: [
        {
          integer: 1,
          boolean: true,
        },
        {
          type: fieldTypes.object, 
          fields: [
            {type: fieldTypes.number,},
            {name: 'integer', type: fieldTypes.number},
          ],
        }
      ],
      return: {
        integer: 1,
      },
    },
    {
      description: "object input, object definiton, field definition with no name ignored, filtered object returned",
      should: shoulds.pass,
      args: [
        {
          integer: 1,
          boolean: true,
        },
        {
          type: fieldTypes.object, 
          fields: [
            {type: fieldTypes.number,},
            {name: 'integer', type: fieldTypes.number},
          ],
        }
      ],
      return: {
        integer: 1,
      },
    },
    {
      description: "object input, object definiton, map to camel case",
      should: shoulds.pass,
      args: [
        {
          integer_camel: 1,
          boolean_camel: true,
        },
        {
          type: fieldTypes.object, 
          fields: [
            {name: 'integer_camel', map: 'integerCamel', type: fieldTypes.number},
          ],
        }
      ],
      return: {
        integerCamel: 1,
      },
    },
    {
      description: "number input, number definiton, mutate",
      should: shoulds.pass,
      args: [
        1,
        {
          type: fieldTypes.number,
          mutate: number => {
            return number*10
          },
        }
      ],
      return: 10,
    },
    {
      description: "object input, object definiton, mutate",
      should: shoulds.pass,
      args: [
        {
          a: 1,
          b: 2,
        },
        {
          type: fieldTypes.object,
          fields: [
            {name: 'a', type: fieldTypes.number},
            {name: 'b', type: fieldTypes.number},
          ],
          mutate: obj => {
            obj.sum = obj.a + obj.b;
            return obj;
          },
        }
      ],
      return: {
        a: 1,
        b: 2,
        sum: 3
      },
    },
  ]
}

const nullTypes = [null, undefined, NaN];
const defs = ['number', 'string', 'boolean', putArrayType(fieldTypes.number), 'object'];

nullTypes.forEach( type => {
  defs.forEach( def => {
    manifest.testCases.push(
      {
        description: `${type} input, ${def} definiton`,
        should: shoulds.throw,
        args: [
          type,
          {type: def, }
        ],
        return: `expected type ${def}`,
      }
    )
  })
})

module.exports = manifest;