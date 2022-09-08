import axios from "axios"

class NoteService {

    constructor(){
        this.client = null;
        this.api_url = process.env.REACT_APP_NOTE_API_URL;
    }

    /**
    * Initialize axios object for ajax request
    */
    init(){
        let headers = {
            Accept: "application/json"
        };

        this.client = axios.create({baseURL: this.api_url, headers: headers});
        return this.client;
    } 
    
    /**
     * Get all notes from database
     */
    getAllNotes(){
        return this.init().get("/");
    }

    /**
     * Get single note by id
     */
    getNoteById(id){
        return this.init().get(`/${id}`);
    }

    /**
     * Add note to database
     */
    addNote(note){
        return this.init().post("/", note);
    }

    /**
     * Update existing note by id
     */
    updateNote(id, note){
        return this.init().put(`/${id}`,note);
    }

    /**
     * Delete all notes from database
     */
    deleteAllNotes(){
        return this.init().delete("/");
    }

    /**
     * Delete single note by id
     */
    deleteNoteById(id){
        return this.init().delete(`/${id}`)
    }

}

export default new NoteService();