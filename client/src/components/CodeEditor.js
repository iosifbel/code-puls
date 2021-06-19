import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue) {
  console.log("change", newValue);
}
function onLoad(newValue) {
  console.log("change", newValue);
}

function CodeEditor() {
  return (
    <AceEditor
      width="undefined"
      height="20em"
      mode="javascript"
      theme="tomorrow"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      wrapEnabled={true}
      highlightActiveLine={false}
      setOptions={{
        useWorker: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
        highlightActiveLine: true,
      }}
    />
  );
}

export default CodeEditor;
