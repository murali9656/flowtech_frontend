import React, { useEffect, useState } from 'react';
import './compnayedit.css';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Companyedit() {
    const { id } = useParams();
    const [data, setData] = useState({ company: "", gst: "", person: "", email: "", number: "" });
    const [input, setInput] = useState({ company: "", gst: "", person: "", email: "", number: "" });

    useEffect(() => {
        axios.get(`http://localhost:8000/usercompanyedit/${id}`).then(res => {
            if (res.status === 200) {
                setData({
                    company: res.data[0].company_name,
                    gst: res.data[0].gst,
                    person: res.data[0].contact_personame,
                    email: res.data[0].contact_email,
                    number: res.data[0].contact_number
                });
                setInput({
                    company: res.data[0].company_name,
                    gst: res.data[0].gst,
                    person: res.data[0].contact_personame,
                    email: res.data[0].contact_email,
                    number: res.data[0].contact_number
                });
            } else if (res.status === 500) {
                Swal.fire({
                    title: "The Internet?",
                    text: res.data,
                    icon: "question"
                });
            }

        }).catch((err) => {
            Swal.fire({
                title: "The Internet?",
                text: err,
                icon: "question"
            });
        })
    }, [id]);

    const handler = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
        console.log(data)
       
    }

    const submitHandler=()=>{
      const details=({company:input.company,gst:input.gst,person:input.person,email:input.email,number:input.number});

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
    
          axios.post(`http://localhost:8000/company/${id}`,details).then((res)=>{
            if(res.status===200){
              Swal.fire({text:res.data,
                         icon:"success"})
                         window.history.back();         
            }
          }).catch((err)=>{
            Swal.fire({
              title: "The Internet?",
              text: err,
              icon: "question"
          });
          })
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }

    return (
        <section>
            <div id="maindiv-for-comapnyedit">
                <div id="companyedit-label-div">
                    <label>Company Name : </label>
                    <label>GST : </label>
                    <label>Contact Person : </label>
                    <label>Contact Email :</label>
                    <label>contact Number : </label>
                </div>
                <div id="companyedit-input-div">
                    <input type='text' name='company' value={input.company} onChange={handler} className='companyedit-input' required />
                    <input type='text' name='gst' value={input.gst} onChange={handler} className='companyedit-input' required />
                    <input type='text' name="person" value={input.person} onChange={handler} className='companyedit-input' required />
                    <input type='email' name='email' value={input.email} onChange={handler} className='companyedit-input' required />
                    <input type='number' name="number" value={input.number} onChange={handler} className='companyedit-input' required />
                </div><br />
                <button id="companyedit-btn" onClick={submitHandler}>Update</button>
            </div>
        </section>

    )
}
