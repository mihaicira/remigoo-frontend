import "../PanelPage.css";
import "./MoviePage.css";
import moviesSvg from '../../../assets/panel-movies.svg'
import Button from "../../Button/Button";
import ExampleImage from "../../../assets/example-movie-image.jpg";
import backImg from "../../../assets/back-btn.svg";
import {useEffect, useState} from 'react';
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import axios from "axios";
import {beautifyMinutes, monthNumberToString} from "../../../utils/utils";
import HeaderText from "../../HeaderText/HeaderText";


var Timeout;

//SCHEDULED MOVIES
const ScheduledMovies = () =>{
    return(<div className="panel-section movie-section">
            <h2>Scheduled movies</h2>
            <input type="date"/>
            <div className="results">
                <div className="hall-container">
                    <h3>Hall 1</h3>
                    <div className="hall-results">
                        <div className="hall-result">
                            <p>08:00</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>10:30</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>13:00</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>18:00</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>20:30</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>23:00</p>
                            <p>Dumb ways to die</p>
                        </div>
                    </div>
                </div>

                <div className="hall-container">
                    <h3>Hall 2</h3>
                    <div className="hall-results">
                        <div className="hall-result">
                            <p>08:00</p>
                            <p>Dumb ways to die Dumb ways to die (2020)</p>
                        </div>

                        <div className="hall-result">
                            <p>10:30</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>13:00</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>18:00</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>20:30</p>
                            <p>Dumb ways to die</p>
                        </div>

                        <div className="hall-result">
                            <p>23:00</p>
                            <p>Dumb ways to die</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


//SCHEDULE A MOVIE
const ScheduleMovieTitleMatches = ({value,titleChange})=>{
    const [data, setData] = useState({});
    const loadData = async () =>{
        const res = await fetch(`https://api.agify.io/?name=${value}`)
        setData(await res.json());
    }

    useEffect(()=>{
        setData({})
        loadData();
        return ()=>{};
    },[value])

    const titleChangeHandler = (name,id)=>{
        titleChange(name,id)
        // resetHour()
        // document.getElementById("schedule-movie-search-date-input").value="";
    }

    if(value === "")
        return ""

    if(data.name)
        return <div className="schedule-movies-matches">
            <div onClick={()=>{titleChangeHandler("My little doggie doo (2055)",122)}}>
                <img src={ExampleImage} alt="example-img"/>
                <span>My little doggie doo (2055)</span>
            </div>
            <div onClick={()=>{titleChangeHandler("Dumb ways to die (2023)",133)}}>
                <img src={ExampleImage} alt="example-img"/>
                <span>Dumb ways to die (2023)</span>
            </div>
            <div onClick={()=>{titleChangeHandler("Lorem ipsum dolor sit amet (1999)",144)}}>
                <img src={ExampleImage} alt="example-img"/>
                <span>Lorem ipsum dolor sit amet (1999)</span>
            </div>
        </div>
    else
        return <LoadingAnimation/>
}

const ScheduleMovieHourMatches = ({value,changeHour})=>{
    const [data, setData] = useState({});
    const [activeHour,setActiveHour] = useState("")


    const loadData = async () =>{
        const res = await fetch(`https://api.agify.io/?name=${value}`)
        setData(await res.json());
    }

    useEffect(()=>{
        setData({})
        setActiveHour("")
        loadData();
        return ()=>{};
    },[value])

    const changeHourHandler = (newHour) =>{
        changeHour(newHour)
        setActiveHour(`schedule-hour-${newHour}`)
    }

    if(value === "")
        return ""

    if(data.name)
        return <div className="schedule-hours-matches">
            <div onClick={(e)=>{changeHourHandler("1");}} className={activeHour==="schedule-hour-1" ? "selected-schedule-hours-match" : ""}>
                <span>1</span>
            </div>

            <div onClick={(e)=>{changeHourHandler("2");}} className={activeHour==="schedule-hour-2" ? "selected-schedule-hours-match" : ""}>
                <span>2</span>
            </div>

            <div onClick={(e)=>{changeHourHandler("3");}} className={activeHour==="schedule-hour-3" ? "selected-schedule-hours-match" : ""}>
                <span>3</span>
            </div>

            <div onClick={(e)=>{changeHourHandler("4");}} className={activeHour==="schedule-hour-4" ? "selected-schedule-hours-match" : ""}>
                <span>4</span>
            </div>
        </div>
    else
        return <LoadingAnimation/>
}

const ScheduleMovie = () =>{
    const [movieTitleSearch,setMovieTitleSearch] = useState("")
    const [movieTitle,setMovieTitle] = useState("")
    const [movieId,setMovieId] = useState("")

    const [selectedDay,changeSelectedDay] = useState('')
    const [selectedHour,changeSelectedHour] = useState('')

    const [childPrice,setChildPrice] = useState(0)
    const [studentPrice,setStudentPrice] = useState(0)
    const [pensionaryPrice,setPensionaryPrice] = useState(0)
    const [standardPrice,setStandardPrice] = useState(0)

    const [hall,setHall] = useState(0)

    const titleChangeHandler = (title,id) =>{
        document.getElementById("schedule-movie-search-input").value="";
        setMovieTitleSearch("")
        setMovieTitle(title);
        setMovieId(id)
    }

    const searchMovieTitleHandler = (value) =>{
        clearTimeout(Timeout)
        Timeout = setTimeout(()=>{
            setMovieTitleSearch(value)
        },400)
    }

    const searchSelectedDayHandler = (value)=>{
        if(movieTitle === ""){
            document.getElementById("schedule-movie-search-date-input").value=""
            document.getElementById("schedule-movie-search-input").style.transform="scale(1.2)";
            document.getElementById("schedule-movie-search-input").style.background="red";
            setTimeout(()=>{
                document.getElementById("schedule-movie-search-input").style.transform="scale(1)";
                document.getElementById("schedule-movie-search-input").style.background="#E1E8EB";
            },500)
            return;
        }
        changeSelectedDay(value)
        changeSelectedHour("")
    }

    const validateForm = (e)=>{

        if(movieTitle!=='' && selectedDay!=='' && selectedHour!=='' && hall !== 0){
            e.preventDefault()
        }
    }

    return(
    <div className="panel-section schedule-movie-section">
        <h2>Schedule a movie</h2>
        <form className="schedule-movie-form">
            <label>Search movie in system</label>
            <input type="text"
                   id="schedule-movie-search-input"
                   onChange={(e)=>{searchMovieTitleHandler(e.target.value)}}/>

            {
                movieTitleSearch !== "" &&
                <ScheduleMovieTitleMatches
                    value={movieTitleSearch}
                    titleChange={titleChangeHandler}
                    // resetHour={()=>{
                    //     changeSelectedHour("")
                    //     changeSelectedDay("")
                    // }}
                />
            }

            <label>Date and time</label>
            <input type="date"
                   id="schedule-movie-search-date-input"
                   onChange={(ev)=>{searchSelectedDayHandler(ev.target.value)}}
                    required/>

            {
                selectedDay !== "" &&
                    <ScheduleMovieHourMatches
                        value={selectedDay}
                        changeHour={changeSelectedHour}/>
            }

            <label>Movie: <span>{movieTitle === "" ? "not chosen yet" : movieTitle}</span></label>
            {/*<label>Hour: <span>{selectedHour === "" ? "not chosen yet" : selectedHour}</span></label>*/}


            <label>Price for children ticket (€)</label>
            <input type="number" min="0" placeholder="0" onChange={(e)=>{setChildPrice(e.target.value)}} required/>

            <label>Price for students ticket (€)</label>
            <input type="number" min="0" placeholder="0" onChange={(e)=>{setStudentPrice(e.target.value)}} required/>

            <label>Price for pensionary ticket (€)</label>
            <input type="number" min="0" placeholder="0" onChange={(e)=>{setPensionaryPrice(e.target.value)}} required/>

            <label>Price for standard ticket (€)</label>
            <input type="number" min="0" placeholder="0" onChange={(e)=>{setStandardPrice(e.target.value)}} required/>

            <label>Choose hall:</label>

            <div>
                <input type="radio" name="hall" value="hall-1" id="hall-1" onChange={e=>{return e.target.checked ? setHall(1) : null}} required/><label htmlFor="hall-1">Hall 1</label>
                <br/>
                <input type="radio" name="hall" value="hall-2" id="hall-2" onChange={e=>{return e.target.checked ? setHall(2) : null}} required/><label htmlFor="hall-2">Hall 2</label>
            </div>



            <Button text="Schedule movie" event={validateForm}/>
        </form>
    </div>)
}

//ADD MOVIE IN SYSTEM
const AddMovie = () =>{
    const [title,setTitle] = useState("")
    const [thumbnail,setThumbnail] = useState(null)
    const [year,setYear] = useState("")
    const [genre,setGenre] = useState("")
    const [duration,setDuration] = useState("")
    const [trailer,setTrailer] = useState("")


    const addMovie = (e) =>{
        if(title !== '' && thumbnail !== null && year !== '' && genre !== '' && duration !== '' && trailer !== '')
        {
            e.preventDefault()

            const fd = new FormData();
            fd.append('image',thumbnail,thumbnail.name)
            const request = `http://localhost:3000/add-movie?title=${title}&year=${year}&genre=${genre}&duration=${duration}&trailer_link=${trailer}`.replaceAll(' ','%20')
            axios.post(request, fd,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
                .then(res=>{
                    if(res.status === 200 && !res.data.error)
                        document.getElementsByClassName("add-movie-form")[0].reset()
                })
        }

    }

    return(<div className="panel-section add-movie-section">
            <h2>Add a movie in system</h2>
            <form className="add-movie-form">
                <label>Movie title</label>
                <input type="text" onChange={(e)=>{setTitle(e.target.value)}} required/>

                <label>Thumbnail image link</label>
                <input type="file" onChange={(e) =>{setThumbnail(e.target.files[0])}} required/>

                <label>Year of apparition</label>
                <input type="text" onChange={(e)=>{setYear(e.target.value)}} required/>

                <label>Genre(s)</label>
                <input type="text" onChange={(e)=>{setGenre(e.target.value)}} required/>

                <label>Duration (in minutes)</label>
                <input type="text" onChange={(e)=>{setDuration(e.target.value)}} required/>

                <label>Youtube encripted trailer link</label>
                <input type="text" onChange={(e)=>{setTrailer(e.target.value)}} required/>

                <Button text="Add movie" event={addMovie}/>

            </form>
        </div>

    )
}


//SEARCH MOVIE
const SearchMovieResults = ({value})=>{
    const [data, setData] = useState({});
    const loadData = async () =>{
        if(!value) return;
        value = value.replaceAll(" ","%20")
        const response = await fetch(`http://localhost:3000/get-movies?title=${value}`)
        response.json()
            .then(res=>{
                setData(res)
            })
    }


    useEffect(()=>{
        if(value === "")
            return;


        setData({})
        loadData();
        return ()=>{};
    },[value])

    const resetSuggestions = (id) =>{
        fetch(`http://localhost:3000/resetsuggests?id=${id}`)

    }



    if(value === "")
        return ""


    if(data.code==21)
        return <div className="search-movie-results">
            <div className="searched-movie">
                <h3>No results..</h3>
            </div>
        </div>


    if(data.content)
        return <>
            <div className="search-movie-results">
                {
                    data.content.map(movie => <div className="searched-movie">
                            <h3>{movie.title} ({movie.year}) [ID: {movie.id}]</h3>
                            <div className="search-movie-subsection">
                                <h5>Suggests: {movie.suggestions ? movie.suggestions : 0}</h5>
                                <Button text="Reset suggests" event={()=>{resetSuggestions(movie.id)}}/>
                            </div>
                            <div className="search-movie-subsection">
                                <Button text="Remove from system"/>
                            </div>
                        </div>
                    )}

            </div>
            </>

    else
        return <LoadingAnimation/>
}

const SearchMovie = () =>{
    const [movieValue,changeMovieValue] = useState("")

    const searchValueHandler = (value) =>{
        clearTimeout(Timeout)
        Timeout = setTimeout(()=>{
            if(value.trim() !== ""){
                changeMovieValue(value)
            }
        },400)
    }

    return(<div className="panel-section search-movie">
        <h2>Search movie</h2>
        <div className="search-movie-container">
            <label>Search by title</label>
            <input onChange={e=>searchValueHandler(e.target.value)}/>

            <SearchMovieResults value={movieValue}/>

        </div>
    </div>)

}



//TRENDING MOVIES
const TrendingResults= (props)=>{
    const [data, setData] = useState({});
    const [getForceRender, forceRender] = useState(0); // integer state

    const loadData = async () =>{
        const response = await fetch(`http://localhost:3000/getTrending`)
        response.json()
            .then(res=>{
                setData(res)
            })
    }

    const removeMovie = async (id) =>{
        const response = await fetch(`http://localhost:3000/setTrending?number=${id}&movie_ID=-1`);
        response.json()
            .then(()=>{
                forceRender(getForceRender+1)
            })
    }

    const setMovie = async (id) =>{
        let newId;
        if(id === 1)
            newId = props.firstId

        if(id === 2)
            newId = props.secondId

        if(id === 3)
            newId = props.thirdId


        const response = await fetch(`http://localhost:3000/setTrending?number=${id}&movie_ID=${newId}`)
        response.json()
            .then((res)=>{
                forceRender(getForceRender+1)
            })
    }

    useEffect(()=>{
        setData({})
        loadData();
        return ()=>{};
    },[getForceRender])



    if(data.content){
        return <>
                <div className="trending-movie">
                    <h2>#1</h2>
                    {
                        (!data.error && data.content[1]) &&
                        <>
                            <img src={data.content[1].img} className="trending-image"/>
                            <h2>{data.content[1].title} ({data.content[1].year})</h2>
                            <Button text="Remove" event={()=>{removeMovie(1)}}/>
                        </>
                    }
                    {
                        (data.error || !data.content[1]) &&
                        <>
                            <input placeholder="Type the movie's ID" type="number" onChange={e=>props.setFirstId(e.target.value)}/>
                            <Button text={"Set movie"} event={()=>{setMovie(1)}}/>
                        </>
                    }
                </div>

                <div className="trending-movie">
                    <h2>#2</h2>
                    {
                        (!data.error && data.content[2]) &&
                        <>
                            <img src={data.content[2].img} className="trending-image"/>
                            <h2>{data.content[2].title} ({data.content[2].year})</h2>
                            <Button text="Remove" event={()=>{removeMovie(2)}}/>
                        </>
                    }
                    {
                        (data.error || !data.content[2]) &&
                        <>
                            <input placeholder="Type the movie's ID" type="number" onChange={e=>props.setSecondId(e.target.value)}/>
                            <Button text={"Set movie"} event={()=>{setMovie(2)}}/>
                        </>
                    }
                </div>

                <div className="trending-movie">
                    <h2>#3</h2>
                    {
                        (!data.error && data.content[3]) &&
                        <>
                            <img src={data.content[3].img} className="trending-image"/>
                            <h2>{data.content[3].title} ({data.content[3].year})</h2>
                            <Button text="Remove" event={()=>{removeMovie(3)}}/>
                        </>
                    }
                    {
                        (data.error || !data.content[3]) &&
                        <>
                            <input placeholder="Type the movie's ID" type="number" onChange={e=>props.setThirdId(e.target.value)}/>
                            <Button text={"Set movie"} event={()=>{setMovie(3)}}/>
                        </>
                    }
                </div>


        </>
    }
    else
        return <LoadingAnimation/>


}

const TrendingMovies = () =>{
    const [firstId,setFirstId] = useState("");
    const [secondId,setSecondId] = useState("");
    const [thirdId,setThirdId] = useState("");


    return(<div className="panel-section">
        <h2>Trending</h2>
        <div>
            <TrendingResults firstId={firstId} secondId={secondId} thirdId={thirdId} setFirstId={setFirstId} setSecondId={setSecondId} setThirdId={setThirdId}/>
        </div>

        </div>)
}


function MoviePage(props) {
    return (
        <>
            <button id="panel-back-btn" onClick={props.goBack}></button>
            <img src={moviesSvg} className="panel-head-image" alt="movies suggestive"/>

            <div className="panel-container">
                <ScheduledMovies/>
                <ScheduleMovie/>
                <AddMovie/>
                <SearchMovie/>
                <TrendingMovies/>
            </div>

        </>
    );
}

export default MoviePage;
