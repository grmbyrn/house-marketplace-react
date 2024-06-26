import { useState } from "react"
import {toast} from 'react-toastify'
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg?react'

function SignIn(){
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const auth = getAuth()
    
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if(userCredential.user){
                navigate('/profile')
            }
        } catch (error) {
            toast.error('Bad User Credentials')
        }
    }

    return(
        <>
            <div className="pageContainer">
                <p className="pageHeader">Welcome Back!</p>
            
                <main>
                    <form onSubmit={onSubmit}>
                        <input
                            type="email"
                            className="emailInput" placeholder="Email"
                            id="email" value={email} onChange={onChange}
                        />

                        <div className="passwordInputDiv">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="passwordInput"
                                placeholder="Password"
                                id="password"
                                value={password}
                                onChange={onChange}
                            />

                            <VisibilityIcon
                                className="showPassword"
                                onClick={() => setShowPassword((prevState) => !prevState)}
                                width='55px'
                                height='55px'
                            />
                        </div>

                        <Link to='/forgot-password' className="forgotPasswordLink">
                            Forgot Password
                        </Link>

                        <div className="signInBar">
                            <p className="signInText">
                                Sign In
                            </p>
                            <button className="signInButton">
                                <ArrowRightIcon fill="#ffffff" width='34px' height='34px' />
                            </button>
                        </div>
                    </form>

                    {/* Google OAuth */}
                    <Link to='/sign-up' className="registerLink">
                        Sign Up Instead
                    </Link>
                </main>
            </div>
        </>
    )
}

export default SignIn