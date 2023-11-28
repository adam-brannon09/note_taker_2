import Navbar from '../components/Navbar'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, updateDoc, addDoc, collection, getDocs, serverTimestamp, query, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'


function NoteScreen() {
    // eslint-disable-next-line
    const auth = getAuth()
    const [previousEntry, setPreviousEntry] = useState([])
    const [formData, setFormData] = useState({
        noteText: "",
        title: "",
        noteId: uuidv4(),
        userName: auth.currentUser.displayName,
    })
    const { noteText, title } = formData

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

    //retrieve previous entries
    useEffect(() => {
        const fetchPreviousEntries = async () => {
            try {
                // get ref to notes collection
                const notesRef = collection(db, 'notes')
                // query notes collection for notes with userRef equal to current user
                const q = query(notesRef, where('userRef', '==', auth.currentUser.uid))
                // get docs from query
                const querySnapshot = await getDocs(q)
                // create empty array to push docs to

                // this method was causing duplicate entries to be pushed to the array
                // querySnapshot.forEach((doc) => {
                //     return previousEntry.push(doc.data())
                // })

                // map through docs and push to previousEntries array
                const previousEntries = querySnapshot.docs.map((doc) => doc.data())
                setPreviousEntry(previousEntries)
                // setPreviousEntry(previousEntry)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPreviousEntries()
    }, [auth.currentUser.uid, previousEntry])


    // function for the clear button to clear the text area and title input
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
        // when written this way it would not allow the user to delete all of the text in the input and textarea. it would leave one letter.
        // if (e.target.value) {
        //     setFormData((prevState) => ({
        //         ...prevState,
        //         [e.target.id]: e.target.value,
        //     }))
        // }

        const { id, value } = e.target;

        // Ensure value is set to an empty string if it's undefined or null
        const updatedValue = value || '';

        setFormData((prevState) => ({
            ...prevState,
            [id]: updatedValue,
        }));


    }

    return (
        <>
            <Navbar />
            <div className="noteScreen">
                {/* previous entries */}
                <div className="prevEntries">
                    <h1 className='text-3xl mb-9'>Previous Entries</h1>
                    <ul>
                        {/* <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg prevEntry">
                        </button> */}
                        {previousEntry.map((entry) => {
                            return (
                                <button
                                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg prevEntry mb-2"
                                    id={entry.noteId}
                                >
                                    {entry.title}
                                </button>
                            )
                        })}

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