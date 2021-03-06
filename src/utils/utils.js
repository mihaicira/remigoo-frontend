export const popUpError = () =>{
    document.getElementById("account-error").style.transform="scale(1.2)";
    setTimeout(()=>{
        document.getElementById("account-error").style.transform="scale(1)";
    },500)
}

export const validateEmail = (email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export async function LoginRequest(obj){
    //email,password
    const response = await fetch(`http://localhost:3000/login?email_address=${obj.email}&password=${obj.password}`)
    return await response.json()

}

export const beautifyMinutes = (min) =>{
    let time = Math.floor(min/60) + "h"
    if(min%60 !== 0)
        time += ' '+ min%60 + 'm'
    return time
}

export const isDateInPast = (date)=>{
    const splittedValue = date.split('-')
    const selectedDate = new Date(splittedValue[0],splittedValue[1]-1,splittedValue[2])
    const now = new Date()
    const today = new Date(now.getFullYear(),now.getMonth(),now.getDate())
    return selectedDate < today
}

export const monthNumberToString = (number) =>{
    const months = {
        '01':"January",
        '02':"February",
        '03':"March",
        '04':"April",
        '05':"May",
        '06':"June",
        '07':"July",
        '08':"August",
        '09':"September",
        '10':"October",
        '11':"November",
        '12':"December",
    }
    return months[number];
}