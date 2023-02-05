import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SpinnerContext from "../contexts/spinnerContext"
import UserContext from "../contexts/userContext"
import Loader from "./Loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faHome, faImage, faPhone, faSave, faServer } from "@fortawesome/free-solid-svg-icons"
import { getMyCard, updateCard } from "../data/data"
import ShowMobileNavContext from "../contexts/showMobileNavContext"

export default function EditMyCard() {
    //user context, in order to know  who is the User and what is his credentials, guests and normal clients cant see this page
    const [user, setUser] = useContext(UserContext)
    //the state of the card wihich we are going to change, state fot ongoing validations
    const [editmycard, setEditMyCard] = useState({
        _id: "",
        businessName: "",
        businessDescription: "",
        businessAddress: "",
        businessPhone: "",
        businessImage: ""
    })
    //the state of the validation status,  state fot ongoing validations
    const [validationErr, setValidationErr] = useState({
        businessName: true,
        businessDescription: true,
        businessAddress: true,
        businessPhone: true,
        businessImage: true
    })
    //spinner context, activated with every call to server
    const [spinner, setSpinner] = useContext(SpinnerContext)
    ///when we open the page on mobile - close the navbar
    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)
    //useFull function to understand the parameters of the url, essential for fetching the card information 
    let params = useParams()
    //useFull function to navigate through the website 
    const navigateTo = useNavigate()
    //when the component is being rendered the first time - use a fetch call to the rest api server to get the creator's name

    //when the component is being rendered the first time - check if the user is abusiness account so he wont fetch the card daae - if so, fetch the card data we want from the rest api srver and place it in the input element
    useEffect(() => {
        if (user.userName.toLowerCase() !== 'guest' && user.isBusinessAccount) {
            if (!params.id || params.id == 'undefined') {
                //if we dont have the card id, send alert to the user
                alert('no card id')
            } else {
                // fetch call is about to start - show the loader
                setSpinner(true)
                getMyCard(params.id).then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        alert('card not found')
                    }
                }).then(card => {
                    //changing the card state by the response
                    setEditMyCard(card[0])
                    //call is over - close the loader

                    setSpinner(false)

                }).catch(error => {
                    alert(error)
                    //call is over - close the loader
                    setSpinner(false)
                })
            }

        }
        ///when we open the page on mobile - close the navbar
        setShowMobileNav(false)
    }, [])

    //

    function editCard() {
        //validations required - only if all of them are valid, execte the fetch call
        if (validationErr.businessAddress && validationErr.businessDescription && validationErr.businessImage && validationErr.businessName && validationErr.businessPhone) {
            updateCard(params.id, editmycard).then(res => {
                return res.json()
            }).then(cardorErr => {
                if (typeof cardorErr == "string") {
                    //in case of an error - alert the user
                    alert('card didnt change')
                } else {
                    //in case of a auccess - navigate to my cards
                    navigateTo("../myCards")
                }
            }).catch(error => { alert(error.message) })

        } else {
            //the input isnt valid - alert the user
            alert('no valid input')
        }
    }


    //only if the user  isnt a guest and he is a business account - show him the form
    if (user.userName.toLowerCase() !== 'guest' && user.isBusinessAccount) {

        return (<>


            <h1>Edit Business Card</h1>
            <div className="createCardForm">
                <div className="createCardField">
                    <label htmlFor=""><FontAwesomeIcon icon={faBriefcase} /> Business Name: </label>
                    <br />
                    <input className={validationErr.businessName ? "success" : "err"} type="text" value={editmycard.businessName} onChange={(e) => {
                        setEditMyCard({ ...editmycard, businessName: e.target.value })
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
                    <input className={validationErr.businessDescription ? "success" : "err"} type="text" value={editmycard.businessDescription} onChange={(e) => {
                        setEditMyCard({ ...editmycard, businessDescription: e.target.value })
                        if (!e.target.value || e.target.value.length < 20 || e.target.value.length > 255) {

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
                    <input className={validationErr.businessAddress ? "success" : "err"} type="text" value={editmycard.businessAddress} onChange={(e) => {
                        setEditMyCard({ ...editmycard, businessAddress: e.target.value })
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
                    <label htmlFor=""><FontAwesomeIcon icon={faPhone} /> Business Phone: </label>
                    <br />
                    <input className={validationErr.businessPhone ? "success" : "err"} type="text" value={editmycard.businessPhone} onChange={(e) => {
                        setEditMyCard({ ...editmycard, businessPhone: e.target.value })
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
                    <input className={validationErr.businessImage ? "success" : "err"} type="text" value={editmycard.businessImage} onChange={(e) => {
                        setEditMyCard({ ...editmycard, businessImage: e.target.value })
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
                    <button onClick={() => {
                        editCard()
                    }}>Update Card <FontAwesomeIcon icon={faSave} /> </button>
                </div>
            </div>

            {spinner && <Loader />}
        </>)
    } else {
        //if the user  is a guest or he isnt a business account - show him no credentials
        return (<>

            {spinner && <Loader />}
            <h2>NO CREDENTIALS</h2>
        </>)
    }
}