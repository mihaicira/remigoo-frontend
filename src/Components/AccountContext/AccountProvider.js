import React,{useContext,useState} from 'react';

const AccountContext = React.createContext()
const AccountUpdateContext = React.createContext()

export function useAccountData(){
    return useContext(AccountContext);
}

export function useAccountDataUpdate(){
    return useContext(AccountUpdateContext)
}

export function AccountProvider({children}){
    const [accountData,setAccountData] = useState({})

    function changeAccountDataHandler(newData){
        localStorage.setItem("loginStatus",JSON.stringify(newData))
        setAccountData(newData)
    }

    return(
        <AccountContext.Provider value={accountData}>
            <AccountUpdateContext.Provider value={changeAccountDataHandler}>
                {children}
            </AccountUpdateContext.Provider>
        </AccountContext.Provider>
    )
}