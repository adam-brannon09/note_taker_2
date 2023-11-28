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
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">{name}'s Notes </a>
            </div>
            <div className="navbar-end">
                <button className="btn" onClick={onLogout}>Log Out</button>
            </div>
        </div>
    )

}
export default Navbar