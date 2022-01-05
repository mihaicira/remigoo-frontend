import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import MainPage from "./Components/MainPage/MainPage";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import LoginPage from "./Components/PageLoginSignup/LoginPage";
import SignupPage from "./Components/PageLoginSignup/SignupPage";
import PanelPage from "./Components/PagePanel/PanelPage";
import BookTicketPage from "./Components/PageBookTicket/BookTicketPage";
import ProfilePage from "./Components/PageProfile/ProfilePage";
import {useAccountDataUpdate} from "./Components/AccountContext/AccountProvider";
import {useEffect} from 'react'

function App() {

    const AccountDataUpdate = useAccountDataUpdate()

    useEffect(()=> {
        async function refresh() {
            var accountData;

            try {
                let storageData = JSON.parse(localStorage.getItem("loginStatus"))
                const userData = storageData.userData
                if (storageData.isLoggedIn) {
                    const response = await fetch(`http://localhost:3000/validate-token?id=${userData.userId}&auth_token=${userData.token}`)
                    const response_data = await response.json()

                    if (!response_data.error) {
                        userData.panelAccess = response_data.hasPanelAccess
                        accountData = {
                            isLoggedIn: storageData.isLoggedIn,
                            userData: userData
                        }
                        console.log("Successfully logged in!")
                    }
                } else {
                    accountData = {
                        isLoggedIn: false
                    }
                    console.log("User is not logged in.")
                }
            } catch {
                accountData = {
                    isLoggedIn: false
                }
                console.log("User is not logged in.")
            }

            AccountDataUpdate(accountData)
        }

        refresh()
    }
    ,[])

  return (<>
             <Navbar/>
             <Routes>
                <Route path="/" exact element={<MainPage/>}/>
                <Route path="/login" exact element={<LoginPage/>}/>
                <Route path="/signup" exact element={<SignupPage/>}/>
                <Route path="/panel" exact element={<PanelPage/>}/>
                <Route path="/account" exact element={<ProfilePage/>}/>
                <Route path="/book/:movieId" exact element={<BookTicketPage/>}/>
                <Route path="*" element={<PageNotFound/>}/>
             </Routes>
    </>
  );
}

export default App;
