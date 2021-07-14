import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const rootURL = "http://localhost:5000/api";

const judge0Languges = [
  { id: 48, name: "C (GCC 7.4.0)" },
  { id: 51, name: "C# (Mono 6.6.0.161)" },
  { id: 52, name: "C++ (GCC 7.4.0)" },
  { id: 63, name: "JavaScript (Node.js 12.14.0)" },
  { id: 62, name: "Java (OpenJDK 13.0.1)" },
  { id: 71, name: "Python (3.8.1)" },
];

const ace = [
  { id: 48, name: "c_cpp" },
  { id: 51, name: "csharp" },
  { id: 52, name: "c_cpp" },
  { id: 63, name: "javascript" },
  { id: 62, name: "java" },
  { id: 71, name: "python" },
];

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [testQuestions, setTestQuestions] = useState([
    { id: -1, descriere: "", raspunsuri: "" },
  ]);
  const [aceLanguages] = useState(ace);

  const testInProgress = localStorage.getItem("testInProgress");

  const [testState, setTestState] = useState(
    testInProgress
      ? JSON.parse(testInProgress)
      : {
          id: -1,
          id_limbaj_programare: 48,
        }
  );
  const setTestInProgress = (test) => {
    localStorage.setItem("testInProgress", JSON.stringify(test));
    // console.log("test");
    setTestState(test);
  };

  const removeTestInProgress = () => {
    console.log("iesi");
    localStorage.removeItem("testInProgress");
    setTimeout(() => {
      history.push("/tests");
      setTestState({});
    }, 1000);
  };

  const [codeEditorText, setCodeEditorText] = useState();

  const getTestQuestions = async (testId) => {
    console.log("getting questions from db..");
    setIsLoading(true);
    const response = await axios
      .get(`${rootURL}/assignments/${testId}/questions`)
      .catch((err) => console.log(err));

    if (response) {
      console.log(response.data);
      setTestQuestions(response.data);
    }
    setIsLoading(false);
  };

  function encode(str) {
    return btoa(unescape(encodeURIComponent(str || "")));
  }
  function decode(bytes) {
    var escaped = escape(atob(bytes || ""));
    try {
      return decodeURIComponent(escaped);
    } catch {
      return unescape(escaped);
    }
  }

  return (
    <AppContext.Provider
      value={{
        // tests,
        isLoading,
        // getStudentTests,
        showNavbar,
        setShowNavbar,
        testQuestions,
        getTestQuestions,
        aceLanguages,
        judge0Languges,
        setIsLoading,
        codeEditorText,
        setCodeEditorText,
        encode,
        decode,
        showHeader,
        setShowHeader,
        testState,
        setTestInProgress,
        removeTestInProgress,
      }}
    >
      {children}{" "}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
