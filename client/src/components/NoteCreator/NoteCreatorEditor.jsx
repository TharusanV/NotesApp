import React, { useState, useEffect, useRef } from "react";
import { Editor } from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import jsPDF from 'jspdf';
import html2canvas from "html2canvas";


const NoteCreatorEditor = ({prop_GetActiveNote, prop_OnUpdateNote}) => {

  const [wordCount, setWordCount] = useState(0);
  const noteTopics = [{name: "Maths"}, {name: "Science"}, {name: "English"}]

  const [editorData, setEditorData] = useState("");

  const onEditField = (key, value) => {
    prop_OnUpdateNote({
      ...prop_GetActiveNote,
      id: prop_GetActiveNote.noteIDCustom,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!prop_GetActiveNote)
    return <div className="no-active-note">No selected note</div>;

  const settingTopic = () => {
    var select = document.getElementById("topicList");
    var value = select.options[select.selectedIndex].value;
    onEditField("topic", value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("editor");
    const prevVisibility = input.style.visibility; // save previous visibility
    input.style.visibility = "visible"; // temporarily make the div visible
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
      input.style.visibility = prevVisibility; // reset visibility
    });
  };
  
  

  return (
    <>
      <div className="noteCreator-hero-container">
        <div className="noteCreator-main-note-editor-container">
          <input
            style={{ marginBottom: "10px", padding: "0px 5px" }}
            id="note-title"
            type="text"
            onChange={(event) => onEditField("title", event.target.value)}
            autoFocus
            value={prop_GetActiveNote.title}
          />

          <select
            id="topicList"
            onChange={() => settingTopic()}
            style={{ marginBottom: "10px", marginRight: "10px", }}
          >
            <option value={"General"}>General</option>
            {noteTopics.map((topics) => (
              <option value={topics.name} key={topics.name}>
                {topics.name}
              </option>
            ))}
          </select>

          <label
            style={{ marginBottom: "10px", marginRight: "20px", display: "inline-block" }}
            className="current-topic"
          >
            Current Topic: {prop_GetActiveNote.topic}
          </label>

          <label
            style={{marginBottom: "20px",display: "inline-block",marginRight: "10px",
            }}
          >
            Word Count: {wordCount}{" "}
          </label>
          
          <div style={{display: 'inline-block'}}>
            <button onClick={handleDownloadPDF}>PDF</button>
            <span className="beta-label" data-tooltip="Only Text">Beta</span>
          </div>




          <CKEditor
            editor={Editor}
            config={{
              toolbar: [
                "heading", "|", "undo", "redo", "fontFamily", "fontSize", "bold", "italic", "link", "bulletedList", 
                "numberedList", "|", "outdent", "indent", "|", "blockQuote", "insertTable", "mediaEmbed", "underline", "todoList", 
                "strikethrough", "specialCharacters", "pageBreak", "highlight", "horizontalLine", "fontBackgroundColor", "fontColor", "code", "codeBlock", "alignment"
              ],
            }}
            data={prop_GetActiveNote.body}
            id={prop_GetActiveNote.noteIDCustom}
            onChange={(event, editor) => {
              onEditField("body", editor.getData());
              setEditorData(editor.getData());
              setWordCount(
                editor.getData().replace(/(<([^>]+)>)/gi, "").trim().split(/\s+/).length
              );
            }}
          />
          <div id="editor" dangerouslySetInnerHTML={{ __html: editorData }}></div>
        </div>
      </div>
    </>
  );
};

export default NoteCreatorEditor