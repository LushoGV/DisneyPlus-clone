import { createContext, useContext, useState } from "react";
import { iUserState } from "../features/user/userSlice";

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface context {
  newUserData: iUserState;
  error: boolean;
  setNewUserData: React.Dispatch<React.SetStateAction<iUserState>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const userContext = createContext<context>({} as context);

export const UserProvider = ({ children }: ProviderProps) => {
  const [newUserData, setNewUserData] = useState<iUserState>({
    id: "",
    cart: [],
    profile: {
      name: "",
      image: "",
    } 
  });
  const [error, setError] = useState<boolean>(false);

  return (
    <userContext.Provider
      value={{ newUserData, setNewUserData, error, setError }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const { newUserData, setNewUserData, error, setError } =
    useContext(userContext);
  return { newUserData, setNewUserData, error, setError };
};
