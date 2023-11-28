import { FaTrashCan } from 'react-icons/fa6'
import { FaSave } from "react-icons/fa"
import { TiDelete } from "react-icons/ti";


function Actions() {

    const onSave = () => {


    }

    const onClear = () => {

    }

    return (
        <div className='actionsContainer'>

            {/* <button><FaSave className='actionIcon text-3xl' /></button>
            <button><TiDelete className='actionIcon text-4xl' /></button> */}
            <button className='btn btn-ghost'
                onClick={onSave}>Save</button>
            <button className='btn btn-ghost'>Clear</button>


        </div>
    )
}
export default Actions