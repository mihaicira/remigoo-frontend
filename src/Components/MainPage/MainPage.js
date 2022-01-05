import "./MainPage.css";
import Trending from "./Trending/Trending";
import SelectDay from "./SelectDay/SelectDay";
import SearchMovie from "./SearchMovie/SearchMovie";
import Information from "./Information/Information";
import HeaderText from "../HeaderText/HeaderText";
import {useAccountData} from "../AccountContext/AccountProvider";
import HowTo from "./HowTo/HowTo";
import Tutorial from "./HowTo/Tutorial";
import {useState} from 'react';

function MainPage() {
    const [tutorial,toggleTutorial] = useState(false)

    const AccountData = useAccountData()

    return (
        <>
            {
                AccountData.isLoggedIn &&
                <HeaderText text={`Hello, ${AccountData.userData.userName}!`}/>
            }
            <HowTo toggleTutorial={toggleTutorial}/>
            {
                tutorial && <Tutorial toggleTutorial={toggleTutorial}/>
            }

            <Trending/>
            <SelectDay/>
            <SearchMovie/>
            <Information/>
        </>
    );
}

export default MainPage;
