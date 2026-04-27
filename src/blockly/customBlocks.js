import * as Blockly from 'blockly'

const blockDefinitions = {
  basis_setup_loop: {
    type: 'BASIS_SETUP_LOOP',
    tooltip: 'Der Code in setup wird einmalig ausgeführt, der Code in loop wird immer wiederholt.',
    message0: '%{BKY_BASIS_SETUP_LOOP_TITLE}',
    args0: [
      {
        type: 'input_dummy',
        name: 'SETUP',
      },
      {
        type: 'input_statement',
        name: 'CODE_SETUP',
      },
      {
        type: 'input_dummy',
        name: 'LOOP',
      },
      {
        type: 'input_statement',
        name: 'CODE_LOOP',
      },
    ],
    previousStatement: null,
    colour: 15,
  },
  basis_delay: {
    type: 'BASIS_DELAY',
    tooltip: 'Pausiert das Programm für die angegebene Zeit in Millisekunden.',

    message0: '%{BKY_BASIS_DELAY_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'DELAY',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 15,
  },
  basis_SerialPrintln: {
    type: 'BASIS_SERIALPRINTLN',
    tooltip: 'Gibt den angegebenen Text auf der seriellen Konsole aus.',
    message0: '%{BKY_BASIS_SERIALPRINTLN_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 15,
  },
  basis_comment: {
    type: 'BASIS_COMMENT',
    tooltip: 'Fügt einen Kommentar hinzu, um den Code zu erklären.',
    message0: '%{BKY_BASIS_COMMENT_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'COMMENT',
        text: 'Kommentar',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 15,
  },

  board_pinmode: {
    type: 'BOARD_PINMODE',
    tooltip: 'Setzt den Pin auf den angegebenen Modus.',
    message0: '%{BKY_BOARD_PINMODE_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'PIN',
      },
      {
        type: 'input_value',
        name: 'MODE',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 60,
  },

  board_digitalWrite: {
    type: 'BOARD_DIGITAL_WRITE',
    tooltip: 'Schalte den Pin ein (HIGH) oder aus (LOW).',
    message0: '%{BKY_BOARD_DIGITAL_WRITE_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'PIN',
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 60,
  },
  board_digitalRead: {
    type: 'BOARD_DIGITAL_READ',
    tooltip: 'Liest den digitalen Wert eines Pins (HIGH oder LOW).',
    message0: '%{BKY_BOARD_DIGITAL_READ_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'PIN',
      },
    ],
    output: null,
    colour: 60,
  },

  board_analogWrite: {
    type: 'BOARD_ANALOG_WRITE',
    tooltip: 'Schreibt einen analogen Wert (PWM Zahl) auf einen Pin.',
    message0: '%{BKY_BOARD_ANALOG_WRITE_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'PIN',
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 60,
  },

  board_analogRead: {
    type: 'BOARD_ANALOG_READ',
    tooltip: 'Liest den analogen Wert eines Pins als Zahl.',
    message0: '%{BKY_BOARD_ANALOG_READ_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'PIN',
      },
    ],
    output: null,
    colour: 60,
  },
  board_pin_status: {
    type: 'BOARD_PIN_STATUS',
    tooltip: 'Beinhaltet den Status des Pins.',
    message0: '%{BKY_BOARD_PIN_STATUS_TITLE}',
    args0: [
      {
        type: 'field_dropdown',
        name: 'VALUE',
        options: [
          ['%{BKY_BOARD_PIN_STATUS_HIGH}', 'HIGH'],
          ['%{BKY_BOARD_PIN_STATUS_LOW}', 'LOW'],
        ],
      },
    ],
    output: null,
    colour: 60,
  },
  board_pin_type: {
    type: 'BOARD_PIN_TYPE',
    tooltip: 'Beinhaltet den Typ des Pins.',
    message0: '%{BKY_BOARD_PIN_TYPE_TITLE}',
    args0: [
      {
        type: 'field_dropdown',
        name: 'VALUE',
        options: [
          ['%{BKY_BOARD_PIN_TYPE_OUTPUT}', 'OUTPUT'],
          ['%{BKY_BOARD_PIN_TYPE_INPUT}', 'INPUT'],
        ],
      },
    ],
    output: null,
    colour: 60,
  },
  variables_create: {
    type: 'VARIABLE_CREATE',
    tooltip: 'Erstellt eine Variable mit einem Typ, Namen und Wert.',
    message0: '%{BKY_VARIABLES_CREATE_TITLE}',
    args0: [
      {
        type: 'field_dropdown',
        name: 'TYPE',
        options: [
          ['%{BKY_VARIABLES_CREATE_TYPE_INT}', 'int'],
          ['%{BKY_VARIABLES_CREATE_TYPE_BOOL}', 'bool'],
        ],
      },
      {
        type: 'field_input',
        name: 'NAME',
        text: 'variableName',
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
  variables_get: {
    type: 'VARIABLE_GET',
    tooltip: 'Gibt den Wert einer Variable zurück.',
    message0: '%{BKY_VARIABLES_GET_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: '%{BKY_VARIABLES_DEFAULT_NAME}',
      },
    ],
    output: null,
    colour: 330,
  },
  variables_set: {
    type: 'VARIABLE_SET',
    tooltip: 'Setzt den Wert einer Variable.',
    message0: '%{BKY_VARIABLES_SET_TITLE}',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: '%{BKY_VARIABLES_DEFAULT_NAME}',
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
}

for (const blockName in blockDefinitions) {
  Blockly.Blocks[blockName] = {
    init: function () {
      this.jsonInit(blockDefinitions[blockName])
    },
  }
}

const technicalLanguage = {
  BASIS_SETUP_LOOP_TITLE: 'setup %1 %2 loop %3 %4',
  BASIS_DELAY_TITLE: 'delay %1',
  BASIS_SERIALPRINTLN_TITLE: 'Serial.println %1',
  BASIS_COMMENT_TITLE: '// %1',
  BOARD_PINMODE_TITLE: 'pinMode %1 %2',
  BOARD_DIGITAL_WRITE_TITLE: 'digitalWrite %1 %2',
  BOARD_DIGITAL_READ_TITLE: 'digitalRead %1',
  BOARD_ANALOG_WRITE_TITLE: 'analogWrite %1 %2',
  BOARD_ANALOG_READ_TITLE: 'analogRead %1',
  BOARD_PIN_STATUS_TITLE: '%1',
  BOARD_PIN_STATUS_HIGH: 'HIGH',
  BOARD_PIN_STATUS_LOW: 'LOW',
  BOARD_PIN_TYPE_TITLE: '%1',
  BOARD_PIN_TYPE_OUTPUT: 'OUTPUT',
  BOARD_PIN_TYPE_INPUT: 'INPUT',
  BOARD_PIN_TITLE: '%1',
  VARIABLES_CREATE_TITLE: '%1 %2 %3',
  VARIABLES_CREATE_TYPE_INT: 'INT',
  VARIABLES_CREATE_TYPE_BOOL: 'BOOL',
  VARIABLES_GET_TITLE: '%1',
  VARIABLES_SET_TITLE: 'set %1 to %2',
  VARIABLES_DEFAULT_NAME: 'variableName',
  CONTROLS_REPEAT_TITLE: 'for (int count = 0; count < %1; count++)',
  LOGIC_BOOLEAN_TRUE: 'true',
  LOGIC_BOOLEAN_FALSE: 'false',
  LOGIC_OPERATION_AND: 'and',
  LOGIC_OPERATION_OR: 'or',
  CONTROLS_IF_MSG_IF: 'if',
  CONTROLS_IF_MSG_THEN: 'do',
  CONTROLS_IF_MSG_ELSE: 'else',
  CONTROLS_IF_MSG_ELSEIF: 'else if',
  CONTROLS_REPEAT_INPUT_DO: 'do',
  CONTROLS_WHILEUNTIL_OPERATOR_UNTIL: 'repeat until',
  CONTROLS_WHILEUNTIL_OPERATOR_WHILE: 'repeat while',
  LOGIC_NEGATE_TITLE: 'not %1',
}

const easyGermanLanguage = {
  BASIS_SETUP_LOOP_TITLE: 'setup (einmalig ausführen) %1 %2 loop (immer wiederholen) %3 %4',
  BASIS_DELAY_TITLE: 'Warte %1 Millisekunden',
  BASIS_SERIALPRINTLN_TITLE: 'Sag %1',
  BASIS_COMMENT_TITLE: 'Notiz: %1',
  BOARD_PINMODE_TITLE: 'Pinmodus von %1 auf %2',
  BOARD_DIGITAL_WRITE_TITLE: 'Digital %1 auf %2 setzen',
  BOARD_DIGITAL_READ_TITLE: 'Digital %1 lesen',
  BOARD_ANALOG_WRITE_TITLE: 'Analog %1 auf %2 setzen',
  BOARD_ANALOG_READ_TITLE: 'Analog %1 lesen',
  BOARD_PIN_STATUS_TITLE: '%1',
  BOARD_PIN_STATUS_HIGH: 'Eingeschaltet',
  BOARD_PIN_STATUS_LOW: 'Ausgeschaltet',
  BOARD_PIN_TYPE_TITLE: '%1',
  BOARD_PIN_TYPE_OUTPUT: 'Ausgang',
  BOARD_PIN_TYPE_INPUT: 'Eingang',
  BOARD_PIN_TITLE: 'Pin: %1',
  VARIABLES_CREATE_TITLE: 'Erstelle eine Variable %2 vom Typ %1 mit dem Wert %3',
  VARIABLES_CREATE_TYPE_INT: 'Zahl',
  VARIABLES_CREATE_TYPE_BOOL: 'Wahr/Falsch',
  VARIABLES_GET_TITLE: '%1',
  VARIABLES_SET_TITLE: 'Setze die Variable %1 auf den Wert %2',
  VARIABLES_DEFAULT_NAME: 'variableName',
  LOGIC_BOOLEAN_TRUE: 'wahr',
  LOGIC_BOOLEAN_FALSE: 'falsch',
  LOGIC_OPERATION_AND: 'und',
  LOGIC_OPERATION_OR: 'oder',
  CONTROLS_IF_MSG_IF: 'Wenn',
  CONTROLS_IF_MSG_THEN: 'dann:',
  CONTROLS_IF_MSG_ELSE: 'sonst:',
  CONTROLS_IF_MSG_ELSEIF: 'sonst wenn',
  CONTROLS_REPEAT_TITLE: 'Wiederhole %1 mal:',
  CONTROLS_REPEAT_INPUT_DO: '',
  CONTROLS_WHILEUNTIL_TITLE: 'Solange %1: %2',
  CONTROLS_WHILEUNTIL_OPERATOR_UNTIL: 'Wiederhole bis',
  CONTROLS_WHILEUNTIL_OPERATOR_WHILE: 'Wiederhole solange',
  LOGIC_NEGATE_TITLE: 'nicht %1',
}

const languages = { technicalLanguage, easyGermanLanguage }

const tooltips = {
  MATH_NUMBER_TOOLTIP: 'Eine Zahl.',
  MATH_ARITHMETIC_TOOLTIP_ADD: 'Gibt die Summe der beiden Zahlen zurück.',
  MATH_ARITHMETIC_TOOLTIP_DIVIDE: 'Gibt den Quotienten der beiden Zahlen zurück.',
  MATH_ARITHMETIC_TOOLTIP_MINUS: 'Gibt die Differenz der beiden Zahlen zurück.',
  MATH_ARITHMETIC_TOOLTIP_MULTIPLY: 'Gibt das Produkt der beiden Zahlen zurück.',
  MATH_ARITHMETIC_TOOLTIP_POWER: 'Gibt die erste Zahl hoch der zweiten Zahl zurück.',
  LOGIC_BOOLEAN_TOOLTIP: 'Gibt entweder wahr (true) oder falsch (false) zurück.',
  LOGIC_COMPARE_TOOLTIP_EQ: 'Gibt true zurück, wenn beide Eingaben gleich sind.',
  LOGIC_COMPARE_TOOLTIP_GT:
    'Gibt true zurück, wenn die erste Eingabe größer ist als die zweite Eingabe.',
  LOGIC_COMPARE_TOOLTIP_GTE:
    'Gibt true zurück, wenn die erste Eingabe größer oder gleich der zweiten Eingabe ist.',
  LOGIC_COMPARE_TOOLTIP_LT:
    'Gibt true zurück, wenn die erste Eingabe kleiner ist als die zweite Eingabe.',
  LOGIC_COMPARE_TOOLTIP_LTE:
    'Gibt true zurück, wenn die erste Eingabe kleiner oder gleich der zweiten Eingabe ist.',
  LOGIC_COMPARE_TOOLTIP_NEQ: 'Gibt true zurück, wenn beide Eingaben nicht gleich sind.',
  LOGIC_OPERATION_TOOLTIP_AND: 'Gibt true zurück, wenn beide Eingaben true sind.',
  LOGIC_OPERATION_TOOLTIP_OR: 'Gibt true zurück, wenn mindestens eine der Eingaben true ist.',
  LOGIC_NEGATE_TOOLTIP:
    'Gibt true zurück, wenn die Eingabe false ist. Gibt false zurück, wenn die Eingabe true ist.',
  CONTROLS_IF_TOOLTIP_1: 'Wenn ein Wert true ist, dann führe einige Anweisungen aus.',
  CONTROLS_IF_TOOLTIP_2:
    'Wenn ein Wert true ist, dann führe den ersten Block von Anweisungen aus. Andernfalls führe den zweiten Block von Anweisungen aus.',
  CONTROLS_IF_TOOLTIP_3:
    'Wenn der erste Wert true ist, dann führe den ersten Block von Anweisungen aus. Andernfalls, wenn der zweite Wert true ist, führe den zweiten Block von Anweisungen aus.',
  CONTROLS_IF_TOOLTIP_4:
    'Wenn der erste Wert true ist, dann führe den ersten Block von Anweisungen aus. Andernfalls, wenn der zweite Wert true ist, führe den zweiten Block von Anweisungen aus. Wenn keiner der Werte true ist, führe den letzten Block von Anweisungen aus.',
  CONTROLS_REPEAT_TOOLTIP: 'Führe einige Anweisungen mehrere Male aus.',
  CONTROLS_WHILEUNTIL_TOOLTIP_WHILE: 'Solange ein Wert true ist, führe einige Anweisungen aus.',
  CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL: 'Solange ein Wert false ist, führe einige Anweisungen aus.',
}

function changeVariables(changedVariables) {
  for (const name in changedVariables) {
    Blockly.Msg[name] = changedVariables[name]
  }
}

changeVariables(tooltips)

export function changeLanguage(language) {
  changeVariables(languages[language])
}

export function setPinBlock(options) {
  //The options have to be in a format like this [[IO1, IO1], [IO2, IO2], ...] for the dropdown to work, so we transform the array of options into this format
  const optionsArray = options.map((option) => [option, option])

  Blockly.Blocks.board_pin = {
    init: function () {
      this.jsonInit({
        type: 'BOARD_PIN',
        message0: '%{BKY_BOARD_PIN_TITLE}',
        args0: [
          {
            type: 'field_dropdown',
            name: 'VALUE',
            options: optionsArray,
          },
        ],
        output: null,
        colour: 60,
      })
    },
  }
}
