import "./BookTicketPage.css";
import {useState,useEffect} from 'react';
import DateTime from "./DateTime/DateTime";
import SelectTickets from "./SelectTickets/SelectTickets";
import ChooseSeats from "./ChooseSeats/ChooseSeats";
import Ticket from "./Ticket/Ticket";
import {Link, useParams, useNavigate} from "react-router-dom";

function BookTicketPage() {

    const [page,changePage] = useState(1)

    const [scheduleId,setScheduleId] = useState("")
    const [schedule,setSchedule] = useState(null)

    const [day,setDay] = useState("")
    const [hour,setHour] = useState("")
    const [ticketList,changeTicketList] = useState([])
    const [selectedSeats,changeSelectedSeats] = useState([])

    const [DBMovie,setDBMovie] = useState(null)
    const location = useParams()

    const loadData = async () =>{
        let movie_id = location.movieId.split("&")[0]
        const response = await fetch(`http://localhost:3000/get-movies-by-id?id=${movie_id}`)
        response.json()
            .then(res=>{
                setDBMovie(res.content)
                console.log(res.content)
            })
    }

    useEffect(()=>{
        loadData()

        let urlDate;
        try{
            urlDate =  window.location.search.split('=')[1]
            if(urlDate)
                setDay(urlDate);
        }
        catch{
           //pass
        }

    },[])



    return (
        <>
            {/*<h1> dw{movie.title}</h1>*/}
            {
                page === 1 &&
                <DateTime forward={()=>{changePage(2)}}
                          selectedDay={day}
                          changeSelectedDay={setDay}
                          selectedHour={hour}
                          changeSelectedHour={setHour}
                          schedule={scheduleId}
                          setScheduleId={setScheduleId}
                          DBMovie={DBMovie}/>
            }

            {
                page === 2 &&
                <SelectTickets
                    backwards={()=>{changePage(1)}}
                    forward={()=>{changePage(3)}}
                    ticketList={ticketList}
                    changeTicketList={changeTicketList}
                    DBMovie={DBMovie}/>
            }

            {
                page === 3 &&
                <ChooseSeats
                    backwards={()=>{changePage(2)}}
                    forward={()=>{changePage(4)}}
                    numberOfTickets={ticketList.length}
                    selectedSeats={selectedSeats}
                    changeSelectedSeats={changeSelectedSeats}
                    scheduleId={scheduleId}
                    schedule={schedule}
                    setSchedule={setSchedule}
                    DBMovie={DBMovie}/>
            }

            {
                page === 4 &&
                    <Ticket
                        tickets={ticketList}
                        DBMovie={DBMovie}/>
            }

        </>
    );
}

export default BookTicketPage;
