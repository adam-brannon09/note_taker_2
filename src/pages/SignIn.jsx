import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"


function SignIn() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const isSmallScreen = window.matchMedia("(max-width: 500px)").matches

    const { email, password } = formData
    const navigate = useNavigate()

    // assigns the value of the input to the corresponding key in the formData object
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    // handles the submit event of the form
    // prevents the default behavior of the form
    // signs in the user with the email and password
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
            console.log(error)
            toast.error("Error signing in")
        }
    }

    return (
        <div className="welcome" >
            <h1 className="title">Note Taker</h1>
            <div >
                <form onSubmit={handleSubmit} className="formContainer formContainerSmall">
                    {/* email input */}
                    <input
                        type='email'
                        className={isSmallScreen ? 'input input-lg input-bordered inputEmailSmall' : 'input input-lg input-bordered input-email'}
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={handleChange}
                    />
                    {/* password input */}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={isSmallScreen ? 'input input-lg input-bordered inputPasswordSmall' : 'input input-lg input-bordered input-password'}
                        placeholder='Password'
                        id='password'
                        value={password}
                        onChange={handleChange}
                    />
                    <div>
                        <button className="btn btn-lg btn-wide">
                            Login
                        </button>
                        <div className="form-control mt-1">
                            <label className="label cursor-pointer">
                                <span className="label-text">Show Password</span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={showPassword}
                                    onChange={() => setShowPassword((prev) => !prev)} />
                            </label>
                        </div>
                    </div>
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