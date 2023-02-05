import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import ShowMobileNavContext from "../contexts/showMobileNavContext";
import SpinnerContext from "../contexts/spinnerContext";
import UserContext from "../contexts/userContext";
import { deleteMyCard, getMyCards } from "../data/data";
import Card from "./Card";
import Loader from "./Loader";
import SearchCard from "./SearchCard";



export function MyCards() {
    //the business cards data, will be changed after the fetch request, for now just a business image of an default image
    const [myCards, setMyCards] = useState([{ businessImage: `../public/noImage.png` }, { businessImage: `../public/noImage.png` }, { businessImage: `../public/noImage.png` }, { businessImage: `../public/noImage.png` }])

    //spinner context, activated with every call to server
    const [spinner, setSpinner] = useContext(SpinnerContext)
    //user context, in order to know  who is the User and what is his credentials, guests and normal clients cant see this page
    const [user, setUser] = useContext(UserContext)
    ///when we open the page on mobile - close the navbar
    const [showMobileNav, setShowMobileNav] = useContext(ShowMobileNavContext)


    useEffect(() => {
        //once the component is being rendered the first time - call the rerender function wich sets the cards from the rest api server
        reRender()
        ///when we open the page on mobile - close the navbar
        setShowMobileNav(false)
    }, [])



    function deleteCard(card) {
        //get a confirmation from the user to delete the card
        if (confirm(`Are You sure you would like to delete ${card.businessName}'s card?`)) {

            //before a fetch call, show the loader
            setSpinner(true)

            deleteMyCard(card._id).then(res => {
                if (res.ok) {
                    //card has been deleted, show the user by rerendering the page
                    reRender()
                    //call is over - close the loader
                    setSpinner(false)
                    return res.json()
                } else {
                    //call is over - close the loader
                    setSpinner(false)
                    //respone isnt ok - alert the user the card wasnt deleted
                    alert('not deleted')
                }
            }).catch(error => {
                alert(error)
                //call is over - close the loader
                setSpinner(false)
            })

        }
    }

    function reRender() {

        //before a fetch call, show the loader
        setSpinner(true)


        getMyCards().then(res => res.json()).then(serverCards => {
            if (Array.isArray(serverCards)) {
                //call is over - close the loader
                setSpinner(false)
                //response is good, change the card state
                setMyCards(serverCards)
            } else if (typeof serverCards == "object") {
                //call is over - close the loader
                setSpinner(false)
            }
        }).catch(error => {
            //call is over - close the loader
            setSpinner(false)
            alert(error.message)
        })


    }

    function onChangeSearch(text) {
        //function recives a search text and search the text directly from the db 
        getMyCards().then(res => {
            if (res.ok) {
                return res.json()
            } else {
                alert('server error')
            }
        }).then(cardsJson => {

            const filteredArr = cardsJson.filter(card => { return card.businessName.toLowerCase().trim().indexOf(text.toLowerCase().trim()) > -1 })
            setMyCards([...filteredArr])
        }
        ).catch(err => { alert(err.nessage) })

    }


    // vatiable that will contain the cards elemrnt
    let cardsArr

    // if there isnt any cards yet, show it to the user
    if (myCards.length === 0) {
        cardsArr = "no cards yet"
    } else {
        cardsArr = myCards.map((card, i) => {
            return <Card deleteCard={deleteCard} data={card} key={i} />
        })
    }


    //we will show the my cards component only for logged in business users
    if (user.userName.toLowerCase() !== 'guest' && user.isBusinessAccount) {
        return (<>
            <div id="myBusinessCards">

                <h1>My Business Cards</h1>

                <SearchCard onChangeSearch={onChangeSearch} />
                <div className="businessCards">
                    {cardsArr}
                </div>
            </div>
            {spinner &&
                <Loader />
            }
        </>)
    } else {
        // if the user isnt logged in or isnt a business account, show this

        return (<>
            {spinner &&
                <Loader />
            }
            <h2>NO CREDENTIALS</h2>
        </>)
    }

}