import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchPeople, selectAllPeople, getPeopleStatus } from "../../store/PeopleSlice";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';

const PeopleList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const people = useSelector(selectAllPeople);
  const peopleStatus = useSelector(getPeopleStatus);

  useEffect(() => {
    if (peopleStatus === 'idle') {
      dispatch(fetchPeople());
    }
  }, [peopleStatus, dispatch]);

  useEffect(() => {
    if (peopleStatus === 'succeeded') {
      setIsLoading(false);
    }
  }, [people, peopleStatus]);

  const handleDelete = async (id) => {
  };

  const handleEdit = (id) => {
  };

  return (
    <div style={{ margin: "0 240px" }}>
      <div>
        {isLoading ? (
          <p>Veriler yükleniyor...</p>
        ) : peopleStatus === 'failed' ? (
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{person.first_name}</td>
                  <td>{person.last_name}</td>
                  <td>0 505 000 {person.phone_number}</td>
                  <td>
                    <Button
                      variant="danger"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleDelete(person.id)}
                    >
                      Sil
                    </Button>
                    <Button
                      variant="warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleEdit(person.id)}
                    >
                      Düzenle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default PeopleList;
