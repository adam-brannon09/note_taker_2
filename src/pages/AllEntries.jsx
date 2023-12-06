import Navbar from '../components/Navbar'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'


function AllEntries() {
    const auth = getAuth()
    const params = useParams()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    const [allEntries, setAllEntries] = useState([])
    const sortedEntries = allEntries.sort((a, b) => b.date - a.date)


    useEffect(() => {
        if (isMounted.current) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setAllEntries((prevEntries) => {
                        return prevEntries.map((entry) => {
                            return { ...entry, userRef: user.uid }
                        })
                    })
                } else {
                    toast.error('You are not logged in')
                }
            })
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])



    // get all notes from the database
    useEffect(() => {
        // const fetchPreviousEntries = async () => {

        //     const querySnapshot = await getDocs(collection(db, 'notes'))
        //     const entries = []
        //     querySnapshot.forEach((doc) => {
        //         console.log(doc.data())
        //         entries.push({ ...doc.data(), docId: doc.id })
        //     })
        //     setAllEntries(entries)
        // }
        const fetchPreviousEntries = async () => {
            try {
                const notesRef = collection(db, 'notes')
                const q = await query(notesRef, where('userRef', '==', auth.currentUser.uid))
                const querySnapshot = await getDocs(q)
                const entries = []
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                    entries.push({ ...doc.data(), docId: doc.id })
                })
                setAllEntries(entries)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPreviousEntries()

    }, [isMounted.current])




    // if there are no entries, display a message
    if (allEntries.length === 0) {
        return (
            <>
                <Navbar />
                <div className='alertPrevEntries'>
                    <div role="alert" className="alert shadow-lg noEntries">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                            <h3 className="font-bold text-2xl">Sorry {auth.currentUser.displayName}!</h3>
                            <div className="text-lg">It looks like you haven't made any entries, </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (allEntries.length > 0) {
        return (
            <>
                <Navbar />
                <div className='mb-5'>

                    <p className='text-2xl text-center'>{allEntries.length} Entries</p>
                    <br />
                    {allEntries.map((entry) => {
                        return (

                            <div key={entry.noteId}>

                                <div className="collapseContainer">
                                    <div className="collapse bg-base-200">
                                        <input type="checkbox" />
                                        <div className="collapse-title text-3xl font-semibold ">
                                            {entry.title}
                                        </div>
                                        <div className="collapse-content">
                                            <Link
                                                className=""
                                                to={`/edit/${entry.docId}`}
                                            >
                                                <p className='text-1xl'>{entry.noteText}</p>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        )
                    })}

                </div>
            </>
        )

    }
}
export default AllEntries