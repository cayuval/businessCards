import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faBriefcase, faEdit, faFolder, faFolderPlus, faHome, faInfo, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import SpinnerContext from "../contexts/spinnerContext";
import Loader from "./Loader";
import UserContext from "../contexts/userContext";
import { Divide as Hamburger } from "hamburger-react"
import { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../data/data";
import ShowMobileNavContext from "../contexts/showMobileNavContext";






export default function NavBar() {
    //useFull function to navigate through the website 
    const navigateTo = useNavigate();
    //spinner context, activated with every call to server
    const [spinner, setSpinner] = useContext(SpinnerContext)
    //user context, in order to know  who is the User and what is his credentials
    const [user, setUser] = useContext(UserContext)
    ///when we open the page on mobile - close the navbar
    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)

    function logOut() {
        //although the log out doesnt call the server, we want to make the user feel like he logged out
        setSpinner(true)
        //remove token from the local storge so the user re log in when he refreshing the page
        localStorage.removeItem("userToken")
        //set the user context to a guest mode (logged out)
        setUser({ ...user, userName: 'guest', isBusinessAccount: false })
        //call looks like its over
        setSpinner(false)
        //naviget to login page
        navigateTo('../login')
    }

    //once the component is being rendered the first time - check who is the user is, if he doesnt have a token and he is logged out, guest mode wont be changed  
    useEffect(() => {
        //before a fetch call, show the loader

        setSpinner(true)

        getUser().then(res => {
            if (res.ok) {
                return res.json()
            } else {
                //call is over - close the loader and guest mode isnt changing
                setSpinner(false)
            }
        }).then(loggedInUser => {
            //if a user isnt a suest,change the user context and rerender the navbar by the right credentials
            setUser({ ...user, userName: loggedInUser.name, isBusinessAccount: loggedInUser.isBusinessAccount })
            reRender()
            //call is over - close the loader

            setSpinner(false)
        })
    }, [])
    function reRender() {
        // if the user is a guest, show him this navbar credentials
        if (user.userName.toLowerCase() == 'guest') {
            return (<>
                {spinner && <Loader />}
                <div id="hamburgerFixed">
                    <Hamburger rounded color={showMobileNav ? 'black' : 'white'} toggled={showMobileNav} toggle={setShowMobileNav} />
                </div>
                <nav className={showMobileNav ? "mobileNav scale-in-hor-left" : "mobileNav scale-out-hor-left"}>
                    <ul>
                        <NavLink activeclassname="active" to="/"> <FontAwesomeIcon icon={faHome} />  Home</NavLink>
                        <NavLink activeclassname="active" to="/about"> <FontAwesomeIcon icon={faInfo} />  About</NavLink>
                        <NavLink activeclassname="active" to="/login"> <FontAwesomeIcon icon={faArrowRightToBracket} /> Login</NavLink>
                        <NavLink activeclassname="active" to="/signup/client"> <FontAwesomeIcon icon={faUserPlus} />   Sign Up - Client</NavLink>
                        <NavLink activeclassname="active" to="/signup/business"> <FontAwesomeIcon icon={faUserPlus} />   Sign Up - Business</NavLink>
                    </ul>
                </nav>
                <Outlet />

            </>)
            // if the user isnt a guest and isnt a business accont, show him this navbar credentials
        } else if (!user.isBusinessAccount) {
            return (<>
                {spinner && <Loader />}
                <div id="hamburgerFixed">

                    <Hamburger color={showMobileNav ? 'black' : 'white'} toggled={showMobileNav} toggle={setShowMobileNav} />
                </div>
                <nav className={showMobileNav ? "mobileNav scale-in-hor-left" : "mobileNav scale-out-hor-left"}>
                    <ul>
                        <NavLink activeclassname="active" to="/"> <FontAwesomeIcon icon={faHome} />  Home</NavLink>
                        <NavLink activeclassname="active" to="/about"> <FontAwesomeIcon icon={faInfo} />  About</NavLink>
                        <NavLink activeclassname="active" to="/cards"><FontAwesomeIcon icon={faBriefcase} />   cards</NavLink>
                        <li onClick={() => {
                            logOut()
                            setShowMobileNav(false)
                        }}><FontAwesomeIcon icon={faRightFromBracket} />   Log Out</li>
                    </ul>
                </nav>
                <Outlet />
            </>)
        } else {
            // if the user isnt a guest and is a business accont, show him this navbar credentials
            return (<>
                {spinner && <Loader />}
                <div id="hamburgerFixed">
                    <Hamburger toggled={showMobileNav} toggle={setShowMobileNav} color={showMobileNav ? 'black' : 'white'} />

                </div>
                <nav className={showMobileNav ? "mobileNav scale-in-hor-left" : "mobileNav scale-out-hor-left"}>
                    <ul>
                        <NavLink activeclassname="active" to="/"> <FontAwesomeIcon icon={faHome} />  Home</NavLink>
                        <NavLink activeclassname="active" to="/about"> <FontAwesomeIcon icon={faInfo} />  About</NavLink>
                        <NavLink activeclassname="active" to="/cards"><FontAwesomeIcon icon={faBriefcase} />   cards</NavLink>
                        <NavLink activeclassname="active" to="/addNewCard"><FontAwesomeIcon icon={faFolderPlus} />  New card</NavLink>
                        <NavLink activeclassname="active" to="/myCards"><FontAwesomeIcon icon={faFolder} />  My Cards</NavLink>
                        <li onClick={() => {
                            logOut()
                            setShowMobileNav(false)
                        }}><FontAwesomeIcon icon={faRightFromBracket} />   Log Out</li>

                    </ul>
                </nav>
                <Outlet />

            </>)
        }

    }
    return (<>{reRender()}</>)


}