import * as Blockly from 'blockly'

export const InoCodeGenerator = new Blockly.Generator('WEMOS_INO')

InoCodeGenerator.ORDER_ATOMIC = 0

const orderAtomic = InoCodeGenerator.ORDER_ATOMIC
//const orderNone = Blockly.JavaScript.ORDER_NONE;

// #region basis

InoCodeGenerator.forBlock['basis_setup_loop'] = function (block, generator) {
  const codeSetup = generator.statementToCode(block, 'CODE_SETUP')
  const codeLoop = generator.statementToCode(block, 'CODE_LOOP')

  const result = `void setup() {\n${codeSetup}\n} \n\nvoid loop() {\n${codeLoop}\n}`
  return result
}

InoCodeGenerator.forBlock['basis_delay'] = function (block, generator) {
  const delayValue = generator.valueToCode(block, 'DELAY', orderAtomic)

  const result = `delay(${delayValue});`
  return result
}

InoCodeGenerator.forBlock['basis_SerialPrintln'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', orderAtomic) || '""'
  const code = `Serial.println(${value});`
  return code
}

InoCodeGenerator.forBlock['text'] = function (block, generator) {
  const value = `"${block.getFieldValue('TEXT')}"`
  return [value, orderAtomic]
}

InoCodeGenerator.forBlock['basis_comment'] = function (block, generator) {
  const value = block.getFieldValue('COMMENT')
  return `// ${value}`
}

// #endregion

// #region board

InoCodeGenerator.forBlock['board_pinmode'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', orderAtomic)
  const mode = generator.valueToCode(block, 'MODE', orderAtomic)

  const result = `pinMode(${pin}, ${mode});`
  return result
}

InoCodeGenerator.forBlock['board_digitalWrite'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', orderAtomic)
  const value = generator.valueToCode(block, 'VALUE', orderAtomic)

  const result = `digitalWrite(${pin}, ${value});`
  return result
}

InoCodeGenerator.forBlock['board_digitalRead'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', orderAtomic) || '0'
  const code = `digitalRead(${pin})`
  return [code, orderAtomic]
}

InoCodeGenerator.forBlock['board_analogWrite'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', orderAtomic) || '0'
  const value = generator.valueToCode(block, 'VALUE', orderAtomic) || '0'
  const code = `analogWrite(${pin}, ${value});`
  return code
}

InoCodeGenerator.forBlock['board_analogRead'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', orderAtomic) || '0'
  const code = `analogRead(${pin})`
  return [code, orderAtomic]
}

InoCodeGenerator.forBlock['board_pin_status'] = function (block, generator) {
  const value = block.getFieldValue('VALUE')
  return [value, orderAtomic]
}

InoCodeGenerator.forBlock['board_pin_type'] = function (block, generator) {
  const value = block.getFieldValue('VALUE')
  return [value, orderAtomic]
}

InoCodeGenerator.forBlock['board_pin'] = function (block, generator) {
  const value = block.getFieldValue('VALUE')
  return [value, orderAtomic]
}

// #endregion

// #region math

InoCodeGenerator.forBlock['math_number'] = function (block, generator) {
  const value = block.getFieldValue('NUM')
  return [`${value}`, orderAtomic]
}

InoCodeGenerator.forBlock['math_arithmetic'] = function (block, generator) {
  const operatorMap = {
    ADD: '+',
    MINUS: '-',
    MULTIPLY: '*',
    DIVIDE: '/',
    POWER: '**', //just symbolic
  }

  const a = generator.valueToCode(block, 'A', orderAtomic) || '0'
  const b = generator.valueToCode(block, 'B', orderAtomic) || '0'
  const operator = operatorMap[block.getFieldValue('OP')]

  let result = `${a} ${operator} ${b}`
  if (block.getFieldValue('OP') === 'POWER') {
    result = `pow(${a}, ${b})` //Use pow() function
  }

  return [result, orderAtomic]
}

// #endregion

// #region logic

InoCodeGenerator.forBlock['logic_boolean'] = function (block, generator) {
  const boolValue = block.getFieldValue('BOOL')
  const result = boolValue === 'TRUE' ? 'true' : 'false'
  return [result, orderAtomic]
}

InoCodeGenerator.forBlock['controls_if'] = function (block, generator) {
  let code = ''
  for (let i = 0; i <= block.elseifCount_; i++) {
    const condition = generator.valueToCode(block, `IF${i}`, orderAtomic) || 'false'
    const branch = generator.statementToCode(block, `DO${i}`)
    if (i === 0) {
      code += `if (${condition}) {\n${branch}\n}\n`
    } else {
      code += `else if (${condition}) {\n${branch}\n}\n`
    }
  }
  if (block.elseCount_) {
    const elseBranch = generator.statementToCode(block, 'ELSE')
    code += `else {\n${elseBranch}\n}\n`
  }
  return code
}

