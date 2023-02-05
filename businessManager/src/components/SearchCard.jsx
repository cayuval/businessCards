import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSearchDollar, faSearchLocation, faSearchMinus, faSearchPlus } from "@fortawesome/free-solid-svg-icons"

export default function SearchCard(props) {
    //text for the input
    const [text, setText] = useState("")

    return (<><div style={{ backGroundColor: 'beige' }} id="searchCard">

        <FontAwesomeIcon style={{
            borderRadius: '50%',
            border: '1px solid black',
            backgroundColor: 'white'
        }} border='1px solid blue' color="blue" icon={faSearch}></FontAwesomeIcon>
        <label>Search Business Card: </label>
        <input placeholder="Search Card..." name="search" value={text} onChange={(e) => {
            //changing the state by the input
            setText(e.target.value)
            //on any change, a function being activated
            props.onChangeSearch(e.target.value)
        }} type="search" />
    </div>
    </>)
}