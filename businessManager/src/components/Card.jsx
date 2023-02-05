import { faEdit, faHome, faPhone, faServer, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp";


export default function Card(props) {
    console.log(props);
    //card is a useble componnt also on showing cards and changing them, we want the user to have the ability to change only his cards
    const [edit, setEdit] = useState(false)
    //when clicking on a card, a popUp component will be shown, this will be the trigger to open the component
    const [popUpTrigger, setPopUpTrigger] = useState(false)
    //useFull function to navigate through the website 
    const navigateTo = useNavigate()
    //when the component start, it check if the url is mycards, if so it change the edit state to true, otherwise it stays on a default false
    useEffect(() => {
        if (window.location.href.indexOf('myCards') > 1) {
            setEdit(true)
        }
    }, [])

    //function that will be given to the popUp, in order to close it

    function onClickClose() {
        setPopUpTrigger(false)
    }

    // at some cases, the card wont recive a data (like on searching) so we make sure we recive the proper data
    if (props.data) {
        return (<>
            {popUpTrigger && <PopUp closePopUp={onClickClose} business={props.data} />}
            <div title={props.data.businessDescription} onClick={() => {
                //clicking on the card will trigger the card popUp 
                setPopUpTrigger(true)
            }} className="businessCard">
                <img src={props.data.businessImage} alt={`${props.data.businessName} businessImg`} />

                <div className="businessCardField">
                    <h2>{props.data.businessName}</h2>
                </div>
                {edit &&

                    <div className="businessCardButtons">

                        <button title="Edit card" onClick={() => {
                            //clicking on edit button will navigate to the card editing page
                            navigateTo(`../editmycard/${props.data._id}`)
                        }} className="edit"><FontAwesomeIcon icon={faEdit} /></button>
                        <button title="Delete card" onClick={() => {
                            //clicking on edit button will call a deleting funcation that was given by the father
                            props.deleteCard(props.data)
                        }} className="delete"><FontAwesomeIcon icon={faX} /></button>
                    </div>
                }
            </div>
        </>
        )

    } else {
        //if we dont recive the proper data, send NO CARD
        return (<><p>NO CARD</p></>)
    }

}