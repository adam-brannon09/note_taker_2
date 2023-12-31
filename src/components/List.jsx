import { Link } from 'react-router-dom'


function List({ previousEntries }) {

    const isSmallScreen = window.matchMedia("(max-width: 500px)").matches

    // sort previous entries by date
    const sortedEntries = previousEntries.sort((a, b) => b.createdAt - a.createdAt)

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
            <></>
        )
        // if there are previous entries and the screen is large, display a list of buttons
    } else if (sortedEntries.length > 0) {
        return (
            // {/* previous entries */ }
            <div className="prevEntries" >
                <h2 className='text-2xl mb-7 mt-16 text-center font-semibold'>Recent Entries</h2>

                <ul className='entriesList'>
                    {sortedEntries.slice(0, 10).map((entry) => {
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
            </div>
        )
    }
}
export default List