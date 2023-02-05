import PacmanLoader from "react-spinners/PacmanLoader"

export default function Loader() {
    //simple pacman loader component from a good react libary
    return (<>
        <div className="loader">

            <PacmanLoader

                color="#f8ff00"
                cssOverride={{}}
                size={50}
                speedMultiplier={2}
            />

        </div>
    </>)
}