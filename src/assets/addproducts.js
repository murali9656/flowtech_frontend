import React, { useState } from 'react';
import './addproducts.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Addproducts() {
  const [file, setFile] = useState(null);
  const [selectedStockPoint, setSelectedStockPoint] = useState('Pedagantyada');

  const usenav=useNavigate();

  const handleStockPointChange = (event) => {
    setSelectedStockPoint(event.target.value);
    console.log(selectedStockPoint)
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please choose a file.');
      return;
    }
    if(selectedStockPoint==="Pedagantyada"){
    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const response = await fetch('http://localhost:8000/upload', { // Change port to 8000
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Stocks Update At Pedagantyada Stock Point",
          showConfirmButton: false,
          timer: 1500,
          background:"black",
          color:"white"
        });
        usenav('/products');

      } else {
        Swal.fire({
          title: "Error uploading file.",
          text: "Error uploading file. Please try again later.",
          icon: "warning"
        });
      
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Swal.fire({
        title: "Error uploading file.",
        text: "Error uploading file. Please try again later.",
        icon: "warning"
      });
    }
  }
  else if(selectedStockPoint==="Seethammadhara"){
    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const response = await fetch('http://localhost:8000/Seethammadhara', { // Change port to 8000
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Stocks Update At Seethammadhara Stock Point",
          showConfirmButton: false,
          timer: 1500,
          background:"black",
          color:"white"
        });
        usenav('/products');

      } else {
        Swal.fire({
          title: "Error uploading file.",
          text: "Error uploading file. Please try again later.",
          icon: "warning"
        });
      }
    } catch (error) {
   
      Swal.fire({
        title: "Error uploading file.",
        text: "Error uploading file. Please try again later.",
        icon: "warning"
      });
    }
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
  };

  return (
    <section>
      <div>
        <div id="div_for_stockpoint">
          <h4 id="stockpoint_h4">Select Stock-Point</h4><hr/>
  <label class="radio-container"> Pedagantyada
  <input type="radio" name="radio"  checked={selectedStockPoint === 'Pedagantyada'} value="Pedagantyada" onChange={handleStockPointChange}/>
  <span class="checkmark"></span>
</label>

<label class="radio-container"> Seethammadhara
  <input type="radio" name="radio" checked={selectedStockPoint === 'Seethammadhara'} value="Seethammadhara" onChange={handleStockPointChange}/>
  <span class="checkmark"></span>
</label>
           </div>
        <div id="csvdiv">
          <h2 id="csvh2"><Link to="/products" id="csvarrow">&larr;</Link> CSV File</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div id="inputdiv">
              <br/><label htmlFor="actual-btn" className='addproducts_label'>+ Choose File</label>
              <input type="file" name="csvFile" id="actual-btn" accept=".csv" onChange={handleFileChange} hidden/><br/><hr/>
              <br/><br/>
              <span id="csvspan">&#8645; choose file or drop files here</span>
            </div><br/>
            <button type="submit" id="csvbtn">Upload</button><span id="csvarrow2">&#10138;</span>
          </form>
        </div>
      </div>
    </section>
  );
}
