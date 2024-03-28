import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [auth, setAuth] = useState(null);
    const getUserData = () => {
        if (userToken != null)
        {
            const tokenDecoded = jwtDecode(userToken);
            setAuth(tokenDecoded);
        }
    }
    useEffect(() => {
        getUserData();
    },[userToken])
    return <UserContext.Provider value={{auth,setUserToken,setAuth}} >
        {children}
    </UserContext.Provider>
};
export default UserContextProvider;