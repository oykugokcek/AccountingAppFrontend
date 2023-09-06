import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';


const PeopleList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const { people, setPeople } = props;


    useEffect(() => {
        // Önbellekten veriyi al
        const cachedPeople = localStorage.getItem("cachedPeople");
    
        if (cachedPeople) {
            console.log(people)
            console.log(cachedPeople)
          setPeople(JSON.parse(cachedPeople));
          setIsLoading(false); // Veri yüklendi
        } else {
          axios.get("http://localhost:8000/api/person/kisiler")
            .then((res) => {
              console.log(res.data);
              setPeople(res.data);
              setIsLoading(false); // Veri yüklendi
              // Veriyi önbelleğe al
              localStorage.setItem("cachedPeople", JSON.stringify(res.data));
            }).catch((err) => {
              console.log(err);
              setIsLoading(false); // Veri yüklendi
            });
        }
      }, []);
    

  return (
    <div className='flex justify-center p-4 mx-96 border border-solid'><div>
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
        </tr>
      </thead>
      <tbody>
        {people.map((person, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{person.first_name}</td>
            <td>{person.last_name}</td>
            <td>0 505 000 {person.phone_number}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    )}
  </div></div>
  )
}

export default PeopleList