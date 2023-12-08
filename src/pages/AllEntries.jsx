import Navbar from '../components/Navbar'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Link } from 'react-router-dom'



function AllEntries() {
    const auth = getAuth()
    const isMounted = useRef(true)
    const [allEntries, setAllEntries] = useState([])
    const sortedEntries = allEntries.sort((a, b) => b.createdAt - a.createdAt)
    const isSmallScreen = window.matchMedia("(max-width: 500px)").matches


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
                    console.log('no user')
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
    if (sortedEntries.length === 0) {
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
    } else if (sortedEntries.length > 0) {
        return (
            <>
                <Navbar />
                <div className='mb-5'>

                    <h2 className={isSmallScreen ? 'text-2xl text-center' : 'text-4xl text-center'}>{allEntries.length} {allEntries.length === 1 ? 'Previous Entry' : 'Previous Entries'}</h2>
                    <br />
                    {sortedEntries.map((entry) => {
                        return (

                            <div key={entry.noteId}>

                                <div className="collapseContainer">
                                    <div className="collapse bg-base-200">
                                        <input type="checkbox" />
                                        <div className="collapse-title text-lg text-center font-semibold ">
                                            {entry.editedAt ? ` Edited on ${entry.editedAt.toDate().toLocaleDateString()}` : `Created on ${entry.createdAt.toDate().toLocaleDateString()}`} - <span className={isSmallScreen ? 'text-2xl font-semibold' : 'text-3xl'}>{entry.title}</span>
                                        </div>
                                        <div className="collapse-content">
                                            <Link
                                                className="text-center text-xl"
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