import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const PeopleList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { people, setPeople } = props;

  useEffect(() => {
    // Önbellekten veriyi al
    const cachedPeople = localStorage.getItem("cachedPeople");

    if (cachedPeople) {
      console.log(people);
      console.log(cachedPeople);
      setPeople(JSON.parse(cachedPeople));
      setIsLoading(false); // Veri yüklendi
    } else {
      axios
        .get("http://localhost:8000/api/person/kisiler")
        .then((res) => {
          console.log(res.data);
          setPeople(res.data);
          setIsLoading(false); // Veri yüklendi
          // Veriyi önbelleğe al
          localStorage.setItem("cachedPeople", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false); // Veri yüklendi
        });
    }
  }, [setPeople]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/person/kisiler/${id}`);
      setPeople(people.filter((person) => person.id !== id));
    } catch (error) {
      console.error('Kişi silinirken hata oluştu:', error);
    }
  };

  const handleEdit = (id) => {
   
  };

  return (
    <div style={{ margin: "0 240px" }}>
      <div>
        {isLoading ? (
          <p>Veriler yükleniyor...</p>
        ) : (
          <Table striped bordered hover variant="primary">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Actions</th> {/* Silme ve Düzenleme için sütun */}
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
