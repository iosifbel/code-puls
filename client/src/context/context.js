import React, { useState } from "react";
import axios from "axios";
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
  const [isLoading, setIsLoading] = useState(false);
  // const [tests, setTests] = useState([]);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [testQuestions, setTestQuestions] = useState([
    { id: -1, descriere: "", raspunsuri: "" },
  ]);
  const [aceLanguages] = useState(ace);
  // const [judgeResponse, setJudgeResponse] = useState();
  const [codeEditorText, setCodeEditorText] = useState();

  // const getStudentTests = async () => {
  //   console.log("getting tests from db..");
  //   setIsLoading(true);
  //   const response = await axios
  //     .get(`${rootURL}/students/1/due`)
  //     .catch((err) => console.log(err));

  //   if (response) {
  //     setTests(response.data);
  //   }
  //   setIsLoading(false);
  // };
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
  // const getJudgeAssessment = async (test) => {
  //     console.log("getting assessment from judge...");
  //     //setIsLoading(true);
  //     const judgeData = {
  //         source_code : test.source_cod,
  //         language_id : test.language_id,
  //         stdin : test.stdin
  //     }
  //     console.log(test.source_cod)
  //     const response  = await axios({
  //         method : "post",
  //         url : `${rootURL}/questions/assess/${test.questionId}/${test.id}/1`,
  //         data: judgeData
  //     })
  //     .catch((err) => console.log(err));

  //     if(response) {
  //         console.log(response.data)
  //         setJudgeResponse(response.data);
  //     }
  //     //setIsLoading(false);
  // }
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
      }}
    >
      {children}{" "}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
