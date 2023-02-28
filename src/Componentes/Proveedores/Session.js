import { useState } from "react";

const Session = () =>{
    const [token, setToken] = useState('');

    const setearToken = newToken => {
        setToken(newToken);
    }
    
    const getToken = () => {
        return token
    }
}

export default Session;