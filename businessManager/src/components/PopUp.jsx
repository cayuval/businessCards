import { faHome, faPerson, faPhone, faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getCreatorDetails } from "../data/data";

export default function PopUp(props) {
    //the data we recive dont supply the crator's name, only his id so for now - the default is Card Creator
    const [cardCreator, setCardCreator] = useState('Card Creator')
    //when the component is being rendered the first time - use a fetch call to the rest api server to get the creator's name
    useState(() => {
        getCreatorDetails(props.business.userId).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                alert('cardCreator not fond')
            }
        }).then(creator => {
            //once we got the creator name change the state to his name
            setCardCreator(creator.name)
        }).catch(err => { alert(err.nessage) })
    }, [])

    //a pop up that will be shown once the pop up trigger in the father component (card)
    //basically, the copmonent is for the card, data.
    return (<>
        <div className="popUp">
            <p className="closePopUP" onClick={() => {
                //a function given by the father compnent (card) that will close the component
                props.closePopUp()
            }}>X</p>

            <img src={props.business.businessImage} alt="businessImg" />

            <div className="popUpField">
                <h2>{props.business.businessName}</h2>
            </div>
            <div className="popUpField">

                <FontAwesomeIcon icon={faPerson} />
                <p>{cardCreator}</p>
            </div>
            <div className="popUpField">

                <FontAwesomeIcon icon={faServer} />
                <p>{props.business.businessDescription}</p>
            </div>
            <div className="popUpField">

                <FontAwesomeIcon icon={faHome} />
                <p>{props.business.businessAddress}</p>
            </div>
            <div className="popUpField">

                <FontAwesomeIcon icon={faPhone} />
                <p>{props.business.businessPhone}</p>
            </div>
        </div>
    </>)
}