import { getAuth } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"


function Navbar({ displayName }) {
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
                <p className="text-3xl">{name}</p>
            </div>
            <div className="navbar-end mr-5">
                <Link className="btn mx-2" to='/note'>Home</Link>
                <button className="btn" onClick={onLogout}>Log Out</button>
            </div>
        </div>
    )

}
export default Navbar