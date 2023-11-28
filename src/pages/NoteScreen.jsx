import Navbar from '../components/Navbar'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'


function NoteScreen() {
    // eslint-disable-next-line
    const [previousEntries, setPreviousEntries] = useState([])
    const [formData, setFormData] = useState({
        noteText: "",
        title: "",
    })
    const { noteText, title } = formData


    const auth = getAuth()
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
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
    }, [isMounted])

    const onClear = () => {
        setFormData({ ...formData, noteText: '', title: '' })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const formDataCopy = { ...formData, date: serverTimestamp() }

        formDataCopy.noteText = noteText
        formDataCopy.title = title

        const docRef = await addDoc(collection(db, 'notes'), formDataCopy)
        setFormData({ ...formData, noteText: '', title: '' })
        toast.success('Note saved successfully')
    }
    const onMutate = (e) => {
        if (e.target.value) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }))
        }
    }





    return (
        <>
            <Navbar />
            <div className="noteScreen">
                {/* previous entries */}
                <div className="prevEntries">
                    <h1 className='text-3xl mb-9'>Previous Entries</h1>
                    <ul>
                        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg prevEntry">Previous</button>
                    </ul>
                </div>
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

                    >
                        Delete
                    </button>
                </div>




                {/* <List />
                <Input />
                <Actions /> */}

            </div>
        </>
    )
}
export default NoteScreen