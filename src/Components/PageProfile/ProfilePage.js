import "./ProfilePage.css";
import HeaderText from "../HeaderText/HeaderText";
import TicketInfo from "./TicketInfo/TicketInfo";
import AccountDataSection from "./AccountDataSection/AccountDataSection";
import {useAccountData, useAccountDataUpdate} from "../AccountContext/AccountProvider";
import {useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";

function ProfilePage(props) {

    const AccountDataUpdate = useAccountDataUpdate()
    const AccountData = useAccountData()
    const navigate = useNavigate();
    const [userData,setUserdata] = useState({})
    const [ageCategory,setAgeCategory] = useState(null)
    const [tickets,setTickets] = useState(null)

    async function GetUserRequest(email){
        const response = await fetch(`http://localhost:3000/getuser?email_address=${email}`)
        const data = await response.json();
        setUserdata(data.content)
        setAgeCategory(data.content.userAgeCategory)
        return data;
    }

    const refreshUser = async (email) =>{
        const response = await GetUserRequest(email)

        if(response.error)
            navigate('/')

        setUserdata(response.content)
        setTickets(response.content.tickets)

    }

    useEffect(()=>{
        async function effectFunction(){
            const storageData = JSON.parse(localStorage.getItem("loginStatus"))
            if(!storageData.isLoggedIn){
                navigate('/')
                return;
            }


            //getuser
            refreshUser(storageData.userData.userEmail)
        }

        effectFunction()
    },[])

    const changeAgeCategory = (newCategory) =>{
        setAgeCategory(newCategory)
        let acc = AccountData
        acc.userAgeCategory = newCategory
        AccountDataUpdate(acc)
        // console.log(`http://localhost:3000/change-age-category?id=${AccountData.userData.userId}&age_category=${newCategory}`)
        fetch(`http://localhost:3000/change-age-category?id=${AccountData.userData.userId}&age_category=${newCategory}`)
    }

    return (
        <>
            {AccountData.isLoggedIn && <HeaderText text={`Hello, ${AccountData.userData.userName}!`}/>}

            <div className="change-ticket-category-container">
                {
                    ageCategory &&
                        <>
                            <h2>Change your ticket category</h2>
                            <select type="text" defaultValue={ageCategory} onChange={e=>changeAgeCategory(e.target.value)}>
                                <option value="standard">Standard</option>
                                <option value="child">Child (&le;14 y/o)</option>
                                <option value="student">Student</option>
                                <option value="pensionary">Pensionary</option>
                            </select>
                        </>
                }

            </div>

            {
                tickets &&
                <TicketInfo tickets={Object.keys(tickets).length === 0 ? null : tickets}/>
            }



            <HeaderText text={`Account data`}/>
            <AccountDataSection name={userData.userName} email={userData.userEmail} id={userData.userId} refreshUser={refreshUser}/>
        </>
    );
}

export default ProfilePage;
