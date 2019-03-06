Blockly.RhoAST = new Blockly.Generator("Rholang");

Blockly.RhoAST.addReservedWords('contract,for,new,Nil,if,else,bundle');

// I Really haven't done anyhting with this. Hopefully I'll know when I need it.
Blockly.RhoAST.ORDER_ATOMIC = 0;             // 0 "" ...
Blockly.RhoAST.ORDER_NEW = 1;                // new
Blockly.RhoAST.ORDER_OVERRIDES = [];


/**
 * Hook for code to run at end of code generation.
 * All top-level bloxy stacks are considered parred together, so
 * wrap the comma-seperated list in the rest of the AST.
 * @param {string array} code Generated code from top-level stacks.
 * @return {string} Completed code.
 */
Blockly.RhoAST.finish = function(code) {
  let ast = {
    tag: 'par',
    procs: code.map(JSON.parse)
  };
  return JSON.stringify(ast, null, 2);
};



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


Blockly.RhoAST.scrub_ = function(block, code, opt_thisOnly) {
  if (opt_thisOnly){
    return code;
  }

  let nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = Blockly.RhoAST.blockToCode(nextBlock);

  if (nextCode === '') {
    return code;
  }

  let thisAST = JSON.parse(code);
  let nextAST = JSON.parse(nextCode);
  let combinedAST;
  if (nextAST.tag !== "par") {
    combinedAST = {
      tag: 'par',
      procs: [
        thisAST,
        nextAST,
      ],
    };
  }
  else {
    combinedAST = {
      tag: 'par',
      procs: nextAST.procs.concat([thisAST])
    };
  }
  return JSON.stringify(combinedAST, null, 2);
};



Blockly.RhoAST['nil'] = function(block) {
  var ast = {
    tag: 'ground',
    type: 'nil',
    val: 'Nil',
  };
  return JSON.stringify(ast, null, 2);
};

Blockly.RhoAST['send'] = function(block) {
  var chan = JSON.parse(Blockly.RhoAST.statementToCode(block, 'Chan'));
  var message = JSON.parse(Blockly.RhoAST.statementToCode(block, 'Message'));
  var ast = {
    tag: 'Send',
    chan,
    message,
  };
  return JSON.stringify(ast, null, 2);
};

Blockly.RhoAST['receive'] = function(block) {
  let chan = JSON.parse(Blockly.RhoAST.statementToCode(block, 'chan'));
  let bind = block.getFieldValue('bind');
  let body = JSON.parse(Blockly.RhoAST.statementToCode(block, 'body'));
  let ast = {
    tag: 'join',
    actions: [
      {
        chan,
        bind
      }
    ],
    body
  };
  return JSON.stringify(ast, null, 2);
}

Blockly.RhoAST['new'] = function(block) {
  let bind = block.getFieldValue('bind');
  let body = JSON.parse(Blockly.RhoAST.statementToCode(block, 'body'));
  let ast = {
    tag: 'new',
    binds: [
      bind
    ],
    body
  };
  return JSON.stringify(ast, null, 2);
}

Blockly.RhoAST['var'] = function(block) {
  let givenName = block.getFieldValue('name');
  let ast = {
    tag: 'var',
    givenName,
  };
  return JSON.stringify(ast, null, 2);
}
