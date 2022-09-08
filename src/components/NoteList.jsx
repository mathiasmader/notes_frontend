import React from "react";
import NoteComponent from "./NoteComponent";

export default function NoteList(props){

    // Shows the notes in a list of NoteComponents
    return (
        <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8">
            {props?.notes?.map(note => {
                return <NoteComponent key={note.id} setNoteToEdit={props.setNoteToEdit} setNotes={props.setNotes} note={note}/>
            })}           
        </div>
    )
}