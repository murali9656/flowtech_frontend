import React, { useEffect, useState } from 'react';
import './addnewenquiry.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Addnquiryedit() {
 
  const [database,setDatabase]=useState({owner:"",company:"",gst:"",person:"",email:"",number:"",state:"",city:"",source:"",sector:"",stage:"",date:"",remarks:"",documents:""})
  const [products,setProducts]=useState([]);
  const [status,setStatus]=useState('');
  const { id } = useParams();
  const usenav=useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/enquiry/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.length > 0) {
          const responseData = res.data[0]; // Assuming the response is an array with at least one element
          setDatabase({
            owner: responseData.enquiury_owner,
            company: responseData.company_name,
            gst: responseData.gst,
            person: responseData.contact_person,
            email: responseData.contact_email,
            number: responseData.contact_number,
            state: responseData.state,
            city: responseData.city,
            source: responseData.enquiry_source,
            sector: responseData.sector,
            stage: responseData.stage,
            date: responseData.expected_order,
            remarks: responseData.remarks,
            documents: responseData.documents
          });
          setProducts(responseData.products || []); // Ensure products is an array
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);;


  const handleSelectChange = (event) => {
    setStatus(event.target.value);

  };


  const submithandler = (event) => {
    event.preventDefault();
  
    const details = {
      enquiury_owner: database.owner,
      company_name: database.company,
      gst: database.gst,
      contact_person: database.person,
      contact_email: database.email,
      contact_number: database.number,
      state: database.state,
      city: database.city,
      enquiry_source: database.source,
      sector: database.sector,
      stage: database.stage,
      expected_order: database.date,
      remarks: database.remarks,
      status: status
    };
  
   axios.post(`http://localhost:8000/enquiry/${id}`,details).then((res)=>{
   if(res.data==="updated"){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        usenav('/enquiry');
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
   }
   else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
   }
   })
  }
  





  
  
  return (
    <section>
        <div>
          <p id="add_enquiry_header">Add New Enquiry</p>
            <div id="addnew_enquiry_div">
              <form method='post' onSubmit={submithandler}>
             <label className='addenquiry_label'>Enquiry Owner</label> <input type='text' className="addenquiry_inputs" name='enqruirowner' value={database.owner} required/><br/><br/>
             <label className='addenquiry_label'>Account Name</label> <input type='text' name="company_name" value={database.company} className='addenquiry_inputs'/>
              {/* <Select 
                                                                          isSearchable
                                                                        className="addenquiry_inputs"
                                                                          options={companies}
                                                                          placeholder="Search for your company_name..."
                                                                          onChange={handleforcompany}
                                                                          required
                                                                              /> <br/> */}<br/>
             
             <label className='addenquiry_label'>Contact Person</label> <input type='text' name="contac_person" value={database.person} className="addenquiry_inputs_person"/>  <br/>
               <label className='addenquiry_label'>GST</label>   <input type='text' className="addenquiry_inputs_gst" name="gst" value={database.gst} placeholder='Your GST will automatically fill' required/><br/>
               <label className='addenquiry_label'>Contact Number</label>  <input type='text' className="addenquiry_inputs_contact_number" name="contactnumber" value={database.number} placeholder='Your Contact Number will automatically fill' required/><br/>
               <label className='addenquiry_label'>Contact Email</label>  &emsp;&nbsp;<input type='email' className="addenquiry_inputs_contact_number" name="contactemail" value={database.email} placeholder='Your Contact email will automatically fill' required/><br/> 
               <label className='addenquiry_label'>State</label> <input type="text" name="state"  className="addenquiry_inputs_state" value={database.state} /><br/> 
               <label className='addenquiry_label'>City</label>  <input type='tetx' name='city' className="addenquiry_inputs_city" value={database.city}/><br/>
               <label className='addenquiry_label'>Enquiry Source</label> <input type='tetx' name='source' value={database.source} className="addenquiry_inputs_enquiry_source"/><br/> 
               <label className='addenquiry_label'>Sector</label>  <input type='text' className="addenquiry_inputs_sector" name="sector" value={database.sector} placeholder='Enter Your sector' required/><br/>
               <label className='addenquiry_label'>Stage</label>  <input type="text" name='stage' value={database.stage} className="addenquiry_inputs_stage"/><br/>
               <label className='addenquiry_label'>Status</label> <select className="addenquiry_inputs_stage" value={status} onChange={handleSelectChange}>
                                                                          <option value={"undefined"}>Select</option>
                                                                          <option value={"pending"}>Pending</option>
                                                                          <option value={"accepted"}>accepted</option>
                                                                          <option value={"completed"}>complete</option>
                                                                          <option value={"rejected"}>rejected</option></select><br/>
                <label className='addenquiry_label'>Products  : </label><br/>
                  <table id="enquiry_table1">
                    <thead><tr className='add_enquiry_row'>
                               <th className='add_enquiry_row'>Product</th>
                               <th className='add_enquiry_row'>Quantity</th></tr></thead>
                               <tbody>
  {products.map((item, index) => (
    <tr key={index} className='add_enquiry_row'>
      <td className='add_enquiry_row'>
        <input type='text' name="product" value={item.product} placeholder='products' className="product_add_input"/>
      </td>
      <td className='add_enquiry_row'>
        <input type='text' name='quantity' value={item.quantity} placeholder='Enter Your Quantity here..' className="product_add_input"/>
      </td>
    </tr>
  ))}
</tbody></table> <br/>
                <label className='addenquiry_label'>Expected Order</label>  <input type='text' className="addenquiry_inputs_date" value={database.date} name="date" required/><br/> 
                <label className='addenquiry_label'>Remarks</label>     <input type='text' className="addenquiry_inputs_remarks" name="remarks" value={database.remarks} placeholder='Remarks If Any'/><br/>
                
                <div id="inputdiv1"><br/>
               
                <label for="actual-btn" id="file_label">+ Choose File</label> <input type="file" name="csvFile" id="actual-btn1"  accept=".csv" hidden/><br/><hr/>
    
        <span id="csvspan1">&#8645; Upload If You Have Any Tecnical Documents</span></div><br/>
                <input type='submit' id="add-enquiry-submit-btn"/>                                                                                                                                                                                                                          
               </form>                                                                                                                   
            </div>          
        </div>
    </section>
  )
}
