import React, {useState} from 'react';
import axios from "axios";
const rootURL = "http://localhost:5000/api";

const AppContext = React.createContext();
const AppProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tests, setTests] = useState([]); 
    const [showNavbar, setShowNavbar] = useState(true);
    const [testQuestions, setTestQuestions] = useState([]);

    const  getStudentTests = async () => {
        console.log("getting tests from db..")
        setIsLoading(true);
        const response  = await axios.get(`${rootURL}/students/1/due`)
        .catch((err) => console.log(err));

        if(response) {
            setTests(response.data);
        }
        setIsLoading(false);

    }  

    const  getTestQuestions = async (testId) => {
        console.log("getting questions from db..")
        setIsLoading(true);
        const response  = await axios.get(`${rootURL}/assignments/${testId}/questions`)
        .catch((err) => console.log(err));

        if(response) {
            // console.log(response.data)
            setTestQuestions(response.data);
        }
        setIsLoading(false);

    }  




    return <AppContext.Provider value={{tests, isLoading, getStudentTests, showNavbar, setShowNavbar, testQuestions, getTestQuestions}}>{children} </AppContext.Provider>
}

export {AppContext, AppProvider}