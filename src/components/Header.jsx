import React from "react"

/**
 * Top part of the noteApp
 * @returns 
 */
export default function Header(){
    return (
        <header className="flex items-center border-b-1 drop-shadow-lg bg-slate-600">
            <h1 className="text-white text-3xl font-bold select-none p-4 mr-auto">{process.env.REACT_APP_TITLE}</h1>
        </header>
    )
}