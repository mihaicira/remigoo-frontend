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

    const [finalizedTicketId,setFinalizedTicketId] = useState(null)

    const [DBMovie,setDBMovie] = useState(null)
    const location = useParams()

    const loadData = async () =>{
        let movie_id = location.movieId.split("&")[0]
        const response = await fetch(`http://localhost:3000/get-movies-by-id?id=${movie_id}`)
        response.json()
            .then(res=>{
                setDBMovie(res.content)
            })
    }


    const finalizeBooking = async () =>{
        let name;
        ticketList.forEach(ticket=>{
            if(ticket.name!==''){
                name = ticket.name;
                return;
            }
        })

        let userId = -1
        let LS = JSON.parse(localStorage.getItem('loginStatus'))
        if(LS.isLoggedIn)
            userId = LS.userData.userId

        console.log(selectedSeats)

        const str_prices = schedule.prices

        const prices = {
            "standard": str_prices.split('/')[0],
            "child": str_prices.split('/')[1],
            "student": str_prices.split('/')[2],
            "pensionary": str_prices.split('/')[3]
        }
        let sum = 0
        ticketList.forEach(ticket=>{
            sum = sum + parseInt(prices[ticket.type])
        })



        let query = `http://localhost:3000/add-ticket?name=${name}&user=${userId}&id=${scheduleId}&price=${sum}`
        selectedSeats.forEach(seat=>{
            let numbers = seat.split('-').map(x=>parseInt(x))
            console.log("seat: ",seat)
            let seatNo = ((numbers[0]-1)*12+numbers[1])-1
            query = query + `&seats=${seatNo}`
        })

        const response = await fetch(query)
        response.json()
            .then(res=>{
                if(!res.error){
                    setFinalizedTicketId(res.content)
                    changePage(4)
                }
                else{
                    console.log(res.content)
                }
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
                        scheduleId={scheduleId}
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
                        DBMovie={DBMovie}
                        finalizeBooking={finalizeBooking}/>
            }

            {
                page === 4 &&
                    <Ticket
                        tickets={ticketList}
                        ticketId={finalizedTicketId}
                        DBMovie={DBMovie}
                        schedule={schedule}/>
            }

        </>
    );
}

export default BookTicketPage;
