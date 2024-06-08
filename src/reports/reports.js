import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './reports.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Reports() {

    const [data,setData]=useState([]);
    const [search,setSearch]=useState('');
    const usenav=useNavigate();


    const [selectedColumns, setSelectedColumns] = useState({
      ern: true,
      enquiryOwner: true,
      companyName: true,
      gst: true,
      contactPerson: true,
      contactEmail: true,
      contactNumber: true,
      state: true,
      city: true,
      products: true,
      quantity: true,
      source: true,
      status: true,
      sector: true,
      stage: true,
      orderExpectedDate: true,
      remarks: true,
      actions: true,
    })
    
   useEffect((e)=>{
    axios.get("http://localhost:8000/reports").then((res)=>{
      setData(res.data);
      console.log(res.data);
    }).catch(err=>{
      Swal.fire({
        title: "No Internet?",
        text: "Their is Error with Internal Server",
        icon: "question"
      });
      console.log(err)
    })
   },[]);


   const handleColumnChange = (column) => {
    setSelectedColumns({
      ...selectedColumns,
      [column]: !selectedColumns[column],
    });
  };

  const handlertonavigate=(e)=>{
    const ern=e.target.value;
    usenav('/updateslist', {state:ern})
    
  }
  return (
    <section>
      <div class="input-group">
              <input type="search" placeholder="Search with Enquiryrefernce Number" value={search} onChange={(e)=>setSearch(e.target.value)} aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div><br/>
            <div className="dropdown mb-3" id="grids-customize">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Customized Reports
        </button>
        <div className="dropdown-menu p-3" aria-labelledby="dropdownMenuButton">
          <div className="checkbox-container">
            {Object.keys(selectedColumns).map((column) => (
              <div key={column} className="checkbox-item form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={column}
                  checked={selectedColumns[column]}
                  onChange={() => handleColumnChange(column)}
                />
                <label className="form-check-label" htmlFor={column}>
                  {column}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
            <div className="table-container">
      {data.filter(item => item.ern.toLowerCase().includes(search.toLowerCase())).map((item) => (
        <div className="grid-item" key={item.ern}>
          {selectedColumns.ern &&<div className="item-header">Enquiry Reference Number:&emsp;<span style={{fontWeight:480}}>{item.ern}</span></div>}
          {selectedColumns.enquiryOwner &&<div className="item-header">Owner:&emsp;<span style={{fontWeight:480}}>{item.enquiury_owner}</span></div>}
          {selectedColumns.companyName &&<div className="item-header">Company Name:&emsp;<span style={{fontWeight:480}}>{item.company_name}</span></div>}
          {selectedColumns.gst &&<div className="item-header">GST:&emsp;<span style={{fontWeight:480}}>{item.gst}</span></div>}
          {selectedColumns.contactPerson && <div className="item-header">Contact Person:&emsp;<span style={{fontWeight:480}}>{item.contact_person}</span></div>}
          {selectedColumns.contactEmail && <div className="item-header">Contact Email:&emsp;<span style={{fontWeight:480}}>{item.contact_email}</span>  </div>}
          {selectedColumns.contactNumber &&<div className="item-header">Contact Number:&emsp;<span style={{fontWeight:480}}>{item.contact_number}</span></div>}
          {selectedColumns.state &&<div className="item-header">State:&emsp;<span style={{fontWeight:480}}>{item.state}</span></div>}
          {selectedColumns.city &&<div className="item-header">City:&emsp;<span style={{fontWeight:480}}>{item.city}</span></div>}
         

          {selectedColumns.products && selectedColumns.quantity &&<div className="item-header">Products:
          <span style={{fontWeight:480}}>
            {item.products.map((product, index) => (
              <div key={index}>
                <span>{product.product},</span>&emsp;
                <span>Quantity: {product.quantity}</span>
              </div>
            ))}
          </span>
          </div>}

          {selectedColumns.source &&<div className="item-header">Source:&emsp;<span style={{fontWeight:480}}>{item.enquiry_source}</span></div>}
          {selectedColumns.status &&<div className="item-header">Status:&emsp;<span style={{fontWeight:480}}>{item.enquiry_status}</span></div>}
          {selectedColumns.sector &&<div className="item-header">Sector:&emsp;<span style={{fontWeight:480}}>{item.sector}</span></div>}
          {selectedColumns.stage &&<div className="item-header">Stage:&emsp;<span style={{fontWeight:480}}>{item.stage}</span></div>}
          {selectedColumns.orderExpectedDate &&<div className="item-header">Order Expected Date&emsp;<span style={{fontWeight:480}}>{item.expected_order}</span></div>}
          {selectedColumns.remarks && <div className="item-header">Special Notes:&emsp;<span style={{fontWeight:480}}>Special Notes Here</span></div>}
          <div className="item-header">Update Date:&emsp;<span style={{fontWeight:480}}>22-05-2024</span></div>
          <div className="item-header">Updates:&emsp;<span style={{fontWeight:480}}><Link to=""><button id="view-update-button">&#x1F441; Update</button></Link></span></div>
         <div className="item-action">
           <Link to={`/reportview/${item.ern}`}><button id="reports-print-mobile">View</button></Link> 
          </div>
        </div>
      ))}
    </div>
    <div className="dropdown mb-3" id="table-customize">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Customized Reports
        </button>
        <div className="dropdown-menu p-3" aria-labelledby="dropdownMenuButton">
          <div className="checkbox-container">
            {Object.keys(selectedColumns).map((column) => (
              <div key={column} className="checkbox-item form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={column}
                  checked={selectedColumns[column]}
                  onChange={() => handleColumnChange(column)}
                />
                <label className="form-check-label" htmlFor={column}>
                  {column}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <table class="table">
  <thead>
  <tr>
              {selectedColumns.ern && <th scope="col">Enquiry Reference Number</th>}
              {selectedColumns.enquiryOwner && <th scope="col">Owner</th>}
              {selectedColumns.companyName && <th scope="col">Company Name</th>}
              {selectedColumns.gst && <th scope="col">GST</th>}
              {selectedColumns.contactPerson && <th scope="col">Contact Person</th>}
              {selectedColumns.contactEmail && <th scope="col">Contact Email</th>}
              {selectedColumns.contactNumber && <th scope="col">Contact Number</th>}
              {selectedColumns.state && <th scope="col">State</th>}
              {selectedColumns.city && <th scope="col">City</th>}
              {selectedColumns.products && selectedColumns.quantity &&<th scope="col" align='center'>Products</th>}
              {selectedColumns.source && <th scope="col">Source</th>}
              {selectedColumns.orderExpectedDate && <th scope="col">Order Expected Date</th>}
              {selectedColumns.status && <th scope="col">Status</th>}
              {selectedColumns.sector && <th scope="col">Sector</th>}
              {selectedColumns.stage && <th scope="col">Stage</th>}
              <th scope='col'>Updates Count</th>
              <th scope='col' style={{width:"30px"}}>Recent Update On</th>
              {selectedColumns.remarks && <th scope="col">Remarks</th>}
              {selectedColumns.actions && <th scope="col">Actions</th>}
            </tr>
  </thead>
  <tbody>
  {data.filter(item => item.ern.toLowerCase().includes(search.toLowerCase())).map((item) => (
   <tr>
   {selectedColumns.ern && <th scope='row'>{item.ern}</th>}
   {selectedColumns.enquiryOwner && <td>{item.enquiury_owner}</td>}
   {selectedColumns.companyName && <td>{item.company_name}</td>}
   {selectedColumns.gst && <td>{item.gst}</td>}
   {selectedColumns.contactPerson && <td>{item.contact_person}</td>}
   {selectedColumns.contactEmail && <td>{item.contact_email}</td>}
   {selectedColumns.contactNumber && <td>{item.contact_number}</td>}
   {selectedColumns.state && <td>{item.state}</td>}
   {selectedColumns.city && <td>{item.city}</td>}
   {selectedColumns.products && (
     <td>
       <details>
       <table className="table table-bordered">
         <thead>
           <tr>
             <th>Product</th>
             {selectedColumns.quantity && <th>Quantity</th>}
           </tr>
         </thead>
         <tbody>
           {item.products.map((product, index) => (
             <tr key={index}>
               <td>{product.product}</td>
               {selectedColumns.quantity && <td>{product.quantity}</td>}
             </tr>
           ))}
         </tbody>
       </table>
       </details>
     </td>
   )}
   {selectedColumns.source && <td>{item.enquiry_source}</td>}
   {selectedColumns.orderExpectedDate && <td>{item.expected_order}</td>}
   {selectedColumns.status && <td>{item.enquiry_status}</td>}
   {selectedColumns.sector && <td>{item.sector}</td>}
   {selectedColumns.stage && <td>{item.stage}</td>}
   <td>
  <button type="button" value={item.ern} class="btn btn-outline-info" onClick={handlertonavigate}>{item.row_count}</button>
</td>
   <td style={{width:"130px"}}>{item.last_update_date}</td>
   {selectedColumns.remarks && <td>{item.remarks}</td>}
   {selectedColumns.actions && (
     <td>
       <Link to={`/reportview/${item.ern}`}>
         <button type="button" id='reports-table-view'>
           View
         </button>
       </Link>
     </td>
   )}
 </tr>
  ))}
    
  </tbody>
</table>

         
          
     
    </section>
  );
}
