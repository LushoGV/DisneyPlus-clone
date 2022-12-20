import {createContext, useContext, useState} from 'react'

type user = {
    name: string,
    image: string
}

interface ProviderProps {
    children: JSX.Element | JSX.Element[];
}

interface context {
    newUserData: user
    error: boolean
    setNewUserData: React.Dispatch<React.SetStateAction<user>>
    setError: React.Dispatch<React.SetStateAction<boolean>>
}

const userContext = createContext<context>({} as context)

export const UserProvider = ({children}:ProviderProps) => {
    const [newUserData, setNewUserData] = useState<user>({
        name: "",
        image: "",
    })
    const [error, setError] = useState<boolean>(false)

    return(
        <userContext.Provider value={{newUserData, setNewUserData, error, setError}}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => {
    const {newUserData, setNewUserData, error, setError} = useContext(userContext)
    return {newUserData, setNewUserData, error, setError}
}