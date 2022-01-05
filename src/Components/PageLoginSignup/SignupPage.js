import "./LoginSignup.css";
import Button from "../Button/Button";
import {Link,useNavigate} from "react-router-dom";
import {useState} from 'react';
import {popUpError,validateEmail,LoginRequest} from '../../utils/utils.js'
import { sha256 } from 'js-sha256';
import {useAccountData, useAccountDataUpdate} from "../AccountContext/AccountProvider";

function SignupPage(e) {
    const [error,setError] = useState("")
    const [inputName,changeInputName] = useState("")
    const [inputEmail,changeInputEmail] = useState("")
    const [inputPassword,changeInputPassword] = useState("")
    const [inputRepeatPassword,changeRepeatPassword] = useState("")
    const [inputDateOfBirth,changeInputDateOfBirth] = useState("")

    const AccountDataUpdate = useAccountDataUpdate()
    const navigate = useNavigate();

    async function SignUpRequest(obj){
        const response = await fetch(`http://localhost:3000/signup?name=${obj.name}&password=${obj.password}&email_address=${obj.email_address}&date_of_birth=${obj.date_of_birth}`)
        return await response.json()

    }

    const handleForm = async (e)=>{
        e.preventDefault();

        //complete all fields
        if(inputName === '' || inputEmail === '' || inputPassword === '' || inputRepeatPassword === '' || inputDateOfBirth=== ''){
            setError("Complete all fields.")
            popUpError()
            return;
        }

        //email validation
        if(!validateEmail(inputEmail)){
            setError("Email address is invalid.")
            popUpError()
            return;
        }

        //passwords match
        if(inputRepeatPassword !== inputPassword){
            setError("Passwords do not match.")
            popUpError()
            return;
        }

        const response = await SignUpRequest({
            name:inputName,
            password:sha256(inputPassword),
            email_address:inputEmail,
            date_of_birth:inputDateOfBirth
        })

        if(!response.error){
            const loginResponse = await LoginRequest({
                email:inputEmail,
                password:sha256(inputPassword)
            })

            AccountDataUpdate({
                isLoggedIn: true,
                userData: {
                    userId: loginResponse.content.userId,
                    userName: loginResponse.content.userName,
                    userEmail: loginResponse.content.userEmail,
                    token: loginResponse.content.token
                }
            })

            //redirect to Home
            navigate("/");
        }
        else{
            setError(response.content)
            console.log(response)
            popUpError()
            return;
        }
    }

    return (
        <>
            <p className="signup-additional-text">Having an account helps you tracking your tickets and booking tickets more easily.</p>
        <div className="login-signup-form-container">

            <h2>Sign up</h2>
            <form>
                <label>Name</label>
                <input type="text" placeholder="name" required onChange={(e)=>{changeInputName(e.target.value)}}/>

                <label>Email adress</label>
                <input type="text" placeholder="email" required onChange={(e)=>{changeInputEmail(e.target.value)}}/>

                <label>Password</label>
                <input type="password" placeholder="password" required onChange={(e)=>{changeInputPassword(e.target.value)}}/>

                <label>Repeat password</label>
                <input type="password" placeholder="password" required onChange={(e)=>{changeRepeatPassword(e.target.value)}}/>

                <label>Date of birth</label>
                <input type="date" required onChange={(e)=>{changeInputDateOfBirth(e.target.value)}}/>

                <p id="account-error">{error}</p>

                <Button text="Create account" event={handleForm}/>

                <Link to="/login">Already have an account? Login!</Link>

            </form>
        </div>
        </>
    );
}

export default SignupPage;
