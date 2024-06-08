import React, { useEffect, useState } from 'react';
import './enquiry.css';
import Adminenquiryversions from './adminenquiryversions';
import { Link } from 'react-router-dom';
import axios  from 'axios';
import Swal from 'sweetalert2';

export default function Enquiry() {

   const [toggle,setToggle]=useState(1);
   const [data,setData]=useState([]);
   const [search,setSearch]=useState("");

   

   const updateTab=(id)=>{
    setToggle(id);
   }

   useEffect((e)=>{
    axios.get("http://localhost:8000/enquiry").then((res)=>{
      setData(res.data);
      // console.log(res.data);
    }).catch(err=>{
      Swal.fire({
        title: "No Internet?",
        text: "Their is Error with Internal Server",
        icon: "question"
      });
      console.log(err)
    })
   },[]);


   const delbtn = (id) => {
    const vid=id;
    axios.delete(`http://localhost:8000/enquiry/${vid}`)
      .then((res) => {
        if(res.status===200){
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data,
            showConfirmButton: true,
            timer: 1500
          });
          window.location.reload();
        }
        else if(res.status===400){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
         
          });
        }
        else{
          Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "question"
          });
        }
      })
      .catch((Err) => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });  
      });
  };
  


   const getStatusColor = (status) => {
    switch (status) {
        case 'rejected':
            return 'red';
        case 'accepted':
            return 'blue';
        case 'pending':
            return 'yellow';
        case 'completed':
               return 'green'
        default:
            return 'black'; // Default color if status doesn't match any case
    }
};


  return (
    <section>
    <div>
        <div id="enquiry_maindiv">
      <ul id="enquiry_tab_ul">
      <li className='enquiry_tab_li' onClick={()=>updateTab(1)}>{toggle===1?<span className="open-enquiry">&#10004;Enquiry</span>:<span className="close-enquiry">Enquiry</span>}</li>
        <li  className='enquiry_tab_li' onClick={()=>updateTab(2)}>{toggle===2?<span className="open-enquiry">&#10004;Enquiry-Versions</span>:<span className="close-enquiry">Enquiry-Version</span>}</li>
      </ul><hr/>
      <div className={toggle===1 ? "show_div":"hide_div"}>
          <Link to="/addnewenquiry"><button id="add_enquiry_button"> + Add New Enquiry</button></Link>
          <input type='text' placeholder='Search With Refernce Number' id="enquiry_search_bar" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <table id="enquiry_table">
        <thead>
            <th className='enquiry_th'>Sl.No</th>
            <th className='enquiry_th'>Refernce Number</th>
            <th className='enquiry_th'>Enquiry Owner</th>
            <th className='enquiry_th'>Company Name</th>
            <th className='enquiry_th'>Gst</th>
            <th className='enquiry_th'>contact person</th>
            <th className='enquiry_th'>contact email</th>
            <th className='enquiry_th'>contact number</th>
            <th className='enquiry_th'>state</th>
            <th className='enquiry_th'>city</th>
            <th className='enquiry_th'>stage</th>
            <th className='enquiry_th'>sector</th>
            <th className='enquiry_th'>enquiry source</th>
            <th className='enquiry_th'>Enquiry Status</th>
            <th className='enquiry_th'>products</th>
            <th className='enquiry_th'>order expected</th>
            <th className='enquiry_th'>documents</th>
            <th className='enquiry_th'>remarks</th>
            <th className='enquiry_th'>Actons</th></thead>
            
            <tbody>
            {data.filter(item => item.ern.toLowerCase().includes(search.toLowerCase())).map((item) => (
  <tr key={item.id}>
    <td className='enquiry_td'>{item.id}</td>
    <td className='enquiry_td'>{item.ern}</td>
    <td className='enquiry_td'>{item.enquiury_owner}</td>
    <td className='enquiry_td'>{item.company_name}</td>
    <td className='enquiry_td'>{item.gst}</td>
    <td className='enquiry_td'>{item.contact_person}</td>
    <td className='enquiry_td'>{item.contact_email}</td>
    <td className='enquiry_td'>{item.contact_number}</td>
    <td className='enquiry_td'>{item.state}</td>
    <td className='enquiry_td'>{item.city}</td>
    <td className='enquiry_td'>{item.stage}</td>
    <td className='enquiry_td'>{item.sector}</td>
    <td className='enquiry_td'>{item.enquiry_source}</td>
    <td className='enquiry_td' style={{ color: getStatusColor(item.enquiry_status), fontWeight:"bold" }}>{item.enquiry_status}</td>
    <td className='enquiry_td'>
       <details>
       <table className="table table-bordered">
         <thead>
           <tr>
             <th>Product</th>
             <th>Quantity</th>
           </tr>
         </thead>
         <tbody>
           {item.products.map((product, index) => (
             <tr key={index}>
               <td>{product.product}</td>
               <td>{product.quantity}</td>
             </tr>
           ))}
         </tbody>
       </table>
       </details>
     </td>
   
    <td className='enquiry_td'>{item.expected_order}</td>
    <td className='enquiry_td'>{item.documents}</td>
    <td className='enquiry_td'>{item.remarks}</td>
    <td className='enquiry_td'>
      <div className='buttons_div'>
        <Link to={`/adminenquiryedit/${item.id}`}>
          <button className='enquiry_edit_btn' title='Edit'> &#x1F58B;</button>
        </Link>
        <Link to={`/enquiryview/${item.id}`}>
          <button className='enquiry_view_btn' title='View'>&#x1F441; </button>
        </Link>
        <Link to={`/adminupdate/${item.ern}`}>
          <button className='enquiry_update_btn' title='Update'>&#8693;</button>
        </Link>
        <button className='enquiry_delete_btn' onClick={() => delbtn(item.ern)} title='Delete'> &#x1F5D1;</button>
      </div>
    </td>
  </tr>
))}

        </tbody>
    </table>
    {data.filter(data=>data.ern.toLowerCase().includes(search.toLowerCase())).map((item)=><>
    
     <div id="Enquiry_grid_div">

    <label className='enquriy_label'>id</label> &emsp; <span className='enquiry_span'>{item.id}</span><br/>
    <label  className='enquriy_label'>Refernce Number</label> &emsp; <span className='enquiry_span'>{item.ern}</span><br/>
    <label  className='enquriy_label'>Enquiry Owner</label> &emsp; <span className='enquiry_span'>{item.enquiury_owner}</span><br/>
    <label  className='enquriy_label'>Company Name</label> &emsp; <span className='enquiry_span'>{item.company_name}</span><br/>
    <label  className='enquriy_label'>Gst</label> &emsp; <span className='enquiry_span'>{item.gst}</span><br/>
    <label  className='enquriy_label'>contact Person</label> &emsp; <span className='enquiry_span'>{item.contact_person}</span><br/>
    <label  className='enquriy_label'>contact Email</label> &emsp; <span className='enquiry_span'>{item.contact_email}</span><br/>
    <label  className='enquriy_label'>Contact Number</label> &emsp; <span className='enquiry_span'>{item.contact_number}</span><br/>
    <label  className='enquriy_label'>State</label> &emsp; <span className='enquiry_span'>{item.state}</span><br/>
    <label  className='enquriy_label'>City</label> &emsp; <span className='enquiry_span'>{item.city}</span><br/>
    <label  className='enquriy_label'>Stage</label> &emsp; <span className='enquiry_span'>{item.stage}</span><br/>
    <label  className='enquriy_label'>Sector</label> &emsp; <span className='enquiry_span'>{item.sector}</span><br/>
    <label  className='enquriy_label'>Enquiry Source</label> &emsp; <span className='enquiry_span'>{item.enquiry_source}</span><br/>
    <label  className='enquriy_label'>Enquiry Status</label> &emsp; <span className='enquiry_span' style={{ color: getStatusColor(item.enquiry_status), fontWeight:"bold" }}>{item.enquiry_status}</span><br/>
    <label  className='enquriy_label'>Products</label> &emsp; <span className='enquiry_span'>no documents</span><br/>
    <label  className='enquriy_label'>Quantity</label> &emsp; <span className='enquiry_span'>no remarks</span><br/>
    <label  className='enquriy_label'>Order Expected</label> &emsp; <span className='enquiry_span'>{item.expected_order}</span><br/>
    <label  className='enquriy_label'>Documents</label> &emsp; <span className='enquiry_span'>{item.documents}</span><br/>
    <label  className='enquriy_label'>Remarks</label> &emsp; <span className='enquiry_span'>{item.remarks}</span><br/>
    <label  className='enquriy_label'>Actions</label> &emsp; <span className='enquiry_span'><Link to={`/enquiryedit/${item.id}`}><button className='enquiry_edit_btn'> &#x1F58B;Edit</button></Link>
                                       <Link to={`/enquiryview/${item.id}`}><button className='enquiry_view_btn'>&#x1F441; View</button></Link>
                                       <button className='enquiry_delete_btn'> &#x1F5D1; Delete</button></span><br/>
    


     </div>
     </>)}



      </div>
      <div className={toggle===2 ? "show_div":"hide_div"}><Adminenquiryversions/></div>
    </div>
    </div>
    </section>
  )
}
