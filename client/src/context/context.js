import React, {useState, useEffect} from 'react';
import axios from "axios";

const StudentContext = React.createContext();

const StudentProvider = ({children}) => {
    return <StudentContext.Provider value={"hello"}>{} </StudentContext.Provider>
}