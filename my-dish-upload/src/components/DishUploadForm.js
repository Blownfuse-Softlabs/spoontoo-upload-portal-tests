import React, { useState } from 'react';
import InputField from './InputField';


const DishUploadForm = () => {
  const [formData, setFormData] = useState({
    brandID:6,
    food_name: '',
    food_desc: '',
    price: 0,
    course: '',
    currency: 'usd',
    dietary_classification: '',
    
    serving_size: '',
    spice_meter: 1,
    allergen: '',
    ingredients: '',
    calories: 0
  });
  const [file, setFile] = useState(null);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const submitForm = () => {
    document.getElementById("submitButton").value = "Uploading...";

    fetch("https://3wknjhpnq4.execute-api.us-east-1.amazonaws.com/spoontoo_sample/get_upload_url", {
      method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
      let presignedUrl = data.upload_url;
      let fileKey = data.file_key;

      let xhr = new XMLHttpRequest();
      xhr.open("PUT", presignedUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);

      xhr.onload = function () {
        if (xhr.status === 200) {
          let foodData = {
            brandID: formData.brandID,
            food_name: formData.food_name,
            food_desc: formData.food_desc,
            price: formData.price,
            course: formData.course,
            currency: formData.currency,
            dietary_classification: formData.dietary_classification,
            
            serving_size: formData.serving_size,
            spice_meter: formData.spice_meter,
            allergen: formData.allergen,
            ingredients: formData.ingredients,
            calories: formData.calories,
            file_key: fileKey
          };

          fetch("https://3wknjhpnq4.execute-api.us-east-1.amazonaws.com/spoontoo_sample/dish", {
            method: "POST",
            body: JSON.stringify(foodData),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            if (response.ok) {
              console.log("Data successfully sent to Lambda function");
              document.getElementById("uploadStatus").innerText = "Upload Successful";
              document.getElementById("submitButton").value = "Submit";
            } else {
              console.log("Error sending data to Lambda function");
            }
          });
        }
      };
    });
  };

  return (
    <form 
        className="flex flex-col w-full max-w-3xl m-2"
       onSubmit={(e) => { e.preventDefault(); submitForm(); }}>

  <InputField label="Brand ID" type="number" name="brandID" handleChange={handleChange} />
  <InputField label="Food Name" type="text" name="food_name" handleChange={handleChange} />
  <InputField label="Food Description" type="text" name="food_desc" handleChange={handleChange} />
  <InputField label="Price" type="number" name="price" handleChange={handleChange} />
  <InputField label="Course" type="text" name="course" handleChange={handleChange} />
  <InputField label="Currency" type="text" name="currency" handleChange={handleChange} />
  <InputField label="Dietary Classification" type="text" name="dietary_classification" handleChange={handleChange} />
  
  <InputField label="Serving Size" type="text" name="serving_size" handleChange={handleChange} />
  <InputField label="Spice Meter" type="text" name="spice_meter" handleChange={handleChange} />
  <InputField label="Allergen" type="text" name="allergen" handleChange={handleChange} />
  <InputField label="Ingredients" type="text" name="ingredients" handleChange={handleChange} />
  <InputField label="Calories" type="number" name="calories" handleChange={handleChange} />


    <label htmlFor="file">Video File:</label>
    <input type="file" id="file" name="file" onChange={handleFileChange} />

    <input type="submit" id="submitButton" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />

    <div id="uploadStatus"></div>
  </form>
  );
};

export default DishUploadForm;
