import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import SpinnerContext from "../contexts/spinnerContext";
import Loader from "./Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { signUp } from "../data/data";
import UserContext from "../contexts/userContext";
import ShowMobileNavContext from "../contexts/showMobileNavContext";



export default function SignUp() {
    //useFull function to understand the parameters of the url, essential for understanding what kind of user we are registering
    let params = useParams();
    //useFull function to navigate through the website 
    const navigeteTo = useNavigate()
    //spinner context, activated with every call to server
    const [spinner, setSpinner] = useContext(SpinnerContext)
    //user context, in order to know  who is the User and what is his credentials, guests only can see this page
    const [user, setUser] = useContext(UserContext)
    ///when we open the page on mobile - close the navbar
    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)
    //the state of the user wihich is going to register, state for ongoing validations
    const [newClient, setNewClient] = useState({
        name: "",
        email: "",
        password: "",
        isBusinessAccount: ""
    })
    //the state of the validation status,  state fot ongoing validations

    const [validationErr, setValidationErr] = useState({
        name: true,
        email: true,
        password: true
    })
    //err state - in case of wrong fetch call 
    const [err, setErr] = useState('')
    //function that checks if the url paremeter is business account or not and sets it in the new client state
    function setIsBusinessAccount() {
        if (params.status == 'business') {
            setNewClient({ ...newClient, isBusinessAccount: true })
        } else if (params.status == 'client') {
            setNewClient({ ...newClient, isBusinessAccount: false })
        } else (
            alert('do not change the url')
        )
    }
    useEffect(() => {
        //when we open the page on mobile - close the navbar

        setShowMobileNav(false)

    }, [])

    useEffect(() => {
        //whenever url parameters change,call the function that change the new client state
        setSpinner(true)
        setIsBusinessAccount()
        setSpinner(false)
    }, [params])
    //
    function register() {
        //validations required - only if all of them are valid, execte the fetch call
        if (!validationErr.email && !validationErr.name && !validationErr.password) {
            alert('no valid input')
        } else {
            //before a fetch call, show the loader

            setSpinner(true)
            signUp(newClient).then(res => {
                if (res.ok) {
                    //call is over - close the loader
                    setSpinner(false)
                    //if the response is good - navigate to the login button
                    navigeteTo('../login')
                } else {
                    //call is over - close the loader

                    setSpinner(false)
                    //if the response is bad - return the response 
                    return res.json()
                }
            }).then(userErr => {
                //this is the case of error
                //show the user what is the error by changing the state that will be shown later
                setErr(userErr)
            }).catch(error => {
                //call is over - close the loader
                setSpinner(false)
                alert(error.message)
            })
        }
    }
    //we will show the my cards component only for not logged in users

    if (user.userName.toLowerCase() == 'guest') {

        return (
            <>
                <h1>Sign Up</h1>
                {spinner &&
                    <Loader />
                }
                <div className="signUpForm">
                    <div className="signUpField">
                        <label htmlFor="">User Name: </label>
                        <br />
                        <input className={validationErr.name ? "success" : "err"}
                            value={newClient.name}
                            onChange={(e) => {
                                setNewClient({ ...newClient, name: e.target.value })

                                if (!e.target.value) {
                                    setValidationErr({ ...validationErr, name: false })
                                } else {
                                    setValidationErr({ ...validationErr, name: true })
                                }
                            }} type="text" />
                        <br />
                        {validationErr.name == false && <span id="validationSpan">Name is required</span>}
                    </div>
                    <div className="signUpField">
                        <label htmlFor="">Email: </label>
                        <br />
                        <input className={validationErr.email ? "success" : "err"}
                            value={newClient.email}
                            onChange={(e) => {
                                setNewClient({ ...newClient, email: e.target.value })
                                if (!e.target.value || e.target.value.indexOf('.') < 0 || e.target.value.indexOf('@') < 0) {
                                    setValidationErr({ ...validationErr, email: false })
                                } else {
                                    setValidationErr({ ...validationErr, email: true })
                                }
                            }} type="email" />
                        <br />
                        {validationErr.email == false && <span id="validationSpan">Email is required and must be valid </span>}
                    </div>
                    <div className="signUpField">
                        <label htmlFor=""> Password: </label>
                        <br />
                        <input className={validationErr.password ? "success" : "err"}
                            value={newClient.password}
                            onChange={(e) => {
                                setNewClient({ ...newClient, password: e.target.value })
                                if (!e.target.value || e.target.value.length < 6) {
                                    setValidationErr({ ...validationErr, password: false })
                                } else {
                                    setValidationErr({ ...validationErr, password: true })
                                }
                            }} type="password" />
                        <br />
                        {validationErr.password == false && <span id="validationSpan">password must be at least 6 characters </span>}
                    </div>

                    <div className="inputRules">
                        Please Notice You are folowing these rules:
                        <br />
                        <ul>
                            <li>Password Must Be over 6 charachters</li>
                            <li>Must be a valid email and cant belong to an already ssigned customer</li>
                        </ul>
                    </div>
                    <div className="signUpField">
                        <button onClick={(e) => {

                            register()
                        }}>Register <FontAwesomeIcon icon={faPersonCirclePlus} /></button>
                        <p style={{ color: 'red', textAlign: 'center' }}>{err}</p>
                    </div>

                </div>

            </>
        )
    } else {
        //
        return (<>
            {
                spinner &&
                <Loader />
            }
            <h2>You Are already logged in</h2>
        </>)
    }
}