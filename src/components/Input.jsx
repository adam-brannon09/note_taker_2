import { useState } from "react"

function Input() {
    const [noteText, setNoteText] = useState("")

    return (
        <>
            <textarea
                className="textarea textarea-bordered"
                placeholder="Enter your notes here..."
                // value={noteText}
                id="noteText"
            ></textarea>
        </>
    )
}
export default Input