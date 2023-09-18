import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const PeopleForm = (props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });
  const { people, setPeople, setIsFormVisible } = props;

  const onSubmit = async (data) => {
    try {
      // JSON formatındaki veri oluşturuluyor
      const jsonData = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
      };

      // POST isteği gönderiliyor
      const response = await axios.post(
        "http://localhost:8000/api/person/kisiler",
        jsonData
      );

      console.log('Response from server:', response.data);
      const newPeople = [...people];

      // Yeni kişiyi kopyaya ekleyin
      newPeople.push(response.data);
  
      // setPeople ile güncel veriyi ayarlayın
      setPeople(newPeople);
      setIsFormVisible(false)
    } catch (error) {
      console.error('Error:', error);
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

export default PeopleForm;
