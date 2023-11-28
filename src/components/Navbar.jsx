import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"


function Navbar() {
    const navigate = useNavigate()
    const auth = getAuth()

    const name = auth.currentUser.displayName

    const onLogout = () => {
        auth.signOut()
        navigate("/")
    }

    return (
        <div className="navbar bg-base-100 mt-3">
            <div className="navbar-start ml-5">
                <p className="text-3xl">{name}'s Notes</p>
            </div>
            <div className="navbar-end mr-5">
                <button className="btn" onClick={onLogout}>Log Out</button>
            </div>
        </div>
    )

}
export default Navbar