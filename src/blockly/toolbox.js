export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      colour: '15',
      name: 'Basis',
      contents: [
        {
          kind: 'block',
          type: 'basis_setup_loop',
        },
        {
          kind: 'block',
          type: 'basis_delay',
          inputs: {
            DELAY: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1000',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'basis_SerialPrintln',
          inputs: {
            VALUE: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'Hello, World!',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'basis_comment',
        },
      ],
    },
    {
      kind: 'category',
      colour: '60',
      name: 'Mikrocontroller',
      contents: [
        {
          kind: 'block',
          type: 'board_pinmode',
          inputs: {
            MODE: {
              shadow: {
                type: 'board_pin_type',
                fields: {
                  VALUE: 'OUTPUT',
                },
              },
            },
            PIN: {
              shadow: {
                type: 'board_pin',
                fields: {
                  VALUE: 'D0',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'board_digitalWrite',
          inputs: {
            VALUE: {
              shadow: {
                type: 'board_pin_status',
                fields: {
                  VALUE: 'HIGH',
                },
              },
            },
            PIN: {
              shadow: {
                type: 'board_pin',
                fields: {
                  VALUE: 'D0',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'board_digitalRead',
          inputs: {
            PIN: {
              shadow: {
                type: 'board_pin',
                fields: {
                  VALUE: 'D0',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'board_analogWrite',
          inputs: {
            PIN: {
              shadow: {
                type: 'board_pin',
                fields: {
                  VALUE: 'D0',
                },
              },
            },
            VALUE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '0',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'board_analogRead',
          inputs: {
            PIN: {
              shadow: {
                type: 'board_pin',
                fields: {
                  VALUE: 'A0',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'board_pin_status',
        },
        {
          kind: 'block',
          type: 'board_pin_type',
        },
        {
          kind: 'block',
          type: 'board_pin',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Mathe',
      colour: '230',
      contents: [
        {
          kind: 'block',
          type: 'math_number',
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Logik',
      colour: '210',
      contents: [
        {
          kind: 'block',
          type: 'logic_boolean',
        },
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'controls_ifelse',
        },
        {
          kind: 'block',
          type: 'logic_compare',
        },
        {
          kind: 'block',
          type: 'logic_operation',
        },
        {
          kind: 'block',
          type: 'logic_negate',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Schleifen',
      colour: '120',
      contents: [
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_whileUntil',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Variablen',
      colour: '330',
      contents: [
        {
          kind: 'block',
          type: 'variables_create',
        },
        {
          kind: 'block',
          type: 'variables_set',
        },
        {
          kind: 'block',
          type: 'variables_get',
        },
      ],
    },
  ],
}
