import React, { useEffect, useRef } from "react";
import { Note } from "../classes/Note";

import NoteService from "../services/NoteService";

export default function Save(props) {
  // References of input fields
  const titleRef = useRef(null);
  const textRef = useRef(null);

  // Change values to current noteToEdit note
  useEffect(() => {
    if(props.noteToEdit !== null){
      titleRef.current.value = props.noteToEdit.title;
      textRef.current.value = props.noteToEdit.text;
    }else{
      titleRef.current.value = "";
      textRef.current.value = "";
    }
  }, [props.noteToEdit])

  // Handle save note
  const handleSubmit = (event) => {
    // Do not refresh page
    event.preventDefault();

    const note = new Note(
      props.noteToEdit !== null?props.noteToEdit.id:null,
      titleRef.current.value === "" ? null : titleRef.current.value,
      textRef.current.value
    );

    if(props.noteToEdit === null){
      // Add new note to database
      NoteService.addNote(note).then((note) => {
        
        const returnedNote = Object.assign(note.data, Note.class);
        
        // Add new note to current state
        props?.setNotes((notes) => {
          return [...notes, returnedNote];
        });
      });
    }else{
      // Add exisitng edited note to database
      NoteService.updateNote(note.id, note).then((note) => {

        const returnedNote = Object.assign(note.data, Note.class);
        
        // Update the note of the current state
        props?.setNotes((notes) => {
          return notes.map(n => {
            if(n.id === returnedNote.id)
              return returnedNote
            else 
              return n
          })
        })
      }).then(_=> props.setNoteToEdit(null));
    }

    // Reset input fields 
    titleRef.current.value = "";
    textRef.current.value = "";
  };

  // Delete all existing notes
  const handleDeleteAll = (event) => {
    event.preventDefault();
    NoteService.deleteAllNotes().then((_) => props?.setNotes([]));
  };

  // Input fields and action buttons to manipulate the notes
  return (
    <form className="w-3/4 md:w-1/2">
      <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 mt-4">
        <div className="flex flex-col py-2 px-4 bg-white rounded-t-lg">
          <p className="text-red-500 text-sm self-end py-2 px-4 font-thin">(*) required</p>
          <label htmlFor="title" className="px-2">
            Title*
          </label>
          <input
            id="title"
            name="title"
            ref={titleRef}
            className="px-2 py-2 w-full text-sm text-gray-900 bg-white"
            placeholder="Write the title..."
            maxLength={80}
          />
        </div>
        <hr />
        <div className="py-2 px-4 bg-white rounded-t-lg">
          <label htmlFor="text" className="px-2">
            Text
          </label>
          <textarea
            id="text"
            name="text"
            rows="4"
            ref={textRef}
            className="px-2 py-2 w-full scrollbar-hide text-sm text-gray-900 bg-white "
            placeholder="Write a note..."
            required=""
          />
        </div>
        {props.noteToEdit === null && <div className="flex justify-between items-center py-2 px-3 border-t">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Save
          </button>
          <button
            onClick={handleDeleteAll}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-700"
          >
            Delete all notes
          </button>
        </div>}
        {props.noteToEdit !== null && <div className="flex justify-between items-center py-2 px-3 border-t">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
            Finish Edit
          </button>
          </div>}
      </div>
    </form>
  );
}
