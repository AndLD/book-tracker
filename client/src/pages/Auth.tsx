import { useState } from 'react'
import '../styles/AuthPage.scss'
import SignupForm from '../components/Auth/SignupForm'
import SigninForm from '../components/Auth/SigninForm'
import { useColorPrimary } from '../hooks/theme'

export default function Auth() {
    const colorPrimary = useColorPrimary()

    const [isSignUp, setIsSignUp] = useState(false)

    const title = isSignUp ? 'Sign Up' : 'Login'
    const form = isSignUp ? <SignupForm /> : <SigninForm />
    const reference = isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>{title}</h1>
                {form}
                <p
                    style={{
                        marginTop: '15px',
                        cursor: 'pointer',
                        color: colorPrimary,
                        textAlign: 'right'
                    }}
                    onClick={() => setIsSignUp(!isSignUp)}
                >
                    {reference}
                </p>
            </div>
        </div>
    )
}
