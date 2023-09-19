import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPerson} from "../../store/PeopleSlice";

const PeopleAddForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form alanları buraya eklenecek */}
        <input type="text" {...register("firstName")} placeholder="Ad" />
        <input type="text" {...register("lastName")} placeholder="Soyad" />
        <input
          type="text"
          {...register("phoneNumber")}
          placeholder="Telefon numarası"
        />

        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
};

export default PeopleAddForm;
