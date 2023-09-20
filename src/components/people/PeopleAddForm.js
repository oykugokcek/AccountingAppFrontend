import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPerson } from "../../store/PeopleSlice";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PeopleAddForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const jsonData = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
      };
      await dispatch(addPerson(jsonData));
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form className="mx-auto max-w-2xl border border-solid p-4" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>Ad</Form.Label>
        <Form.Control type="text" {...register("firstName")} placeholder="Ad" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Soyad</Form.Label>
        <Form.Control type="text" {...register("lastName")} placeholder="Soyad" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>Telefon Numarası</Form.Label>
        <Form.Control type="text" {...register("phoneNumber")} placeholder="Telefon numarası" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Kaydet
      </Button>
    </Form>
  );
};

export default PeopleAddForm;
