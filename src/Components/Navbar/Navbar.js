import "./Navbar.css";
import navbarLogo from "../.././assets/navbar-logo.png"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect,useState} from 'react'
import {useAccountData, useAccountDataUpdate} from "../AccountContext/AccountProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle,faSignOutAlt,faSignInAlt,faUser,faHome} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const [links,setLinks] = useState([])
    const location = useLocation()

    const [isMobile,setIsMobile] = useState(window.innerWidth > 800 ? false : true);

    const AccountData = useAccountData()
    const AccountDateUpdate = useAccountDataUpdate()
    const navigate = useNavigate();

    const SignOut = () =>{
        AccountDateUpdate({
            isLoggedIn:false
        })

        navigate('/')
    }

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            if(window.innerWidth > 800 && isMobile)
                setIsMobile(false)

            if(window.innerWidth <= 800 && !isMobile)
                setIsMobile(true)

        })
    },[])


    useEffect(()=>{
        let Links = []

        switch(location.pathname.split('/')[1]){
            case "":
                if(AccountData.isLoggedIn){
                    Links.push(<Link to="/account" key="account-link">{isMobile ? <FontAwesomeIcon icon={faUserCircle} /> : "Account"}</Link>)
                    Links.push(<button key="signout-link" onClick={SignOut}>{isMobile ? <FontAwesomeIcon icon={faSignOutAlt} /> : "Sign out"}</button>)
                }
                else{
                    Links.push(<Link to="/login" key="login-link">{isMobile ? <FontAwesomeIcon icon={faSignInAlt} /> : "Login"}</Link>)
                    Links.push(<Link to="/signup" key="signup-link">{isMobile ? <FontAwesomeIcon icon={faUser} /> : "Sign up"}</Link>)
                }
            {
                (AccountData.userData && AccountData.userData.panelAccess) && Links.push(<Link to="/panel" key="panel-link">Panel</Link>)
            }

                break;
            case "login":
                Links.push(<Link to="/" key="home-link">{isMobile ? <FontAwesomeIcon icon={faHome} /> : "Home"}</Link>)
                break;
            case "signup":
                Links.push(<Link to="/" key="home-link">{isMobile ? <FontAwesomeIcon icon={faHome} /> : "Home"}</Link>)
                break;
            case "404":
                Links.push(<Link to="/" key="home-link">{isMobile ? <FontAwesomeIcon icon={faHome} /> : "Home"}</Link>)
                break;
            case "book":
                Links.push(<Link to="/" key="home-link">{isMobile ? <FontAwesomeIcon icon={faHome} /> : "Home"}</Link>)
                break;
            case "account":
                Links.push(<Link to="/" key="home-link">{isMobile ? <FontAwesomeIcon icon={faHome} /> : "Home"}</Link>)
                Links.push(<button key="signout-link" onClick={SignOut}>Sign out</button>)
                break;
            case "panel":
                Links.push(<Link to="/" key="home-link">{isMobile ? <FontAwesomeIcon icon={faHome} /> : "Home"}</Link>)
                Links.push(<Link to="/account" key="account-link">{isMobile ? <FontAwesomeIcon icon={faUserCircle} /> : "Account"}</Link>)
                Links.push(<button key="signout-link" onClick={SignOut}>{isMobile ? <FontAwesomeIcon icon={faSignOutAlt} /> : "Sign out"}</button>)
                break;
            default:
                Links.push(<Link to="/" key="home-link">{isMobile ? <FontAwesomeIcon icon={faHome} /> : "Home"}</Link>)
                break;
        }
        setLinks(Links)
    },[useLocation(),AccountData,isMobile])

    return (
        <>
            {
                isMobile &&
                <div className="mobile-navbar">
                    <img src={navbarLogo} alt="remigoo logo"/>
                </div>
            }


            <div className="navbar">
                {!isMobile && <img src={navbarLogo} alt="remigoo logo"/>}

                <div className="navbar-links">
                    {links}
                </div>
        </div>
        </>
    );
}

export default Navbar;
