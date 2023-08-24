import React, { useState } from 'react';


const DishUploadForm = () => {
  const [formData, setFormData] = useState({
    food_name: '',
    food_desc: '',
    price: '',
    course: '',
    currency: '',
    dietary_classification: '',
    discounted_price: '',
    discount_percent: '',
    serving_size: '',
    spice_meter: '',
    allergen: '',
    ingredients: '',
    calories: ''
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
            food_name: formData.food_name,
            food_desc: formData.food_desc,
            price: formData.price,
            course: formData.course,
            currency: formData.currency,
            dietary_classification: formData.dietary_classification,
            discounted_price: formData.discounted_price,
            discount_percent: formData.discount_percent,
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
    <label className='text-red-900' htmlFor="food_name">Food Name 2:</label>
    <input type="text" id="food_name" name="food_name" onChange={handleChange} />

    <label htmlFor="food_desc">Food Description:</label>
    <input type="text" id="food_desc" name="food_desc" onChange={handleChange} />

    <label htmlFor="price">Price:</label>
    <input type="number" id="price" name="price" onChange={handleChange} />

    <label htmlFor="course">Course:</label>
    <input type="text" id="course" name="course" onChange={handleChange} />

    <label htmlFor="currency">Currency:</label>
    <input type="text" id="currency" name="currency" onChange={handleChange} />

    <label htmlFor="dietary_classification">Dietary Classification:</label>
    <input type="text" id="dietary_classification" name="dietary_classification" onChange={handleChange} />

    <label htmlFor="discounted_price">Discounted Price:</label>
    <input type="text" id="discounted_price" name="discounted_price" onChange={handleChange} />

    <label htmlFor="discount_percent">Discount Percent:</label>
    <input type="text" id="discount_percent" name="discount_percent" onChange={handleChange} />

    <label htmlFor="serving_size">Serving Size:</label>
    <input type="text" id="serving_size" name="serving_size" onChange={handleChange} />

    <label htmlFor="spice_meter">Spice Meter:</label>
    <input type="text" id="spice_meter" name="spice_meter" onChange={handleChange} />

    <label htmlFor="allergen">Allergen:</label>
    <input type="text" id="allergen" name="allergen" onChange={handleChange} />

    <label htmlFor="ingredients">Ingredients:</label>
    <input type="text" id="ingredients" name="ingredients" onChange={handleChange} />

    <label htmlFor="calories">Calories:</label>
    <input type="text" id="calories" name="calories" onChange={handleChange} />

    <label htmlFor="file">Video File:</label>
    <input type="file" id="file" name="file" onChange={handleFileChange} />

    <input type="submit" id="submitButton" value="Submit" />
    <div id="uploadStatus"></div>
  </form>
  );
};

export default DishUploadForm;
