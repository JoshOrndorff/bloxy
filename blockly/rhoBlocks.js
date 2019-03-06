Blockly.Blocks['nil'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Nil");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Stopped Process");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send");
    this.appendStatementInput("Chan")
        .setCheck(null)
        .appendField("@");
    this.appendStatementInput("Message")
        .setCheck(null)
        .appendField("!");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Send a message");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['receive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("for")
        .appendField(new Blockly.FieldTextInput("x"), "bind")
        .appendField("from");
    this.appendStatementInput("chan")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("do");
    this.appendStatementInput("body")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Receive a message then run a process");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['new'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("new")
        .appendField(new Blockly.FieldTextInput("x"), "bind")
        .appendField("in");
    this.appendStatementInput("body")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Bind a new unforgeable  variable");
 this.setHelpUrl("");
  }
};