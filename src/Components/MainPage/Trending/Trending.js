import "./Trending.css";
import "../MainPage.css"
import Button from "../../Button/Button";

import ExampleImage from '../../../assets/example-movie-image.jpg'
import HeaderText from "../../HeaderText/HeaderText";
import {beautifyMinutes} from "../../../utils/utils";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from 'react';

const Results = ()=>{
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const loadData = async () =>{
        const response = await fetch(`http://localhost:3000/getTrending`)
        response.json()
            .then(res=>{
                setData(res)
            })
    }

    useEffect(()=>{
        setData({})
        console.log("helo")
        loadData();
        return ()=>{};
    },[])

    const RedirectToBooking = (id) =>{
        navigate(`/book/${id}`)
    }


    if(data.content)
        console.log(data.content)

    // if(isDateInPast(value))
    //     return <p>date is in past</p>

    if(data.content)
        if(!data.error){
            return <>
                <div className="trending section">
                    <HeaderText text="Trending"/>
                    <div className="trending-boxes">
                        {
                            data.content[1] &&
                            <div className="trending-box">
                                <img src={data.content[1].img} alt="example-img"/>
                                <Button text="Book a ticket" event={()=>{RedirectToBooking(data.content[1].id)}}/>
                            </div>
                        }

                        {
                            data.content[2] &&
                            <div className="trending-box">
                                <img src={data.content[2].img} alt="example-img"/>
                                <Button text="Book a ticket" event={()=>{RedirectToBooking(data.content[2].id)}}/>
                            </div>
                        }

                        {
                            data.content[3] &&
                            <div className="trending-box">
                                <img src={data.content[3].img} alt="example-img"/>
                                <Button text="Book a ticket" event={()=>{RedirectToBooking(data.content[3].id)}}/>
                            </div>
                        }
                    </div>
                </div>
            </>
        }
        else
            return <p>There is no trending.</p>
    else
        return <LoadingAnimation/>


}

function Trending() {
    return (

        <Results/>


    );
}

export default Trending;
