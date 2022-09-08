import React from "react"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

import NoteService from "../services/NoteService"

export default function NoteComponent(props){

    /**
     * Deletes note by ID and updates the state
     */
    function handleDelete(){

        NoteService.deleteNoteById(props.note?.id).then(_ => {
            props.setNotes((notes) => {
                return notes.filter((note) => {
                    return note?.id !== props.note?.id;
                })
            })
        }).then(_ => props.setNoteToEdit(null));
    }

    // Includes the note infromation and action buttons
    return (
        <div className="border mt-5 p-5 border-cyan-200 w-96 h-96 bg-amber-200 rounded-md">
            <p className="text-xl p-2 font-bold">{props.note.title}</p>
            <hr className="h-1 bg-black"></hr>

            <div className="h-3/4 overflow-auto scrollbar-hide">
                <p className="p-2">{props.note.text}</p>
            </div>
            
            <div className="h-20 flex flex-row justify-end">
                <PencilSquareIcon onClick={() => {props.setNoteToEdit(props.note); window.scrollTo(0,0)}} className="w-8 h-8 mt-3 hover:fill-slate-600 cursor-pointer"/>
                <TrashIcon onClick={handleDelete} className="w-8 h-8 mt-3 hover:fill-slate-600 cursor-pointer"/>
            </div>
        </div>
    )
}