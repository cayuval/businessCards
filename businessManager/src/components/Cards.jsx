import { useEffect, useState } from "react";
import Card from "./Card";
import Footer from "./Footer";
import axios from "axios"
import SearchCard from "./SearchCard";
import Loader from "./Loader";
import { useContext } from "react";
import SpinnerContext from "../contexts/spinnerContext";
import UserContext from "../contexts/userContext";
import { getCards } from "../data/data";
import ShowMobileNavContext from "../contexts/showMobileNavContext";

export default function Cards() {
    //the business cards data, will be changed after the fetch request, for now just a business image of an default image
    const [cards, setCards] = useState([{ businessImage: `../public/noImage.png` }, { businessImage: `../public/noImage.png` }, { businessImage: `../public/noImage.png` }, { businessImage: `../public/noImage.png` }])
    //spinner context, activated with every call to server
    const [spinner, setSpinner] = useContext(SpinnerContext)
    //user context, in order to know  who is the User and what is his credentials, guests and normal clients cant see this page
    const [user, setUser] = useContext(UserContext)
    ///when we open the page on mobile - close the navbar
    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)

    //function to seach for cards with fetch calls from the rest api server
    function onChangeSearch(text) {
        getCards().then(res => {
            if (res.ok) {
                return res.json()
            } else {
                alert('server error')
            }
        }).then(cardsJson => {
            const filteredArr = cardsJson.filter(card => {
                //searching the cards and trimming any unnecessary spaces
                return card.businessName.toLowerCase().trim().indexOf(text.toLowerCase().trim()) > -1
            })
            //changing the cards state to the sarch input
            setCards([...filteredArr])
        }
        ).catch(err => { alert(err.nessage) })
    }

    useEffect(() => {
        //once the component is being rendered the first time - call the rerender function wich sets the cards from the rest api server
        reRender()
        ///when we open the page on mobile - close the navbar

        setShowMobileNav(false)
    }, []);

    let cardsArr
    if (cards.length === 0) {
        //if the cards array  state is empty after the fetch call, show no cards
        cardsArr = 'NO CARDS'
    } else {
        //use the card component by the cards state
        cardsArr = cards.map((card, i) => {
            return <Card data={card} key={i} />
        })

    }

    function reRender() {
        //before a fetch call, show the loader
        setSpinner(true)

        getCards().then(res => {
            if (res.ok) {
                //return the response as an array
                return res.json()
            } else {
                //call is over - close the loader
                setSpinner(false)
                //notify the user in case of a server error
                alert('serever error - 404 bad call')
            }
        }).then(serverCards => {
            //set the cards state to the data we got from the rest server
            setCards([...serverCards])
            //call is over - close the loader
            setSpinner(false)
        }).catch(error => {
            //call is over - close the loader
            setSpinner(false)
            alert(error.message)
        })


    }
    //we will show the cards component only for logged in users 
    if (user.userName.toLowerCase() !== 'guest') {

        return (<>
            {spinner &&
                <Loader />
            }
            <h1>Business Cards</h1>
            <SearchCard onChangeSearch={onChangeSearch} />
            <div id="businessCards">
                <div className="businessCards">
                    {cardsArr}

                </div>


            </div>

        </>)
    } else {
        // if the user isnt logged in, show this
        return (<>
            {spinner &&
                <Loader />
            }
            <h2>NO CREDENTIALS</h2>
        </>)

    }

}