import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'




function ForgotPassword() {

    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success('Password reset link sent to email')
            navigate('/')
        } catch (error) {
            toast.error('Error sending password reset email')
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    return (

        <div className="welcome" >
            <h1 className="title">Forgot Password</h1>
            <div >
                <form onSubmit={handleSubmit} className="formContainer">
                    <label className="form-control">
                        <div className='label'>
                            <span className="label-text">What is your email address?</span>
                        </div>
                        {/* email input */}
                        <input
                            type='email'
                            className='input input-lg input-bordered input-email'
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <div className='text-center'>
                        <button className="btn btn-lg btn-wide">
                            Get Reset Link
                        </button>

                    </div>

                    <Link to='/' className='mt-4'>Sign In</Link>

                </form>
            </div>

        </div>

    )
}
export default ForgotPassword