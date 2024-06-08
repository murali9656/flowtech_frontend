import React, { useState, useEffect } from 'react';
import './enqiryview.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function Enquiryview() {

  const { id } = useParams();
  const [data, setData] = useState({enquiury_owner:"",company_name:"",contact_person:"",gst:"",contact_email:"",contact_number:"",state:"",city:"",enquiry_source:"",enquiry_status:"",sector:"",stage:"",expected_order:"",remarks:"",enquiryreferncenumber:""});
  const [product,setProduct]=useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/enquiry/${id}`)
      .then((res) => {
        setData({
          enquiury_owner: res.data[0].enquiury_owner,
          company_name: res.data[0].company_name,
          contact_person: res.data[0].contact_person,
          gst: res.data[0].gst,
          contact_email: res.data[0].contact_email,
          contact_number: res.data[0].contact_number,
          state: res.data[0].state,
          city: res.data[0].city,
          enquiry_source: res.data[0].enquiry_source,
          enquiry_status: res.data[0].enquiry_status,
          sector: res.data[0].sector,
          stage: res.data[0].stage,
          expected_order: res.data[0].expected_order,
          remarks: res.data[0].remarks,
          enquiryreferncenumber: res.data[0].ern
        });
        setProduct(res.data[0].products);
        console.log(res.data);
      })
      .catch(err => {
        Swal.fire({
          title: "No Internet?",
          text: "There is an error with the internal server",
          icon: "question"
        });
        console.log(err);
      });
  }, [id]);
  

  

  return (
    <section>
      <div class="container">
    <div class="invoice-header">
        <img src="https://flowtechfluid.in/cmoon/img/logo.png" alt="FlowTech Logo"/><hr/>
        <h2>Enquiry Invoice</h2>
    </div>
    <div class="invoice-details">
        <table>
            <tr>
                <th>Enquiry Owner:</th>
                <td>{data.enquiury_owner}</td>
            </tr>
            <tr>
                <th>Company Name:</th>
                <td>{data.company_name}</td>
            </tr>
            <tr>
                <th>GST:</th>
                <td>{data.gst}</td>
            </tr>
            <tr>
                <th>Contact Person:</th>
                <td>{data.contact_person}</td>
            </tr>
            <tr>
                <th>Contact Email:</th>
                <td>{data.contact_email}</td>
            </tr>
            <tr>
                <th>Contact Number:</th>
                <td>{data.contact_number}</td>
            </tr>
            <tr>
                <th>State:</th>
                <td>{data.state}</td>
            </tr>
            <tr>
                <th>City:</th>
                <td>{data.city}</td>
            </tr>
            <tr>
                <th>Source:</th>
                <td>{data.enquiry_source}</td>
            </tr>
            <tr>
                <th>Status:</th>
                <td>{data.enquiry_status}</td>
            </tr>
            <tr>
                <th>Sector:</th>
                <td>{data.sector}</td>
            </tr>
            <tr>
                <th>Stage:</th>
                <td>{data.stage}</td>
            </tr>
            <tr>
                <th>Expected Date:</th>
                <td>{data.expected_order}</td>
            </tr>
            <tr>
                <th>Remarks:</th>
                <td>{data.remarks}</td>
            </tr>
            <tr>
                <th>Enquiry Reference Number:</th>
                <td>{data.enquiryreferncenumber}</td>
            </tr>
        </table>
    </div>
    <div class="invoice-products">
        <h3>Products & Quantities</h3>
        <table>
            <tr>
                <th>Products</th> 
                <th>Quantities</th>
            </tr>
        {product.map((item, index) => (
  <tr key={index}>
    <td>{item.product}</td>
    <td>{item.quantity}</td>
  </tr>
))}

            
        </table>
    </div>
    <div class="invoice-footer">
        <p>Thank you for your enquiry.</p>
        <button class="print-btn" onclick="window.print()">Print</button>
    </div>
</div>
    </section>
  )
}
