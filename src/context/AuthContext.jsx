import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider (props) {
    const [loginData, setLoginData] = useState(null);
    
let saveLoginData = () =>{
  let decodedToken = localStorage.getItem("token");
  let encodedToken = jwtDecode(decodedToken);
  setLoginData(encodedToken)
}
useEffect(() => {
  if(localStorage.getItem('token'))
    saveLoginData()

}, []);

    return (<AuthContext.Provider value={{loginData, saveLoginData}}>{props.children}</AuthContext.Provider>)

}