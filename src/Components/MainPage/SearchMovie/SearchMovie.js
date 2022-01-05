import "./SearchMovie.css";
import ExampleImage from "../../../assets/example-movie-image.jpg";
import {beautifyMinutes, monthNumberToString} from "../../../utils/utils";
import Button from "../../Button/Button";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import {useEffect,useState} from 'react';
import HeaderText from "../../HeaderText/HeaderText";

const Results = ({value})=>{
    const [data, setData] = useState({});
    const loadData = async () =>{
        value = value.replaceAll(" ","%20")
        const response = await fetch(`http://localhost:3000/get-movies?title=${value}`)
        response.json()
            .then(res=>{
                console.log(res)
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


    const suggestMovie = (id) =>{
        let btn = document.querySelector(`#search-movie-${id} button`)
        let span = document.querySelector(`#search-movie-${id} span`)
        btn.style.opacity = "0"
        span.style.opacity= "1"
        span.style.transform = "scale(1)"

        setTimeout(()=>{
            btn.style.pointerEvents="none"
        },500)

        fetch(`http://localhost:3000/increment-suggestions?id=${id}`)
    }



    if(value === "")
        return ""


    if(data.code==21)
        return <div className="selectDay-results">
            <h2>We can't find any movies matching the title <i>{value}</i>.</h2>
            <h4>Though, you can suggest it, so we can add it later!</h4>
            <Button text={`Suggest`}/>
    </div>

    if(data.content){
        console.log(data.content)

    }


    if(data.content)
        return <div className="selectDay-results">
            <h2>Results for {value}</h2>
            <div className="selectDay-list-of-results">
                {
                    data.content.map(movie => <div className="selectDay-movie" key={"searched-movie-"+movie.id}>
                        {/*<img src={`data:image/png;base64,${movie.img}`} alt={"image-of-"+movie.title}/>*/}
                        <img src={movie.img} alt={"image-of-"+movie.title}/>
                        <div className="selectDay-movie-info">
                            <p>{movie.title} ({movie.year})</p>
                            <p>{movie.genre}<br/>{beautifyMinutes(movie.duration)}</p>
                        </div>

                        <div className="searchMovie-willbeplayed" id={`search-movie-${movie.id}`}>
                            {
                                movie.dates[0] !== null &&
                                    <>
                                        <p>Will be played in:</p>
                                        <ul>
                                            {
                                                movie.dates.map(date => <li key={`${movie.title}-date-${date}`}>{`${date.split('-')[2]} ${monthNumberToString(date.split('-')[1])}`}</li>)
                                            }
                                        </ul>
                                    </>
                            }
                            {
                                movie.dates[0] === null &&
                                    <>
                                        <p>Not scheduled soon.</p>
                                        <Button text="Suggest it!" event={()=>{suggestMovie(movie.id)}}/>
                                        <span>Thank you!</span>
                                    </>

                            }
                        </div>
                    </div>)
                }

            </div>
        </div>

    else
        return <LoadingAnimation/>
}

var Timeout;

function SearchMovie() {
    const [movieValue,changeMovieValue] = useState("")

    const searchValueHandler = (value) =>{
        clearTimeout(Timeout)
        Timeout = setTimeout(()=>{
            if(value.trim() !== ""){
                changeMovieValue(value)
            }
        },400)
    }

    return (
        <div className="searchMovie section">
            <HeaderText text="Search a movie"/>
            <input
                placeholder="Type here the movie title"
                onChange={e=>searchValueHandler(e.target.value)}
                type="text"/>

            <Results value={movieValue}/>
        </div>
    );
}

export default SearchMovie;
