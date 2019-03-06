Blockly.CoopRholang = new Blockly.Generator("Rholang");

Blockly.CoopRholang.addReservedWords('contract,for,new,Nil,if,else,bundle');

// I Really haven't done anyhting with this. Hopefully I'll know when I need it.
Blockly.CoopRholang.ORDER_ATOMIC = 0;             // 0 "" ...
Blockly.CoopRholang.ORDER_NEW = 1;                // new
Blockly.CoopRholang.ORDER_OVERRIDES = [];


/**
 * Common tasks for generating Rholang from blocks.
 * May someday handle comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The stringified ast created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @private
 */


Blockly.CoopRholang.scrub_ = function(block, code, opt_thisOnly) {
  if (opt_thisOnly){
    return code;
  }

  let nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = Blockly.CoopRholang.blockToCode(nextBlock);

  if (nextCode === '') {
    return code;
  }

  return code + ' |\n' + nextCode;
};



Blockly.CoopRholang['nil'] = function(block) {
  return "Nil";
};

Blockly.CoopRholang['send'] = function(block) {
  var chan = Blockly.CoopRholang.statementToCode(block, 'Chan');
  var message = Blockly.CoopRholang.statementToCode(block, 'Message');
  return `@{${chan}}!(${message})`;
};

Blockly.CoopRholang['receive'] = function(block) {
  let chan = Blockly.CoopRholang.statementToCode(block, 'chan');
  let bind = block.getFieldValue('bind');
  let body = Blockly.CoopRholang.statementToCode(block, 'body');
  return `for(${bind} <- @{${chan}}){\n${body}\n}`;
}

Blockly.CoopRholang['new'] = function(block) {
  let bind = block.getFieldValue('bind');
  let body = Blockly.CoopRholang.statementToCode(block, 'body');
  return `new ${bind} in {\n${body}\n}`;
}
