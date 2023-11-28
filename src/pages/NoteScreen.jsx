import Navbar from '../components/Navbar'
import Input from '../components/Input'
import List from '../components/List'
import Actions from '../components/Actions'


function NoteScreen() {

    return (
        <>
            <Navbar />
            <div className="noteScreen">
                <List />
                <Input />
                <Actions />

            </div>
        </>
    )
}
export default NoteScreen