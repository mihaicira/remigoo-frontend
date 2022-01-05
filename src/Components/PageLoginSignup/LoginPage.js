import "./LoginSignup.css";
import Button from "../Button/Button";
import {useState,useEffect} from 'react';
import {Link,useNavigate} from "react-router-dom";
import {popUpError,LoginRequest} from '../../utils/utils.js'
import {useAccountData, useAccountDataUpdate} from "../AccountContext/AccountProvider";
import { sha256 } from 'js-sha256';

function LoginPage() {
    const [error,setError] = useState("")
    const [inputEmail,changeInputEmail] = useState("")
    const [inputPassword,changeInputPassword] = useState("")

    const AccountDataUpdate = useAccountDataUpdate()
    const AccountData = useAccountData()
    const navigate = useNavigate();

    useEffect(()=>{
        if(AccountData.isLoggedIn)
            navigate('/')
    },[])




    const handleForm = async (e)=> {
        e.preventDefault();

        // changeInputEmail("mihai12@yahoo.com")
        // changeInputPassword("kaka")

        //complete all fields
        if (inputEmail === '' || inputPassword === '') {
            setError("Complete all fields.")
            popUpError()
            return;
        }

        const response = await LoginRequest({
            email: inputEmail,
            password: sha256(inputPassword)
        })

        if (response.error) {
            setError(response.content)
            popUpError()
            return;
        }

        AccountDataUpdate({
            isLoggedIn: true,
            userData: {
                userId: response.content.userId,
                userName: response.content.userName,
                userEmail: response.content.userEmail,
                token: response.content.token
            }
        })

        //redirect to Home
        navigate("/");
    }



    return (
        <div className="login-signup-form-container">

            <h2>Login</h2>
            <form>
                <label>Email address</label>
                <input type="text" placeholder="email" required onChange={(e)=>{changeInputEmail(e.target.value)}}/>

                <label>Password</label>
                <input type="password" placeholder="password" required onChange={(e)=>{changeInputPassword(e.target.value)}}/>

                <p id="account-error">{error}</p>

                <Button text="Login" event={handleForm}/>

                <Link to="/signup">Create an account</Link>

            </form>
        </div>
    );
}

export default LoginPage;
