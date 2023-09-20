import React, { useState } from "react";
import PeopleList from "./PeopleList";
import PeopleAddForm from "./PeopleAddForm";
import Button from "react-bootstrap/Button";

export const People = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const toggleList = async () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <div className="max-w-2xl mx-auto text-center mt-8 border border-solid p-4">
      <h2>KİŞİLER</h2>
      <div className="my-6">
        {isListVisible && <PeopleList />}{" "}
      </div>
      <div className="my-6">
        {isFormVisible && <PeopleAddForm />}{" "}
      </div>

      <div className="flex justify-center  gap-4 mt-8">
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
