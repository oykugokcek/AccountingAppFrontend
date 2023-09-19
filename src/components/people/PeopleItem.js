import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PeopleEditForm from "./PeopleEditForm";

const PeopleItem = (props) => {
  const { person, handleDelete, handleEdit, editedPersonId } = props;
  const [isEditing, setIsEditing] = useState(false); // Düzenleme durumu

  // Düzenleme formu görüntülenirken kişiyi gizleme işlemi
  const hidePerson = () => {
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <tr>
          <td>{person.index + 1}</td>
          <td>{person.first_name}</td>
          <td>{person.last_name}</td>
          <td>0 505 000 {person.phone_number}</td>
          <td>
            <>
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
                onClick={() => {
                  handleEdit(person.id);
                  setIsEditing(true);
                }}
              >
                Düzenle
              </Button>
            </>
          </td>
        </tr>
      ) : <PeopleEditForm setIsEditing={setIsEditing} editedPerson={person} />}
      {isEditing && editedPersonId === person.id && (
        <tr>
          <td colSpan="5">
            <Button variant="secondary" onClick={hidePerson}>
              İptal
            </Button>
          </td>
        </tr>
      )}
    </>
  );
};

export default PeopleItem;
