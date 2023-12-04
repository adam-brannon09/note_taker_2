import Navbar from "../components/Navbar"
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function EditScreen() {
    const auth = getAuth()
    const params = useParams()
    const navigate = useNavigate()
    const isMounted = useRef(true)


    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        noteText: "",
        title: "",

    })
    const { noteText, title } = formData

    // get the note from the database
    useEffect(() => {
        setLoading(true)
        const fetchPreviousEntry = async () => {

            const docRef = doc(db, 'notes', params.noteId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setFormData(docSnap.data())
                setLoading(false)
            } else {
                toast.error('This note does not exist')
            }
        }
        fetchPreviousEntry()
    }, [params.noteId])


    useEffect(() => {
        if (isMounted.current) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid })
                } else {
                    toast.error('You are not logged in')
                }
            })
        }
        return () => {
            isMounted.current = false
        }
    }, [auth])

    const onClear = () => {
        setFormData({ ...formData, noteText: "", title: "" })
    }

    const onDelete = async () => {
        await deleteDoc(doc(db, 'notes', params.noteId))
        toast.success('Note deleted successfully')
        navigate('/note')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const formDataCopy = { ...formData }
        formDataCopy.editedAt = serverTimestamp()

        const docRef = doc(db, 'notes', params.noteId)
        await updateDoc(docRef, formDataCopy)
        toast.success('Note updated successfully')
        navigate('/note')
    }

    const onMutate = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }


    return (
        <>

            <>
                <Navbar />
                <div className="noteScreen">
                    {/* note input area */}
                    <div className='textareaContainer' onSubmit={onSubmit}>
                        <div className='titleDiv'>
                            <label className='text-4xl' htmlFor="title">Note Title:</label>
                            {/* note title input */}
                            <input
                                type="text"
                                className='input input-bordered titleInput'
                                id='title'
                                value={title}
                                placeholder='Enter note title here...'
                                maxLength='60'
                                minLength='1'
                                required
                                onChange={onMutate}

                            />
                        </div>
                        {/* note text input */}
                        <textarea

                            className="textarea textarea-bordered"
                            placeholder="Enter your notes here..."
                            value={noteText}
                            id="noteText"
                            maxLength='60'
                            minLength='0'
                            required
                            onChange={onMutate}
                        >
                        </textarea>
                    </div>

                    {/* save and clear buttons */}
                    <div className='actionsContainer'>
                        {/* save text btn */}
                        <button
                            type='button'
                            className='btn btn-success'
                            id='saveBtn'
                            onClick={onSubmit}
                        >
                            Save
                        </button>
                        {/* clear text btn */}
                        <button
                            type='button'
                            className='btn btn-warning'
                            id='clearBtn'
                            onClick={onClear}

                        >
                            Clear
                        </button>
                        {/* delete note */}
                        <button
                            type='button'
                            className='btn btn-error'
                            id='deleteBtn'
                            onClick={onDelete}

                        >
                            Delete
                        </button>
                    </div>
                </div >
            </>

        </>

    )
}
export default EditScreen