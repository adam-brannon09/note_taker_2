import { getAuth } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Navbar() {
    const navigate = useNavigate()
    const auth = getAuth()
    const name = auth.currentUser ? auth.currentUser.displayName : ""
    const isSmallScreen = window.matchMedia("(max-width: 500px)").matches

    const onLogout = () => {
        try {
            auth.signOut()
            toast.success("Signed out successfully")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={isSmallScreen ? "navbar flex flex-wrap" : "navbar bg-base-100 mt-3"}>
            <div className={isSmallScreen ? "navbar-center mr-2" : "navbar-start ml-5"}>
                <p className="text-3xl">{name}</p>
            </div>
            <div className={isSmallScreen ? "navbar-center" : "navbar-end mr-5"}>
                <Link className="btn mx-2" to='/note'>Home</Link>
                <Link className="btn mx-2" to='/all-entries'>All Entries</Link>
                <button className="btn" onClick={onLogout}>Log Out</button>
            </div>
        </div>
    )

}
export default Navbar