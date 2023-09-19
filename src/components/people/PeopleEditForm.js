import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPerson, updatePerson } from "../../store/PeopleSlice";

const PeopleEditForm = ({ editedPerson, setIsEditing}) => {
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
      // Gelen verileri kontrol et
      if (!data.firstName || !data.lastName || !data.phoneNumber) {
        throw new Error("Tüm alanları doldurmalısınız."); // Eksik veriler için bir hata fırlat
      }
  
      const jsonData = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
      };
      await dispatch(updatePerson({id: editedPerson.id, data: jsonData}));
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("firstName")} placeholder="Ad" />
        <input type="text" {...register("lastName")} placeholder="Soyad" />
        <input
          type="text"
          {...register("phoneNumber")}
          placeholder="Telefon numarası"
        />

        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default PeopleEditForm;
