import "./SelectDay.css";
import Button from "../../Button/Button";
import {useEffect, useState} from 'react';
import HeaderText from "../../HeaderText/HeaderText";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import {beautifyMinutes, isDateInPast} from "../../../utils/utils";
import {useNavigate} from "react-router-dom";

const Results = ({value})=>{
    const [data, setData] = useState({});

    const navigate = useNavigate();

    const loadData = async () =>{
        const response = await fetch(`http://localhost:3000/get-movies-by-date?date=${value}`)
        response.json()
            .then(res=>{
                setData(res)
            })
    }

    const RedirectToBooking = (id) =>{
        navigate(`/book/${id}&date=${value}`)
    }


    useEffect(()=>{
        setData({})
        loadData();
        return ()=>{};
    },[value])


    // if(isDateInPast(value))
    //     return <p>date is in past</p>

    if(data.content)
        if(!data.error){

            return <>
                {data.content.map(movie=>{
                    let times;
                    try{
                        times = movie.time.split(', ')
                    }
                    catch{
                        times = [movie.time]
                    }
                    return <div className="selectDay-movie" key={"movie-by-date-"+movie.title}>
                        <img src={movie.img} alt={`img-of-${movie.title}`}/>

                        <div className="selectDay-movie-info">
                            <p>{movie.title} ({movie.year})</p>
                            <Button text="Book now" event={()=>{RedirectToBooking(movie.id)}}/>
                            <p>{movie.genre}<br/>{beautifyMinutes(movie.duration)}</p>
                        </div>

                        <div className="selectDay-movie-hours">
                            <ul>
                                {
                                    times.map(time=><li key={`movie-${movie.title}-time-${time}`}>{time.split('-')[0]}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                    }
                )}

            </>
        }
        else
            return <p>There are no movies scheduled for the selected date.</p>
    else
        return <LoadingAnimation/>


}


function SelectDay() {
    const [selectedDay,changeSelectedDay] = useState('')
    return (
        <div className="selectDay section">
            <HeaderText text="Select a day"/>
            <input type="date" onChange={(ev)=>{changeSelectedDay(ev.target.value)}}/>
            {
                selectedDay !== '' &&
                <div className="selectDay-results">
                    <h2>Scheduled movies for {selectedDay.split('-')[2]}/{selectedDay.split('-')[1]}</h2>
                    <div className="selectDay-list-of-results">
                        <Results value={selectedDay}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default SelectDay;
