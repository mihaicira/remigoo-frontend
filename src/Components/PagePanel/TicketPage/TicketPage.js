import "../PanelPage.css";
import "./TicketPage.css";
import ticketsSvg from '../../../assets/panel-tickets.svg'
import {useState} from 'react';

const ViewSchedule = () =>{
    return(<div className="panel-section view-tickets-section">
        <h2>View tickets</h2>
        <input type="date"/>
        <div className="results">
            <div className="hall-container">
                <h3>Hall 1</h3>
                <div className="hall-results">
                    <div className="hall-result">
                        <p>08:00</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>10:30</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>13:00</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>18:00</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>20:30</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>23:00</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>
                </div>

            </div>

            <div className="hall-container">
                <h3>Hall 2</h3>
                <div className="hall-results">
                    <div className="hall-result">
                        <p>08:00</p>
                        <p>Dumb ways to die Dumb ways to die (2020)</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>10:30</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>13:00</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>18:00</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>20:30</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>

                    <div className="hall-result">
                        <p>23:00</p>
                        <p>Dumb ways to die</p>
                        <p>x/84</p>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

const SearchTicket = () =>{
    const [foundTicket,changeFoundTicket] = useState("")

    const ticketSearchHandler = () =>{
        let id = document.getElementById("searchTicketInput").value
        changeFoundTicket(id)

    }

    return(<div className="panel-section search-ticket-section">
        <h2>Search a ticket</h2>

        <input type="text" id="searchTicketInput"/> <span onClick={ticketSearchHandler}>search</span>
        {
            foundTicket !== "" &&
            <div className="found-ticket">
                <p>Ticket #{foundTicket}</p>
                <p>Movie title: The Diary of a Wimpy kid</p>
                <p>Date: 11 november 2021</p>
                <p>Time: 15:30</p>
                <br/>
                <p>Hall: 2</p>
                <br/>
                <p>Tickets: (3)</p>
                <ul>
                    <li><p>1 child(ren); 1 * 3€ ......... 3€</p></li>
                    <li><p>1 student; 1 * 4€ ......... 4€</p></li>
                    <li><p>1 standard; 1 * 8€ ......... 8€</p></li>
                </ul>
                <p className="today">today</p>
            </div>
        }
    </div>)
}

function TicketPage(props) {
    return (
        <>
            <button id="panel-back-btn" onClick={props.goBack}></button>
            <img src={ticketsSvg} className="panel-head-image" alt="tickets suggesting"/>


            <div className="panel-container">
                <SearchTicket/>
                <ViewSchedule/>
        </div>

        </>
    );
}

export default TicketPage;
