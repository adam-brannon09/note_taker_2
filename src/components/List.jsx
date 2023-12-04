import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


function List({ previousEntries }) {
    const navigate = useNavigate()
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [selection, setSelection] = useState('')

    // set isSmallScreen to true if window width is less than 900px
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 900);
            console.log(window.innerWidth); // Optional: Log the window width for debugging
            console.log(isSmallScreen);
            addEventListener('resize', handleResize)

        }
        handleResize()
    }, []);

    // handle selection from dropdown menu
    // navigate to the selected note
    const handleSelection = (e) => {
        const selected = e.target.value
        setSelection(selected)
        navigate(`/edit/${selected}`)
    }

    // if there are no previous entries, display this message
    if (previousEntries.length === 0) {
        return (
            <div role="alert" className="alert shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 className="font-bold">New message!</h3>
                    <p className="text-sm">You have no previous entries. Create your note in the text area to the right and hit the save button!.</p>
                </div>
            </div>
        )
        // if there are previous entries and the screen is small, display a dropdown menu
    } else if (isSmallScreen && previousEntries.length >= 1) {
        return (
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Previous Entries:</span>
                    <span className="label-text-alt">{previousEntries.length > 1 ? `${previousEntries.length} entries` : `${previousEntries.length} entry`}</span>
                </div>
                <select
                    className="select select-lg select-bordered w-full max-w-xs"
                    value={selection}
                    onChange={handleSelection}
                >
                    <option disabled selected>Previous Entries</option>
                    {previousEntries.map((entry) => {
                        return (

                            <option
                                key={entry.noteId}
                                value={entry.docId}
                            >
                                {entry.title}
                            </option>


                        )
                    })}
                </select>
            </label>
        )
        // if there are previous entries and the screen is large, display a list of buttons
    } else if (previousEntries.length > 0) {
        return (
            // {/* previous entries */ }
            <div className="prevEntries" >
                <h1 className='text-3xl mb-9 mt-14 text-center'>Previous Entries</h1>
                <ul className='entriesList'>
                    {previousEntries.map((entry) => {
                        return (
                            <Link
                                className="btn btn-wide prevEntry mb-2"
                                to={`/edit/${entry.docId}`}
                                // id={entry.noteId}
                                key={entry.noteId}>
                                {entry.title}
                            </Link>
                        )
                    })}

                </ul>
            </div >
        )
    }
}
export default List