import "./AccountDataSection.css";
import {useState,useEffect} from  'react';
import Button from "../../Button/Button";

const UserForm = (props) =>{

    useEffect(()=>{
        // console.log("userform:",props)
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    })

    return(<>
        <form className="account-form" onSubmit={props.event}>
            <label>Old username: {props.name}</label>
            <label>New username:</label>
            <input type="text" required/>
            <Button text="Change username"/>
        </form>
        </>)
}

const EmailForm = (props) =>{
    return(<>
        <form className="account-form" onSubmit={props.event}>
            <label>Old email: {props.email}</label>
            <label>New email:</label>
            <input type="text" required/>
            <Button text="Change email"/>
        </form>
    </>)
}

const PasswordForm = (props) =>{
    return(<>
        <form className="account-form" onSubmit={props.event}>
            <label>Old password:</label>
            <input type="text" required/>
            <label>New password:</label>
            <input type="text" required/>
            <Button text="Change password"/>
        </form>
    </>)
}

function AccountDataSection(props) {
    const [activeForm,setActiveForm] = useState("")
    const [submittedStatusText,setSubmittedStatusText] = useState("")

    const submitUsernameForm = async (e) =>{
        e.preventDefault()
        let new_username = e.target[0].value
        let auth_token = JSON.parse(localStorage.getItem("loginStatus")).userData.token

        const response = await fetch(`http://localhost:3000/change-name?id=${3}&name=${new_username}&token=${auth_token}`)
        const data = await response.json()


        setActiveForm("submitted")

        setSubmittedStatusText(data.error ? "There has been an error." : "Your username has been changed")


        let storage = JSON.parse(localStorage.getItem("loginStatus"))
        storage.userData.userName = new_username
        localStorage.setItem("loginStatus",JSON.stringify(storage))

        props.refreshUser(JSON.parse(localStorage.getItem("loginStatus")).userData.userEmail)
    }

    const submitEmailForm = async (e) =>{
        e.preventDefault()
        let new_email = e.target[0].value
        let auth_token = JSON.parse(localStorage.getItem("loginStatus")).userData.token

        const response = await fetch(`http://localhost:3000/change-email?id=${props.id}&email_address=${new_email}&token=${auth_token}`)
        const data = await response.json()

        setActiveForm("submitted")
        setSubmittedStatusText(data.error ? "There has been an error." : "Your email has been changed")


        let storage = JSON.parse(localStorage.getItem("loginStatus"))
        storage.userData.userEmail = new_email
        localStorage.setItem("loginStatus",JSON.stringify(storage))

        props.refreshUser(new_email)
    }

    const submitPasswordForm = async (e) =>{
        e.preventDefault()
        let old_pass = e.target[0].value
        let new_pass = e.target[1].value
        let auth_token = JSON.parse(localStorage.getItem("loginStatus")).userData.token

        const response = await fetch(`http://localhost:3000/change-password?id=${props.id}&old_password=${old_pass}&new_password=${new_pass}&token=${auth_token}`)
        const data = await response.json()

        setActiveForm("submitted")
        setSubmittedStatusText(data.error ? data.content : "Your password has been changed")

    }

    return (
        <div className="account-section ticket-section">
            <div className="account-buttons">
                <button onClick={()=>{setActiveForm("user")}}>Change your username</button>
                <button onClick={()=>{setActiveForm("email")}}>Change your email adress</button>
                <button onClick={()=>{setActiveForm("pass")}}>Change your password</button>
            </div>

            {activeForm==="user" && <UserForm event={submitUsernameForm} name={props.name}/>}

            {activeForm==="email" && <EmailForm event={submitEmailForm} email={props.email}/>}

            {activeForm==="pass" && <PasswordForm event={submitPasswordForm}/>}

            {activeForm==="submitted" &&
            <div className="account-submitted" >
                <p>{submittedStatusText}</p>
            </div>}

        </div>
    );
}

export default AccountDataSection;
