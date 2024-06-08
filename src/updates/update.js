
import React, { useEffect, useState } from 'react';
import './adminupdate.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Update() {
  const { ern } = useParams(); // Correctly extract 'ern' from URL

  const [data, setData] = useState({ date: "", update: "" });
  const [file, setFile] = useState(null);

  const [update,setUpdate]=useState([])

  const handler = (event) => {
    const { name, value } = event.target;

    setData(prevState => ({
      ...prevState, [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sumbithandler = () => {
    
    const formData = new FormData();
    const details = { referncenumber: ern, date: data.date, update: data.update };
    formData.append('details', JSON.stringify(details));
    formData.append('file', file);

    // console.log(formData);
    // console.log(details);

    axios.post('http://localhost:8000/update', formData).then(res => {
      console.log(res);
    }).catch((err)=>{
      console.log(err)
    });
  }

  useEffect(()=>{
    axios.get('http://localhost:8000/getupdates').then((res)=>{
      setUpdate(res.data)
      console.log(res.data)
      console.log(update)
    }).catch((err)=>{
      console.log(err)
    })
  },[update])


  
  
  return (
    <section>
        <div>
            <span id="au-span">Add New Enquiry Update</span>
        </div>
        <div id="au-form">
      <ul id="au-label-ul">
        <label className='au-label'>Enquiry Refrence Number: </label>
        <label className='au-label'>Date : </label>
        <label className='au-label'>Enter Your Update Here : </label>
        <label className='au-label-documents'>Documents : </label>
      </ul>
        </div>

        <div id="au-input-label">
             <input type='text' name='ern' value={ern} readOnly className='au-input'/>
             <input type='date' name="date" onChange={handler} placeholder='DD/MM/YYYY' className='au-input'/>
            <textarea rows="5" name="update" onChange={handler} cols="50" className='au-textarea'></textarea>
            <label for="images" class="drop-container" id="dropcontainer">
  <span class="drop-title">Drop files here</span>
  or
  <input type="file" id="images" onChange={handleFileChange} required/>
</label>
<button id="au-btn" onClick={sumbithandler}>submit</button>
        </div>

        <center>
          {update.map((item)=><>
                       <span>{item.date}</span><br/>
                       <span>{item.update}</span><br/>
                       <a href={`http://localhost:8000/documentuploads/${item.file}`} download target='blank'>download</a><br/>
                       <span></span>
                       </>)}
         
        </center>
       
    </section>
  )
}
