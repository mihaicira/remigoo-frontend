import Video from "../../../assets/remigoo-vid.mp4"

export default function Tutorial(props){
    return(<>
        <div id="tutorial-container">
            <button id="tutorial-close-btn" onClick={()=>{props.toggleTutorial(false)}}>x</button>

            <iframe src={Video}></iframe>
        </div>
        </>)
}