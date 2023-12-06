import Navbar from '../components/Navbar'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, getDocs, serverTimestamp, where, query } from 'firebase/firestore'
import { db } from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import List from '../components/List'


function NoteScreen() {
    // eslint-disable-next-line
    const auth = getAuth()


    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [previousEntries, setPreviousEntries] = useState([])
    const [formData, setFormData] = useState({
        noteText: "",
        title: "",
        noteId: "",
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                // map through docs and push to previousEntries array
                const previousEntries = querySnapshot.docs.map((doc) => ({
                    docId: doc.id,
                    ...doc.data(),
                }))
                setPreviousEntries(previousEntries)
                // setPreviousEntry(previousEntry)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPreviousEntries()

    }, [auth.currentUser.uid, formData])


    // function for the clear button to clear the text area and title input
    const onClear = () => {
        setFormData({ ...formData, noteText: '', title: '' })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!title || !noteText) {
            toast.error('Please enter a title and some text!')

        } else {
            const formDataCopy = {
                ...formData,
                date: serverTimestamp(),
            }

            formDataCopy.noteText = noteText
            formDataCopy.title = title
            formDataCopy.noteId = uuidv4()

            const docRef = await addDoc(collection(db, 'notes'), formDataCopy)
            setFormData({ ...formData, noteText: '', title: '' })
            toast.success('Note saved successfully')
        }
    }
    const onMutate = (e) => {
        // destructure id and value from event target
        const { id, value } = e.target;

        // Ensure value is set to an empty string if it's undefined or null
        const updatedValue = value || '';

        setFormData((prevState) => ({
            ...prevState,
            [id]: updatedValue,

        }));

    }
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 900);
            console.log(window.innerWidth); // Optional: Log the window width for debugging
            console.log(isSmallScreen);
            addEventListener('resize', handleResize)

        }
        handleResize()
    }, []);


    return (
        <>
            <Navbar />
            <div className="noteScreen">
                {/* previous entries */}
                <List previousEntries={previousEntries} />
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
                        maxLength='100'
                        minLength='0'
                        required
                        onChange={onMutate}
                    >
                    </textarea>
                </div>

                {/* <Actions /> */}
                <div className={isSmallScreen ? 'actionsContainer2' : 'actionsContainer'}>

                    <button
                        type='button'
                        className='btn btn-success'
                        id='saveBtn'
                        onClick={onSubmit}
                    >
                        Save
                    </button>

                    <button
                        type='button'
                        className='btn btn-warning'
                        id='clearBtn'
                        onClick={onClear}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </>
    )
}
export default NoteScreen