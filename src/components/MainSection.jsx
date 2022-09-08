import React, { useEffect, useState } from "react"
import Save from "./Save"
import NoteList from "./NoteList"
import NoteService from "../services/NoteService"
import { Note } from "../classes/Note";

export default function MainSection(){

    // State to represent all existing notes
    const [notes, setNotes] = useState([]);

    // State for the current note that gets edited
    const [noteToEdit, setNoteToEdit]=useState(null);

    /**
     * Fetch data from API, only once
     */
    useEffect(()=> {
        NoteService.getAllNotes().then(notes => {
            setNotes(Object.assign(notes.data, Note.class))
        })
    }, [])

    // Includes edit area and the list of the notes 
    return (
        <div className="flex flex-col items-center">
            <Save setNotes={setNotes} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit}/>
            <NoteList notes={notes} setNotes={setNotes} setNoteToEdit={setNoteToEdit}/>
        </div>
    )

}