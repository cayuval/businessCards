import { useState } from "react"
import Footer from "./Footer"
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import SpinnerContext from "../contexts/spinnerContext"
import Loader from "./Loader"
import UserContext from "../contexts/userContext"
import { getUser, signin } from "../data/data"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import ShowMobileNavContext from "../contexts/showMobileNavContext"
import { useEffect } from "react"


export default function Login() {
    //the states, for the input texts
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    //err state in case the user wont be able to log in
    const [err, setErr] = useState("")
    //useFull function to navigate through the website 

    const navigateTo = useNavigate()
    //spinner context, activated with every call to server

    const [spinner, setSpinner] = useContext(SpinnerContext)
    //user context, in order to know  who is the User and what is his credentials, guests only can see this page

    const [user, setUser] = useContext(UserContext)
    ///when we open the page on mobile - close the navbar

    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)

    //when we open the page on mobile - close the navbar

    useEffect(() => {
        setShowMobileNav(false)
    }, [])
    //
    function login() {

        //before a fetch call, show the loader

        setSpinner(true)
        //
        const userLoggingIn = { email: email, password: password }
        signin(userLoggingIn).then(res => {
            if (res.ok) {
                //if response is good return it
                return res.json()
            } else {

                //if response is bad, empty the input elemnt
                setPassword("")
                setEmail("")
            }
        }).then((token) => {
            if (token) {
                //in this case the response is good, therefor we recived a token and now we store it in the local storage
                localStorage.setItem("userToken", token)
                //call is over - close the loader

                setSpinner(false)

                //get the user details to know his name and if he is a business account
                getUser().then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                }).then(loggedInUser => {

                    //change the user context to the user thats logged in
                    setUser({ ...user, userName: loggedInUser.name, isBusinessAccount: loggedInUser.isBusinessAccount })
                    if (loggedInUser.isBusinessAccount) {
                        //if the user is a business account - navigate to create a new card component
                        navigateTo('../addNewCard')
                    } else {
                        //if the user isn't a business account - navigate to the cards component
                        navigateTo('../cards')
                    }
                })

            } else {
                //change the err stete to show the user he did not log in
                setErr("Userame Or Password are wrong")
                //call is over - close the loader
                setSpinner(false)
            }
        }).catch(error => {
            alert(error.message)
            //call is over - close the loader
            setSpinner(false)
        })

    }
    //only not logged in users can see the component
    if (user.userName.toLowerCase() == 'guest') {
        return (<>
            <h1>Login</h1>
            {spinner && <Loader />}
            <div className="logInForm">
                <div className="logInField">
                    <label>Email:</label>
                    <br />
                    <input className={err ? 'err' : ''} value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="text" />
                </div>
                <div className="logInField">
                    <label>Password:</label>
                    <br />
                    <input className={err ? 'err' : ''} value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" />
                </div>
                <div className="logInField">
                    <p style={{ color: 'red', textAlign: 'center' }}>Not registred?
                        <span style={{ color: 'red', display: 'block', textDecoration: 'underline', cursor: "pointer" }} onClick={() => {
                            navigateTo('../signup/business')
                        }}>sign up as a business</span>
                        <span style={{ color: 'red', display: 'block', textDecoration: 'underline', cursor: "pointer" }} onClick={() => {
                            navigateTo('../signup/client')
                        }}>sign up as a client</span></p>
                </div>
                <div className="logInField">
                    <button onClick={() => {
                        login()
                    }}> <FontAwesomeIcon icon={faArrowRightToBracket} />LOG IN</button>
                </div>
                <div className="logInField">
                    <p className="wrongInput" >
                        {err}

                    </p>
                </div>

            </div>

        </>)

        //
    } else {
        return (<><h2>You have no authorization</h2></>)
    }
}