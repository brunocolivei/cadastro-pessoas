import { createContext, useState, useEffect } from 'react'

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [user,setUser] = useState('')
    
    useEffect(() => {
        if (localStorage.getItem('session') == 'true') {
            setUser('joao')
        }
    },[])

    return(
        <AppContext.Provider value={{user, setUser}}>
            {children}
        </AppContext.Provider>
    )
}

const AppContextModule = {AppContext, AppProvider}
export default AppContextModule