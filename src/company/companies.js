import React, { useEffect, useState } from 'react';
import './companies.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Addcompany from '../company/addcompany';
import Swal from 'sweetalert2';

export default function Companies() {

  const [data,setData]=useState([]);
  const [search,setSearch]=useState("");


  useEffect(()=>{
    axios.get("http://localhost:8000/getcompanies").then(res=>{
        setData(res.data);
        console.log(res.data);
    })
  },[]);


  const delbtn=(id)=>{


    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`http://localhost:8000/company/${id}`).then((res)=>{
        if(res.status===200){
          Swal.fire({
            title: "Deleted!",
            text: res.data,
            icon: "success"
          });
          window.location.reload();  
        }
        else if(res.status===400){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }).catch((err)=>{
        Swal.fire({
          title: "The Internet?",
          text: err,
          icon: "question"
        });
      })
        
      }
    });

   
  }

  return (
    <section><div>
        <div id="companies_maindiv">
      <h4 id="companies_h4">Companies</h4>
      <Addcompany/>
      <input type='text' name="search" placeholder=' Search for a Company....' id="companies_search"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <table id="company_table">
        <thead>
            <tr className='company_row'>
                <th>Id</th>
                <th>Company name</th>
                <th>GST</th>
                <th>Employee name</th>
                <th>Contact Number</th>
                <th>Contact Email</th>
                <th>State</th>
                <th>City</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {data.filter(data=>data.company_name.toLowerCase().includes(search.toLowerCase())).map((item)=><>
            <tr className='company_row'>
                <td>{item.id}</td>
                <td>{item.company_name}</td>
                <td>{item.gst}</td>
                <td>{item.contact_personame}</td>
                <td>{item.contact_number}</td>
                <td>{item.contact_email}</td>
                <td>{item.state}</td>
                <td>{item.city}</td>
                <td><Link to={`/companyedit/${item.id}`}><button className='company_edit_btn'>&#x1F58B;</button></Link></td>
                <td><button className='company_edit_del' onClick={()=>{delbtn(item.id)}}>&#x1F5D1;</button></td>
            </tr>
            </>)}
        </tbody>
      </table>
      {data.filter(data=>data.company_name.toLowerCase().includes(search.toLowerCase())).map((item)=><>
          <div id="company_grid">
        <label>Id :</label> <span id="spanid">{item.id}</span><br/>
        <label>Company name :</label> <span>{item.company_name}</span><br/>
        <label>GST :</label> <span id="spangst">{item.gst}</span><br/>
        <label>Employee_name :</label> <span>{item.contact_personame}</span><br/>
        <label>contact number :</label> <span>{item.contact_number}</span><br/>
        <label>contact email :</label> <span id="spanemail">{item.contact_email}t</span><br/>
        <label>Edit :</label> <span><Link to={`/companyedit/${item.id}`}><button className='company_edit_btn2'>&#x1F58B;</button></Link></span><br/>
        <label>Delete :</label> <span><button className='company_edit_del2' onClick={()=>{delbtn(item.id)}}>&#x1F5D1;</button></span>
          </div>
          </>)}
      </div>
    </section>
    
  )
}
