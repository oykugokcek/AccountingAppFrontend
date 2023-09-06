import React, { useState } from "react";
import PeopleList from "./people/PeopleList";
import PeopleForm from "./people/PeopleForm";
import axios from "axios";
import Button from 'react-bootstrap/Button';

const AddInfo = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [people, setPeople] = useState([]);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const toggleList = async () => {
    setIsListVisible(!isListVisible);
    if (!isListVisible) {
      // "Listele" butonuna bastığınızda GET isteği yap
      try {
        const response = await axios.get(
          "http://localhost:8000/api/person/kisiler"
        );
        setPeople(response.data);
        localStorage.setItem("cachedPeople", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  return (
    <div className="mt-8">
      <div className="my-6">
        {isListVisible && <PeopleList people={people} setPeople={setPeople} />}{" "}
      </div>
      <div className="my-6">
        {isFormVisible && <PeopleForm people={people} setPeople={setPeople} />}{" "}
      </div>
      <div className="text-center flex justify-center gap-20">
        <Button onClick={toggleList}>
          {isListVisible ? "Listeyi Gizle" : "Listele"}
        </Button>
        <Button onClick={toggleForm}>
          {" "}
          {isFormVisible ? "Vazgeç" : "Yeni Kişi Ekle"}{" "}
        </Button>
      </div>
    </div>
  );
};

export default AddInfo;
