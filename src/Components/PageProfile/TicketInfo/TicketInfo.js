import "./TicketInfo.css";
import {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {beautifyMinutes, monthNumberToString} from "../../../utils/utils";

function TicketInfo(props) {

    let date = new Date()

    const [upcoming,setUpcoming] = useState(true)

    return (
        <div className="account-section">
            <h2>Upcoming tickets</h2>
            {
                upcoming &&
                <p className="account-section-nothing-here">There are no following tickets. Book your tickets <Link to="/">here</Link>.</p>
            }

            <ul>
                {
                    (props.tickets && props.tickets !== "none") &&
                    Object.values(props.tickets).map(ticket=>{
                        const ticketDate = new Date(ticket.date.split('-')[0],ticket.date.split('-')[1]-1,ticket.date.split('-')[2])
                        if(date < ticketDate){
                            if(upcoming)
                                setUpcoming(false)
                            return <li key={`upcoming-t-${ticket.title}`}><a>{ticket.title} ({ticket.year})</a> ({ticket.genre}, {beautifyMinutes(ticket.duration)}) | {ticket.date.split('-')[2]} {monthNumberToString(ticket.date.split('-')[1])}, {ticket.time};</li>
                        }

                    })
                }
            </ul>


            <h2>All your tickets</h2>
            {
                (!props.tickets || props.tickets === "none") &&
                <p className="account-section-nothing-here">It looks like you didn’t buy any tickets using this account. Start your journey <Link to="/">here</Link>!</p>
            }
            <ul>
                {
                    props.tickets &&
                    Object.values(props.tickets).map(ticket=>{
                        if(props.tickets !== "none")
                        return <li key={`all-t-${ticket.title}`}><a>{ticket.title} ({ticket.year})</a> ({ticket.genre}, {beautifyMinutes(ticket.duration)}) | {ticket.date.split('-')[2]} {monthNumberToString(ticket.date.split('-')[1])}, {ticket.time};</li>
                    })
                }
            </ul>



        </div>

    );
}

export default TicketInfo;
