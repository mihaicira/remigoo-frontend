import "../PanelPage.css";
import "./TicketPage.css";
import ticketsSvg from '../../../assets/panel-tickets.svg'
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../../Button/Button";
import {beautifyMinutes, monthNumberToString} from "../../../utils/utils";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";

var Timeout;
const SearchTicketResult = ({value})=>{
    const [data, setData] = useState({});

    const loadData = async () =>{
        const response = await fetch(`http://localhost:3000/get-ticket-by-id?id=${value}`)
        response.json()
            .then(res=>{
                setData(res)
            })
    }


    useEffect(()=>{
        setData({})
        loadData();
        return ()=>{};
    },[value])

    if(value=="")
        return <p></p>;

    if(data.error)
        return <p>No ticket found</p>

    if(data.content){
        return <div className="found-ticket">
            <p>Ticket #{data.content.id}</p>
            <p>Movie title: {data.content.movie_title}</p>
            <p>Date: {data.content.date.split('-')[0]} {monthNumberToString(data.content.date.split('-')[1])} {data.content.date.split('-')[2]}</p>

            <p>Time: 15:30</p>
            <p>Name:  {data.content.name}</p>
            <br/>
            <p>Hall:  {data.content.hall}</p>
            <br/>
            <p>Tickets:  {data.content.seats.length};</p>
            <p>Price: 23e;</p>
        </div>
    }
    else
        return <LoadingAnimation/>
}

const SearchTicket = () =>{
    const [ticketId,setTicketId] = useState("")

    const searchValueHandler = (value) =>{
        clearTimeout(Timeout)
        Timeout = setTimeout(()=>{
            if(value.trim() !== ""){
                setTicketId(value)
            }
        },400)
    }

    return(<div className="panel-section search-ticket-section">
        <h2>Search a ticket</h2>

        <input type="text" id="searchTicketInput" onChange={e=>{searchValueHandler(e.target.value)}}/>

        <SearchTicketResult value={ticketId}/>
    </div>)
}


const ViewScheduleResults = ({value})=>{
    const [data, setData] = useState({});

    const loadData = async () =>{
        const response = await fetch(`http://localhost:3000/get-movies-by-date?date=${value}`)
        response.json()
            .then(res=>{
                setData(res)
            })
    }

    useEffect(()=>{
        setData({})
        loadData();
        return ()=>{};
    },[value])

    if(value === "")
        return <p>Select a date</p>

    if(data.content){
        const hours = ['08:00','10:30','13:00','18:00','20:30','23:00']
        let hall_1 = {}
        let hall_2 = {}
        hours.forEach((hour)=>{
            hall_1[hour] = {
                title:"No movie scheduled.",
                seats:"N/A"
            }
            hall_2[hour] = {
                title:"No movie scheduled.",
                seats:"N/A"
            }
        })

        if(!(typeof data.content === "string"))
            data.content.forEach(movie=>{
                movie.time.split(', ').forEach(time=>{
                    hours.forEach(hour=>{
                        if(time.split('-')[0] === hour){
                            if(time.split('-')[1]=='1')
                                hall_1[hour] = {
                                    title: movie.title,
                                    seats: time.split('-')[2]
                                }
                            else
                                hall_2[hour] = {
                                    title: movie.title,
                                    seats: time.split('-')[2]
                                }
                        }
                    })
                })

            })



        return <>
            <div className="hall-container">
                <h3>Hall 1</h3>
                <div className="hall-results">
                    {
                        Object.keys(hall_1).map(hour=><div className="hall-result" key={`hall-1-${hour}`}>
                            <p>{hour}</p>
                            <p>{hall_1[hour].title}</p>
                            <p>{hall_1[hour].seats}</p>
                        </div>)
                    }
                </div>
            </div>

            <div className="hall-container">
                <h3>Hall 2</h3>
                <div className="hall-results">
                    {
                        Object.keys(hall_2).map(hour=><div className="hall-result"  key={`hall-2-${hour}`}>
                            <p>{hour}</p>
                            <p>{hall_2[hour].title}</p>
                            <p>{hall_2[hour].seats}</p>
                        </div>)
                    }
                </div>
            </div>
            </>
    }
    else
        return <LoadingAnimation/>


}

const ViewSchedule = () =>{
    const [selectedDay,changeSelectedDay] = useState('')

    return(<div className="panel-section view-tickets-section">
        <h2>View schedule</h2>
        <input type="date"  onChange={(ev)=>{changeSelectedDay(ev.target.value)}}/>
        <div className="results">
            <ViewScheduleResults value={selectedDay} />

        </div>
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
