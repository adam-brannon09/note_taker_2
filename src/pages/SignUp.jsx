import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import { useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase.config"

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { name, email, password } = formData
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName: name
            })
            const formDataCopy = { ...formData }
            delete formDataCopy.password
            await setDoc(doc(db, "users", user.uid), formDataCopy)

            console.log(user)
            navigate("/note")
        } catch (error) {
            console.log(error)
            toast.error("Error signing up")
        }
    }

    return (
        <div className="welcome">
            <h1 className="title">Note Taker</h1>
            <div >
                <form onSubmit={handleSubmit} className="formContainer">
                    {/* name input */}
                    <input
                        type='text'
                        className='input input-lg input-bordered input-email'
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange={handleChange}
                    />
                    {/* email input */}
                    <input
                        type='email'
                        className='input input-lg input-bordered input-email'
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={handleChange}
                    />

                    {/* password input */}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className='input input-lg input-bordered input-password'
                        placeholder='Password'
                        id='password'
                        value={password}
                        onChange={handleChange}
                    />
                    <img
                        src={visibilityIcon}
                        alt="show password"
                        className="showPassword2"
                        onClick={() => setShowPassword((prev) => !prev)}
                    />
                    <button className="btn btn-lg btn-wide">
                        Register
                    </button>
                    <br />
                    <Link to='/'>Already a member? Sign In!</Link>


                </form>
            </div>
        </div>


    )
}
export default SignUp