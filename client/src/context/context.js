import React, {useState} from 'react';
import axios from "axios";
const rootURL = "http://localhost:5000/api";

const AppContext = React.createContext();
const AppProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tests, setTests] = useState([]); 


    const  getStudentTests = async () => {
        console.log("tests are get from db")
        setIsLoading(true);
        const response  = await axios.get(`${rootURL}/students/1/due`)
        .catch((err) => console.log(err));

        if(response) {
            setTests(response.data);
        }
        setIsLoading(false);

    }  

  




    return <AppContext.Provider value={{tests, isLoading, getStudentTests}}>{children} </AppContext.Provider>
}

export {AppContext, AppProvider}