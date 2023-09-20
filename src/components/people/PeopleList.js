import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchPeople,
  selectAllPeople,
  getPeopleStatus,
  deletePerson,
} from "../../store/PeopleSlice";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import PeopleItem from "./PeopleItem";

const PeopleList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [editedPersonId, setEditedPersonId] = useState(0);
  const dispatch = useDispatch();
  const people = useSelector(selectAllPeople);
  const peopleStatus = useSelector(getPeopleStatus);

  useEffect(() => {
    if (peopleStatus === "idle") {
      dispatch(fetchPeople());
    }
  }, [peopleStatus, dispatch]);

  useEffect(() => {
    if (peopleStatus === "succeeded") {
      setIsLoading(false);
    }
  }, [people, peopleStatus]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePerson({id}))
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (id) => {
    setEditedPersonId(id);
  };

  return (
    <div>
      <div  >
        <div className="mt-5 max-w-2xl mx-auto">
          {isLoading ? (
            <p>Veriler yükleniyor...</p>
          ) : peopleStatus === "failed" ? (
            <p>Veriler yüklenirken hata oluştu.</p>
          ) : (
            <Table striped bordered hover variant="primary">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person, index) => (
                  <PeopleItem
                    key={person.id}
                    person={{
                      id: person.id,
                      index: index,
                      first_name: person.first_name,
                      last_name: person.last_name,
                      phone_number: person.phone_number,
                    }}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    editedPersonId={editedPersonId}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleList;
