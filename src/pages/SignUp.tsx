import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import {db} from '../firebase.config'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg?react'

function SignUp(){
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    console.log(db.type);

    const {name, email, password} = formData

    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const auth = getAuth()

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                });
            } else {
                throw new Error('No current user after sign up');
            }

            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <div className="pageContainer">
                <p className="pageHeader">Welcome Back!</p>
            
                <main>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="nameInput"
                            placeholder="Name"
                            id="name"
                            value={name}
                            onChange={onChange}
                        />
                        <input
                            type="email"
                            className="emailInput"
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={onChange}
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

                        <div className="signUpBar">
                            <p className="signUpText">
                                Sign Up
                            </p>
                            <button className="signUpButton">
                                <ArrowRightIcon fill="#ffffff" width='34px' height='34px' />
                            </button>
                        </div>
                    </form>

                    {/* Google OAuth */}
                    <Link to='/sign-in' className="registerLink">
                        Sign In Instead
                    </Link>
                </main>
            </div>
        </>
    )
}

export default SignUp