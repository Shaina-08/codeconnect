// import React, { useState, useRef , useEffect} from "react";
// import Editor from "@monaco-editor/react";
// import * as Y from "yjs";
// import { MonacoBinding } from "y-monaco";
// // import ACTIONS from '../Actions';
// // import * as MonacoCollabExt from '@convergencelabs/monaco-collab-ext';
// import { initSocket } from "../socket";



import { useState, useRef } from 'react'

import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"

// Setup Monaco Editor
// Attach YJS Text to Monaco Editor

const CodeEditorWindow = ({ onChange, language, code, theme , onCodeChange}) => {
    const [value, setValue] = useState(code || "");
    // onCodeChange(value);
    const [output, setOutput] = useState("");
  const editorRef = useRef(null);

  // Editor value -> YJS Text value (A text value shared by multiple people)
  // One person deletes text -> Deletes from the overall shared text value
  // Handled by YJS

  // Initialize YJS, tell it to listen to our Monaco instance for changes.

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    // Initialize YJS
    const doc = new Y.Doc(); // a collection of shared objects -> Text
    // Connect to peers (or start connection) with WebRTC
    const provider = new WebrtcProvider("test-room", doc); // room1, room2
    const type = doc.getText("monaco"); // doc { "monaco": "what our IDE is showing" }
    // Bind YJS to Monaco 
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    console.log(provider.awareness);                
  }

  
  
  
// const editorRef = useRef(null);

// const CodeEditorWindow = ({ onChange, language, code, theme }) => {
//   const editorRef = useRef(null);
//   const collaboratorRef = useRef(null); // Add a ref for the collaborator

//   // Initialize the collaborator when the component mounts
//   useEffect(() => {
//     const editor = editorRef.current;

//     if (editor) {
//       const collaborator = new MonacoCollabExt.Collaborator(editor.getModel()); // Pass the editor's model
//       collaboratorRef.current = collaborator;
//       initSocket().then((socket) => {
//         collaborator.connect(socket);

//         // Listen for changes from other users
//         collaborator.on("remoteop", (op) => {
//           collaborator.applyRemoteOperation(op);
//         });

//         // Listen for local changes and send them to other users
//         editor.getModel().onDidChangeContent((e) => {
//           const ops = collaborator.getPendingOutgoingOperations();
//           ops.forEach((op) => {
//             socket.emit("editor-change", op.serialize());
//           });
//         });

//         socket.on("editor-change", (data) => {
  //           collaborator.receiveRemoteOperation(MonacoCollabExt.RemoteOperation.deserialize(data));
//         });
//       });
//     }
//   }, []);

  // const handleEditorDidMount = (editor, monaco) => {
    //   editorRef.current = editor; // Set the editor reference once it's mounted
    //   editor.updateOptions({
  //     theme: "vs-dark",  // change to "vs" for light theme
  //   });
  // };
  

  const handleEditorChange = (value, event, instance) => {
    setValue(value);
    // onChange("code", value);
  
    console.log("editor things:", value);

    // const code = instance.getValue();
    // console.log(code);
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
        // ref={editorRef}
        // socketRef= {socketRef}
        height="68vh"
        defaultLanguage="javascript"
        onMount={handleEditorDidMount}
        value={value}
        options={{ fontSize: 18 }}
        onChange={handleEditorChange}
        theme = "vs-dark"
        
          
        
        defaultValue="// Write your javascript code here"
        
      />
      <button onClick={runCode} style={{
        marginTop: '7px',
        border: '1px solid #303234',
        // borderRadius: '4px',
        width:'60px',
        cursor: 'pointer',
        fontSize: '14px',
        backgroundColor: '#302034',
        minHeight: '30px',
        color: '#ccb782'
      }} >Run</button>
      <pre style={{
        marginTop: '16px',
        // border: '1px solid #ddd',
        padding: '8px',
        borderRadius: '4px',
        width:'99%',
        fontSize: '20px',
        backgroundColor: '#CCC6AE',
        minHeight: '150px',
        color: '#791111'
      }}>{output}</pre>
    </div>
  );

  
}
export default CodeEditorWindow;
