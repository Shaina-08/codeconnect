import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import ACTIONS from '../Actions';

function handleEditorDidMount(editor, monaco) {
  editor.updateOptions({
    theme: "vs-dark",  // change to "vs" for light theme
  });
}

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const [output, setOutput] = useState("");

  const handleEditorChange = (value, event) => {
    setValue(value);
    onChange("code", value);
  };

  const runCode = () => {
    try {
      const originalLog = console.log;
      let consoleOutput = "";
      console.log = (...args) => {
        consoleOutput += args.join(' ') + '\n';
      };

      eval(value);

      console.log = originalLog;
      setOutput(consoleOutput);
    } catch (err) {
      setOutput(err.toString());
    }
  };

  return (
    <div className="myEditor">
      <Editor
        
        height="68vh"
        defaultLanguage="javascript"
        onMount={handleEditorDidMount}
        value={value}
        defaultValue="// Write your javascript code here"
        options={{ fontSize: 18 }}
        onChange={handleEditorChange}
      />
      <button onClick={runCode} style={{
        marginTop: '7px',
        border: '1px solid #ddd',
        // padding: '8px',
        borderRadius: '4px',
        width:'40px',
        // position: "absolute",
          // bottom: "208px",
          right: "8px",
         
        fontSize: '14px',
        backgroundColor: '#F3F6EB',
        minHeight: '30px',
        color: 'black'
      }} >Run</button>


      <pre style={{
        marginTop: '16px',
        border: '1px solid #ddd',
        padding: '8px',
        borderRadius: '4px',
        width:'81%',
        // alignItems: 'flex-end',
        fontSize: '20px',
        backgroundColor: 'black',
        minHeight: '150px',
        color: 'red'
      }}>{output}</pre>
    </div>
  );
};

export default CodeEditorWindow;
