import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"


function SignIn() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                toast.success("Signed in successfully")
                navigate('/note')
            }

        } catch (error) {
            toast.error("Error signing in")
        }
    }

    return (
        <div className="welcome" >
            <h1 className="title">Note Taker</h1>

            <div >
                <form onSubmit={handleSubmit} className="formContainer">
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
                        className="showPassword"
                        onClick={() => setShowPassword((prev) => !prev)}
                    />

                    <button className="btn btn-lg btn-wide">
                        Login
                    </button>
                    <br />
                    <Link to='/sign-up'>Not a member? Sign Up!</Link>
                    <br />
                    <Link to='/forgot-password'>Forgot Password?</Link>


                </form>
            </div>

        </div>
    )
}
export default SignIn