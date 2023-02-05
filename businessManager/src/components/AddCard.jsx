import { faBriefcase, faBusinessTime, faHome, faImage, faLandMineOn, faLocation, faPhone, faPlus, faPlusCircle, faServer } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ShowMobileNavContext from "../contexts/showMobileNavContext"
import SpinnerContext from "../contexts/spinnerContext"
import UserContext from "../contexts/userContext"
import { addCard } from "../data/data"
import Footer from "./Footer"
import Loader from "./Loader"

//component form for adding new business Card
export default function AddCard() {
    //object for new business Card
    const [newCard, setNewCard] = useState({
        businessName: "",
        businessDescription: "",
        businessAddress: "",
        businessPhone: "",
        businessImage: ""
    })
    //in case of error, show it
    const [err, setErr] = useState("")
    //for ongoing validations
    const [validationErr, setValidationErr] = useState({
        businessName: true,
        businessDescription: true,
        businessAddress: true,
        businessPhone: true,
        businessImage: true
    })
    //spinner context, activated with every call to server
    const [spinner, setSpinner] = useContext(SpinnerContext)
    //user context, in order to know  who is the User and what is his credentials, guests and normal clients cant see this page
    const [user, setUser] = useContext(UserContext)
    //useFull function to navigate through the website 
    const navigateTo = useNavigate()
    ///when we open the page on mobile - close the navbar
    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)


    function addNewCard() {
        //addNew card is a Fetch call for the function
        addCard(newCard).then(res => {
            //json response even if the status is wrong
            return res.json()
        }).then((cardOrError) => {
            //when the request end it send back the new card object
            if (typeof cardOrError == "object") {
                navigateTo("../myCards")
            } else {
                //in case of an Error request it send back whats wrong with the input
                setErr(cardOrError)
            }
            //in case of error it probably mean the backend server is down
        }).catch((error) => { alert(error.message) })

    }
    ///when we open the page on mobile - close the navbar
    useEffect(() => {
        setShowMobileNav(false)
    }, [])

    //only if the user is logged in and is a business account, render the form
    if (user.userName.toLowerCase() !== 'guest' && user.isBusinessAccount) {
        //the spinner is here for the send request
        return (<>
            {spinner &&
                <Loader />}
            <h1>Create Business Card</h1>

            <div className="createCardForm">
                <div className="createCardField">
                    <label htmlFor=""><FontAwesomeIcon icon={faBriefcase} /> Business Name: </label>
                    <br />

                    <input className={validationErr.businessName ? "success" : "err"} type="text" value={newCard.businessName} onChange={(e) => {
                        setNewCard({ ...newCard, businessName: e.target.value })
                        //incase of the input isnt valid change the validation state
                        if (!e.target.value || e.target.value.length < 5 || e.target.value.length > 255) {
                            setValidationErr({ ...validationErr, businessName: false })
                        } else {
                            setValidationErr({ ...validationErr, businessName: true })
                        }
                    }} />
                    <br />

                    {validationErr.businessName == false && <span className="validationSpan">Business Name must be between 5 to 255 characters</span>}
                </div>
                <div className="createCardField">
                    <label htmlFor=""><FontAwesomeIcon icon={faServer} /> Business Description: </label>
                    <br />
                    <input className={validationErr.businessDescription ? "success" : "err"} type="text" value={newCard.businessDescription} onChange={(e) => {
                        setNewCard({ ...newCard, businessDescription: e.target.value })
                        if (!e.target.value || e.target.value.length < 20 || e.target.value.length > 255) {
                            //incase of the input isnt valid change the validation state

                            setValidationErr({ ...validationErr, businessDescription: false })
                        } else {
                            setValidationErr({ ...validationErr, businessDescription: true })
                        }
                    }} />
                    <br />
                    {validationErr.businessDescription == false && <span className="validationSpan">Business description must be between 20 to 255 characters</span>}
                </div>
                <div className="createCardField">
                    <label htmlFor=""><FontAwesomeIcon icon={faHome} /> Business Address: </label>
                    <br />
                    <input className={validationErr.businessAddress ? "success" : "err"} type="text" value={newCard.businessAddress} onChange={(e) => {
                        setNewCard({ ...newCard, businessAddress: e.target.value })
                        //incase of the input isnt valid change the validation state
                        if (!e.target.value || e.target.value.length < 20 || e.target.value.length > 255) {

                            setValidationErr({ ...validationErr, businessAddress: false })
                        } else {
                            setValidationErr({ ...validationErr, businessAddress: true })
                        }

                    }} />
                    <br />
                    {validationErr.businessAddress == false && <span className="validationSpan">Business address must be between 20 to 255 characters</span>}
                </div>
                <div className="createCardField">
                    <label htmlFor="">< FontAwesomeIcon icon={faPhone} /> Business Phone: </label>
                    <br />
                    <input className={validationErr.businessPhone ? "success" : "err"} type="text" value={newCard.businessPhone} onChange={(e) => {
                        setNewCard({ ...newCard, businessPhone: e.target.value })
                        //incase of the input isnt valid change the validation state
                        if (!e.target.value || e.target.value.length < 9 || e.target.value.length > 14) {

                            setValidationErr({ ...validationErr, businessPhone: false })
                        } else {
                            setValidationErr({ ...validationErr, businessPhone: true })
                        }
                    }} />
                    <br />
                    {validationErr.businessPhone == false && <span className="validationSpan">Business phone must be between 9 to 14 characters</span>}
                </div>
                <div className="createCardField">
                    <label htmlFor=""><FontAwesomeIcon icon={faImage} /> Business Image URL: </label>
                    <br />
                    <input className={validationErr.businessImage ? "success" : "err"} type="text" value={newCard.businessImage} onChange={(e) => {
                        setNewCard({ ...newCard, businessImage: e.target.value })
                        //incase of the input isnt valid change the validation state
                        if (!e.target.value || e.target.value.length < 20 || e.target.value.length > 500) {

                            setValidationErr({ ...validationErr, businessImage: false })
                        } else {
                            setValidationErr({ ...validationErr, businessImage: true })
                        }
                    }} />
                    <br />
                    {validationErr.businessImage == false && <span className="validationSpan">Business image URL must be between 20 to 500 characters</span>}
                </div>
                <div className="createCardField">
                    <span>{err}</span>
                </div>
                <div className="createCardField">
                    <button onClick={() => {
                        addNewCard()
                    }}><FontAwesomeIcon icon={faPlus} /> Add new Card</button>
                </div>
            </div>
        </>)
    } else {
        //otherwise - render the user he have no ccredentials
        return (<>
            {spinner &&
                <Loader />}
            <h2>NO CREDENTIALS</h2>
        </>)

    }
}