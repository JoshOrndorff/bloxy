window.addEventListener('DOMContentLoaded', () => {

  // User IO
  let outputDiv = document.getElementById("output");
  document.getElementById('genAST').addEventListener('click', () => {
    outputDiv.innerHTML = Blockly.RhoAST.workspaceToCode(workspace);
  });
  document.getElementById('genCR').addEventListener('click', () => {
    outputDiv.innerHTML = Blockly.CoopRholang.workspaceToCode(workspace);
  });

  // Begin Blockly Configuration
  let options = {
    // Docs: developers.google.com/blockly/guides/get-started/web
    toolbox : document.getElementById('toolbox'),
    collapse : true, // Allow blocks to be collapsed or expanded
    comments : true,
    disable : true, // Allow disabling blocks
    maxBlocks : Infinity,
    trashcan : false,
    horizontalLayout : false,
    toolboxPosition : 'start',
    css : true,
    media : 'https://blockly-demo.appspot.com/static/media/',
    rtl : false,
    scrollbars : false,
    sounds : false,
    oneBasedIndex : false
  };

  // Inject blockly into my workspace
  let workspace = Blockly.inject('rhoBlocks', options);

  // Optional: Pre-populate workspace with blocks
  //let workspaceBlocks = document.getElementById("toolbox");
  //Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
});
