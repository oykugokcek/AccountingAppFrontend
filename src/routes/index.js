import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { People } from "../components/people/People";

const Index = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<People />} />   
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Index;