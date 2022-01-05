import "./DateTime.css";
import BackArrow from '../../../assets/back-arrow.svg'
import ContinueArrow from '../../../assets/continue-arrow.svg'
import {useEffect,useState} from 'react';
import {beautifyMinutes, compareHours, monthNumberToString} from "../../../utils/utils";

function DateTime(props) {

    const changeDayHandler = (value) =>{
        props.changeSelectedDay(value)
        props.changeSelectedHour("")
        props.setScheduleId("")
    }

    const [mySchedule,setMySchedule] = useState({})

    useEffect(()=>{
        let tempSchedule = {}
        if(props.DBMovie){
            props.DBMovie.schedule.forEach(schedule=>{
                if(tempSchedule[schedule.date])
                    tempSchedule[schedule.date].push({time:schedule.time,scheduleId:schedule.id})
                else
                    tempSchedule[schedule.date] = [{time:schedule.time,scheduleId:schedule.id}]
            })

            setMySchedule(tempSchedule)
        }

    },[props.DBMovie])

    return (
        <div className="book-page-container">

            {
                props.DBMovie && <h2>{props.DBMovie.movie.title}</h2>
            }

            {
                props.DBMovie &&
                <iframe  src={`https://www.youtube.com/embed/${props.DBMovie.movie.trailer}`}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            }


            {
                props.DBMovie &&  <p className="genre-time">{props.DBMovie.movie.genre}<br/>{beautifyMinutes(props.DBMovie.movie.duration)}</p>
            }

            <div className="pickers-container">
                <div className="date-picker">
                    <h3>Select a day</h3>
                    <div className="date-results">
                        {
                            props.DBMovie &&
                                <>
                                    {
                                        Object.keys(mySchedule).map(day=><p key={`date-${day}`} className={day === props.selectedDay ? "picker-result active-picked-result" : "picker-result"} onClick={()=>{changeDayHandler(day)}}>{`${day.split('-')[2]} ${monthNumberToString(day.split('-')[1])} ${day.split('-')[0]}`}</p>)
                                    }
                                </>
                        }
                    </div>
                </div>
                <div className={props.selectedDay !== "" ? "hour-picker" : "hour-picker invisible-book-btn"}>
                    <h3>Select an hour</h3>
                    <div className="hour-results">
                        {
                            props.selectedDay &&
                                mySchedule[props.selectedDay].map(schedule=><p key={`hour-${schedule.time}-${schedule.scheduleId}`} className={schedule.time === props.selectedHour ? "picker-result active-picked-result" : "picker-result"} onClick={()=>{props.changeSelectedHour(schedule.time);props.setScheduleId(schedule.scheduleId)}}>{schedule.time}</p>)
                        }
                    </div>
                </div>
            </div>

            <div className="buttons-container">
                <img src={BackArrow} alt="back-arrow" className="invisible-book-btn"/>
                <img src={ContinueArrow} alt="continue-arrow" className={(props.selectedHour!=="" && props.selectedDay!=="") ? "" : "disabled-book-btn"} onClick={props.forward}/>
            </div>
        </div>
    );
}

export default DateTime;
