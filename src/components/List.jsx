import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


function List({ previousEntries }) {
    const navigate = useNavigate()
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [selection, setSelection] = useState('')
    // sort previous entries by date
    const sortedEntries = previousEntries.sort((a, b) => b.date - a.date)

    // set isSmallScreen to true if window width is less than 900px
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 900);
            console.log(window.innerWidth); // Optional: Log the window width for debugging

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
            <div role="alert" className="alert alertListComponent shadow-lg mb-4">
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
                    <option value='' disabled>Previous Entries</option>
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
    } else if (sortedEntries.length > 0) {
        return (
            // {/* previous entries */ }
            <div className="prevEntries" >
                <h2 className='text-2xl mb-7 mt-16 text-center font-semibold'>Recent Entries</h2>

                <ul className='entriesList'>
                    {previousEntries.slice(0, 10).map((entry) => {
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