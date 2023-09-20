import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPerson, updatePerson } from "../../store/PeopleSlice";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PeopleEditForm = ({ editedPerson, setIsEditing }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: editedPerson.first_name || "",
      lastName: editedPerson.last_name || "",
      phoneNumber: editedPerson.phone_number || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (!data.firstName || !data.lastName || !data.phoneNumber) {
        throw new Error("Tüm alanları doldurmalısınız.");
      }

      const jsonData = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
      };
      await dispatch(updatePerson({ id: editedPerson.id, data: jsonData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Form className="mx-auto  w-full p-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>Ad</Form.Label>
          <Form.Control
            type="text"
            {...register("firstName")}
            placeholder="Ad"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Soyad</Form.Label>
          <Form.Control
            type="text"
            {...register("lastName")}
            placeholder="Soyad"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Telefon Numarası</Form.Label>
          <Form.Control
            type="text"
            {...register("phoneNumber")}
            placeholder="Telefon numarası"
          />
        </Form.Group>
        <div className="d-flex justify-content-end align-items-center gap-2 mr-12">
          <Button variant="primary" type="submit">
            Güncelle
          </Button>
          <Button variant="secondary" onClick={setIsEditing.bind(null, false)}>
            İptal
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PeopleEditForm;