InoCodeGenerator.forBlock['controls_ifelse'] = function (block, generator) {
  const condition = generator.valueToCode(block, 'IF0', orderAtomic) || 'false'
  const ifBranch = generator.statementToCode(block, 'DO0')
  const elseBranch = generator.statementToCode(block, 'ELSE')
  const code = `if (${condition}) {\n${ifBranch}}\nelse {\n${elseBranch}}\n`
  return code
}

InoCodeGenerator.forBlock['logic_compare'] = function (block, generator) {
  const operatorMap = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>=',
  }
  const a = generator.valueToCode(block, 'A', orderAtomic) || '0'
  const b = generator.valueToCode(block, 'B', orderAtomic) || '0'
  const operator = operatorMap[block.getFieldValue('OP')]
  const result = `${a} ${operator} ${b}`
  return [result, orderAtomic]
}

InoCodeGenerator.forBlock['logic_operation'] = function (block, generator) {
  const operatorMap = {
    AND: '&&',
    OR: '||',
  }
  const a = generator.valueToCode(block, 'A', orderAtomic) || 'false'
  const b = generator.valueToCode(block, 'B', orderAtomic) || 'false'
  const operator = operatorMap[block.getFieldValue('OP')]
  const result = `${a} ${operator} ${b}`
  return [result, orderAtomic]
}

InoCodeGenerator.forBlock['logic_negate'] = function (block, generator) {
  const boolValue = generator.valueToCode(block, 'BOOL', orderAtomic) || 'false'
  const result = `!(${boolValue})`
  return [result, orderAtomic]
}

InoCodeGenerator.forBlock['logic_null'] = function (block, generator) {
  return ['NULL', orderAtomic]
}

InoCodeGenerator.forBlock['logic_ternary'] = function (block, generator) {
  const condition = generator.valueToCode(block, 'IF', orderAtomic) || 'false'
  const ifTrue = generator.valueToCode(block, 'THEN', orderAtomic) || 'null'
  const ifFalse = generator.valueToCode(block, 'ELSE', orderAtomic) || 'null'
  const result = `(${condition}) ? ${ifTrue} : ${ifFalse}`
  return [result, orderAtomic]
}

// #endregion

// #region loops
InoCodeGenerator.forBlock['controls_repeat_ext'] = function (block, generator) {
  const repeats = generator.valueToCode(block, 'TIMES', orderAtomic) || '0'
  const branch = generator.statementToCode(block, 'DO')
  const code = `for (int count = 0; count < ${repeats}; count++) {\n${branch}\n}`
  return code
}

InoCodeGenerator.forBlock['controls_whileUntil'] = function (block, generator) {
  const until = block.getFieldValue('MODE') === 'UNTIL'
  const condition = generator.valueToCode(block, 'BOOL', orderAtomic) || 'false'
  const branch = generator.statementToCode(block, 'DO')
  const conditionCode = until ? `!(${condition})` : condition
  const code = `while (${conditionCode}) {\n${branch}\n}`
  return code
}

// #endregion

// #region variables

InoCodeGenerator.forBlock['variable_create'] = function (block, generator) {
  const variableType = block.getFieldValue('TYPE')
  const variableName = block.getFieldValue('NAME')
  const variableValue = generator.valueToCode(block, 'VALUE', orderAtomic) || '0'

  const code = `${variableType} ${variableName} = ${variableValue};`
  return code
}

InoCodeGenerator.forBlock['variable_get'] = function (block, generator) {
  const variableName = block.getFieldValue('NAME')
  return [variableName, orderAtomic]
}

InoCodeGenerator.forBlock['variable_set'] = function (block, generator) {
  const variableName = block.getFieldValue('NAME')
  const variableValue = generator.valueToCode(block, 'VALUE', orderAtomic) || '0'

  const code = `${variableName} = ${variableValue};`
  return code
}

// #endregion

/*
TODO: remove this comment
didn't knew i had to add this because it wasn't in the documentation but an stack 
overflow post helped me
https://stackoverflow.com/questions/76715433/only-first-block-works-in-a-series-in-blockly
*/
InoCodeGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock()
  if (nextBlock && !thisOnly) {
    return code + '\n' + InoCodeGenerator.blockToCode(nextBlock)
  }
  return code
}
