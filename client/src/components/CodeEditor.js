import React from "react";
import AceEditor from "react-ace";
import { AppContext } from "../context/context";

import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";



function CodeEditor(props) {
  require(`ace-builds/src-noconflict/mode-${props.language}`);
  require(`ace-builds/src-noconflict/snippets/${props.language}`);
  
  
  const {setCodeEditorText, codeEditorText} = React.useContext(AppContext);  

  function onChange(newValue) {
    setCodeEditorText(newValue)  
  }

  return (
    <AceEditor
      width="undefined"
      height="20em"
      mode= {`${props.language}`}
      theme="tomorrow"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      fontSize={20}
      defaultValue={codeEditorText}
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
