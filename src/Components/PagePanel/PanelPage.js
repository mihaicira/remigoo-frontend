import "./PanelPage.css";
import moviesSvg from '../../assets/panel-movies.svg'
import ticketsSvg from '../../assets/panel-tickets.svg'
import {useState,useEffect} from 'react';
import MoviePage from "./MoviePage/MoviePage";
import TicketPage from "./TicketPage/TicketPage";
import {useAccountData} from "../AccountContext/AccountProvider";
import {useNavigate} from "react-router-dom";


const MainChoice = (props)=>{
    return(<div className="panel-main-choice">
        <div onClick={()=>{props.changePage("movies")}}>
            <img src={moviesSvg} alt="movies suggesting"/>
            <h2>Movies</h2>
        </div>

        <div onClick={()=>{props.changePage("tickets")}}>
            <img src={ticketsSvg} alt="tickets suggesting"/>
            <h2>Tickets</h2>
        </div>
    </div>)
}

function PanelPage() {
    const [currentPage,setCurrentPage] = useState("panel")

    const AccountData = useAccountData()
    const navigate = useNavigate();

    useEffect(()=>{
        if(AccountData.userData && !AccountData.userData.panelAccess)
            navigate('/');
    },[AccountData])

    return (
        <div id="panel-page">
            {
                currentPage === "panel" &&
                <MainChoice changePage={setCurrentPage}/>
            }

            {
                currentPage === "movies" &&
                <MoviePage goBack={()=>{setCurrentPage("panel")}}/>
            }

            {
                currentPage === "tickets" &&
                <TicketPage goBack={()=>{setCurrentPage("panel")}}/>
            }
        </div>

    );
}

export default PanelPage;
