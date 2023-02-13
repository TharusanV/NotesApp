import React, { useState, useEffect } from "react";
import { Editor } from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


//With props being an object we know props has one key on it therefore we can destructure it through naming the key creating a local variable 
const NoteCreatorEditor = ({prop_GetActiveNote, prop_OnUpdateNote}) => {

  //Getters and Setters that are a part of the 'preview note' button to see how the note will be viewed
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [wordCount, setWordCount] = useState(0); //Getter and setter for the word count
  const noteTopics = [{name: "Maths"}, {name: "Science"}, {name: "English"}, {name: "CS"}, {name: "Business"}, {name: "Pharmacy"}, {name: "Law"}, {name: "Economics"}, 
  {name: "Accounting"}, {name: "Psychology"}, {name: "Medicine"}, {name: "Politics"}]

  const onEditField = (key, value) => {
    prop_OnUpdateNote({
      ...prop_GetActiveNote,
      id: prop_GetActiveNote.noteIDCustom,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  //If there is no active note selected then this will be used as a placeholder
  if (!prop_GetActiveNote)
  return <div className="no-active-note">No selected note</div>;

  //Used to set the topic of the note
  const settingTopic = () => {
    var select = document.getElementById("topicList");
    var value = select.options[select.selectedIndex].value;
    onEditField("topic", value);
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
            style={{
              marginBottom: "20px",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            Word Count: {wordCount}{" "}
          </label>

          <CKEditor
            editor={Editor}
            config={{
              toolbar: [
                "heading",
                "|",
                "undo",
                "redo",
                "fontFamily",
                "fontSize",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "outdent",
                "indent",
                "|",
                "blockQuote",
                "insertTable",
                "mediaEmbed",
                "underline",
                "todoList",
                "strikethrough",
                "specialCharacters",
                "pageBreak",
                "highlight",
                "horizontalLine",
                "fontBackgroundColor",
                "fontColor",
                "code",
                "codeBlock",
                "alignment",
              ],
            }}
            data={prop_GetActiveNote.body}
            id={prop_GetActiveNote.noteIDCustom}
            onChange={(event, editor) => {
              onEditField("body", editor.getData());
              setWordCount(
                editor
                  .getData()
                  .replace(/(<([^>]+)>)/gi, "")
                  .trim()
                  .split(/\s+/).length
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default NoteCreatorEditor