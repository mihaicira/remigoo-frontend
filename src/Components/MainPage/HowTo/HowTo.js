import HowToSvg from "../../../assets/how-to.svg"
import './HowTo.css'

export default function HowTo(props){
    return(<>
        <div id="howToContainer">
            <button onClick={()=>{props.toggleTutorial(true)}}><img src={HowToSvg}/></button>
        </div>
        </>)
}