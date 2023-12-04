import { FaTrashCan } from 'react-icons/fa6'
import { FaSave } from "react-icons/fa"
import { TiDelete } from "react-icons/ti";
import { toast } from 'react-toastify'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'


function Actions({ onClear, formData, setFormData, title, noteText }) {

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
            console.log(`This should be the saved note id: ${docRef.id}`)
            setFormData({ ...formData, noteText: '', title: '' })
            toast.success('Note saved successfully')
            // navigate(`/edit/${docRef.id}`)
        }
    }


    return (

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
        </div>
    )
}
export default Actions