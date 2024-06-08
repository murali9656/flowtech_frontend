import React, { useEffect, useState } from 'react';
import './addnewenquiry.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';

export default function Userenquiryedit() {
 
  const [database,setDatabase]=useState({vid:"",uid:"",owner:"",company:"",gst:"",person:"",email:"",number:"",state:"",city:"",source:"",status:"",sector:"",stage:"",date:"",remarks:"",documents:"",enquiryreferncenumber:""});
  const [version,setVersion]=useState({vid:"",uid:"",owner:"",company:"",gst:"",person:"",email:"",number:"",state:"",city:"",source:"",status:"",sector:"",stage:"",date:"",remarks:"",documents:"",enquiryreferncenumber:""});
  const [existproducts,setExistproducts]=useState([]);
  const [products,setProducts]=useState([]);    //store products from database
  const [category,setProductscategory]=useState([]);  //store productscategory from database
  const [newproducts,setNewproducts]=useState([]);
  const [serialNumber, setSerialNumber] = useState(1);
  const { id } = useParams();
  const usenav=useNavigate();


  useEffect(() => {
    axios.get('http://localhost:8000/enquiryproductcategory')
      .then((res) => {
        // Filter out duplicate values using Set
        const uniqueCategories = [...new Set(res.data.map(item => item.value))];
        // Map the unique categories to the format expected by Select component
        const options = uniqueCategories.map(category => ({
          value: category,
          label: category
        }));
        setProductscategory(options);
      })
      .catch(error => {
        console.error('Error fetching product categories:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8000/enquiry/${id}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data && res.data.length > 0) {
          const responseData = res.data[0]; // Assuming the response is an array with at least one element
          setDatabase({
            vid:responseData.id,
            uid:responseData.user_id,
            owner: responseData.enquiury_owner,
            company: responseData.company_name,
            gst: responseData.gst,
            person: responseData.contact_person,
            email: responseData.contact_email,
            number: responseData.contact_number,
            state: responseData.state,
            city: responseData.city,
            source: responseData.enquiry_source,
            status: responseData.enquiry_status,
            sector: responseData.sector,
            stage: responseData.stage,
            date: responseData.expected_order,
            remarks: responseData.remarks,
            documents: responseData.documents,
            enquiryreferncenumber	: responseData.ern
          });
          setExistproducts(responseData.products || []); // Ensure products is an array
          setVersion({
            vid:responseData.id,
            uid:responseData.user_id,
            owner: responseData.enquiury_owner,
            company: responseData.company_name,
            gst: responseData.gst,
            person: responseData.contact_person,
            email: responseData.contact_email,
            number: responseData.contact_number,
            state: responseData.state,
            city: responseData.city,
            source: responseData.enquiry_source,
            status: responseData.enquiry_status,
            sector: responseData.sector,
            stage: responseData.stage,
            date: responseData.expected_order,
            remarks: responseData.remarks,
            documents: responseData.documents,
            enquiryreferncenumber	: responseData.ern
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      
  }, [id]);

  const handlerproduct = (selectedOptions) => {
    // Map over the array of selected options and extract their values
    const selectedValues = selectedOptions.map(option => ({ products: option.value,quantity:"" }));
    
    // Update the state using a functional update to ensure the latest state
    setNewproducts(selectedValues);
  
    // Log the updated state to see the correct state value
    console.log(newproducts);
  };

  const handlerproductcategory = (selectdcategory) => {
    // console.log(selectcategory.value)
    axios.get(`http://localhost:8000/enquiryproduct/${selectdcategory.value}`).then((res)=>{
    setProducts(res.data);    //api for getting products from database
   console.log(res.data)
  })
  
}

const handleQuantityChange = (event, index) => {
  const newSelectproduct = [...newproducts];
  newSelectproduct[index].quantity = event.target.value; // Update quantity for the corresponding entry
  newSelectproduct[index].totalprice=newSelectproduct[index].quantity * newSelectproduct[index].unitprice
  setNewproducts(newSelectproduct);
  console.log(newproducts);
};

const handleUnitPriceChange=(event,index)=>{
  const newSelectproduct=[...newproducts];
  newSelectproduct[index].unitprice=event.target.value;
  newSelectproduct[index].totalprice=newSelectproduct[index].quantity * newSelectproduct[index].unitprice;
  setNewproducts(newSelectproduct);
}

 

  const handler = (e) => {
    const { name, value } = e.target;
    setDatabase((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  


  const submithandler = (event) => {
    event.preventDefault(); // Corrected spelling for preventDefault()
   console.log(setSerialNumber);

  
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
      remarks: database.remarksc
    };

   Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
      axios.post(`http://localhost:8000/enquiry/${id}`,details).then((res)=>{
            if(res.data==="updated"){

                
              // Swal.fire("Saved!", "", "success");
               if(newproducts.length>0){

                const ordersData = newproducts.map(item => ({
                          product: item.products,
                          quantity: item.quantity,
                          unitprice:item.unitprice,
                          totalprice:item.totalprice,
                          referenceNumber: database.enquiryreferncenumber // Make sure to replace 'referenceNumber' with the actual reference number
                        }));

                        axios.post('http://localhost:8000/orders', ordersData)
                                .then((res) => {
                                  console.log(res.data);
                                  
                                })
                                .catch((error) => {
                                  console.error('Error making POST request:', error);
                                });


            
          const versionsdetails = {
            vid:version.vid+.1,
            uid:version.uid,
            enquiuryowner: version.owner,
            company_name: version.company,
            gst: version.gst,
            contact_person: version.person,
            contact_email: version.email,
            contact_number: version.number,
            state: version.state,
            city: version.city,
            enquiry_source: version.source,
            status:version.status,
            sector: version.sector,
            stage: version.stage,
            date: version.date,
            remarks: version.remarks,
            documents:version.documents,
            ern:version.enquiryreferncenumber,
            enquiryreferncenumber:version.enquiryreferncenumber
          };
         axios.post("http://localhost:8000/versions",versionsdetails).then((res)=>{
          console.log(res.data);
         }).catch((err)=>{ console.log(err)});
      
        
         const oldproducts = existproducts.map(item => ({
          product: item.product,
          quantity: item.quantity,
          unitprice:item.unitprice,
          totalprice:item.totalprice,
          vid:database.vid+.1,
          referenceNumber: version.enquiryreferncenumber // Make sure to replace 'referenceNumber' with the actual reference number
        }));
           

     axios.post('http://localhost:8000/versionproducts', oldproducts)
    .then((res) => {
      console.log(res.data);
      usenav('/userenquiry');
    })
    .catch((error) => {
      console.error('Error making POST request:', error);
    });


               } 
                 

              
            }
            
      }).catch((err)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
         
        });
      })
     

   
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});
  
}
  
  





  
  
  return (
    <section>
        <div>
          <p id="add_enquiry_header">Add New Enquiry</p>
            <div id="addnew_enquiry_div">
              <form method='post' onSubmit={submithandler}>
             <label className='addenquiry_label'>Enquiry Owner</label> <input type='text' className="addenquiry_inputs" name='enqruirowner' value={database.owner} required/><br/><br/>
             <label className='addenquiry_label'>Account Name</label> <input type='text' name="company" value={database.company} onChange={handler} className='addenquiry_inputs' required/><br/>
             
             <label className='addenquiry_label'>Contact Person</label> <input type='text' name="person" value={database.person} onChange={handler} className="addenquiry_inputs_person"/>  <br/>
               <label className='addenquiry_label'>GST</label>   <input type='text' className="addenquiry_inputs_gst" name="gst" value={database.gst} onChange={handler} placeholder='Your GST will automatically fill' required/><br/>
               <label className='addenquiry_label'>Contact Number</label>  <input type='text' className="addenquiry_inputs_contact_number" name="number" value={database.number} onChange={handler} placeholder='Your Contact Number will automatically fill' required/><br/>
               <label className='addenquiry_label'>Contact Email</label>  &emsp;&nbsp;<input type='email' className="addenquiry_inputs_contact_number" name="email" value={database.email} onChange={handler} placeholder='Your Contact email will automatically fill' required/><br/> 
               <label className='addenquiry_label'>State</label> &emsp;<input type="text" name="state"  className="addenquiry_inputs_state" value={database.state} onChange={handler} /><br/> 
               <label className='addenquiry_label'>City</label>  &nbsp;&nbsp;
               <input type='tetx' name='city' className="addenquiry_inputs_city" value={database.city} onChange={handler}/><br/>
               <label className='addenquiry_label'>Enquiry Source</label> <input type='tetx' name='source' value={database.source} onChange={handler} className="addenquiry_inputs_enquiry_source"/><br/> 
               <label className='addenquiry_label'>Sector</label>  <input type='text' className="addenquiry_inputs_sector" name="sector" value={database.sector} onChange={handler} placeholder='Enter Your sector' required/><br/>
               <label className='addenquiry_label'>Stage</label>  <input type="text" name='stage' value={database.stage} onChange={handler} className="addenquiry_inputs_stage"/><br/>
               <label className='addenquiry_label'>product category</label>   <Select 
                                                                          isSearchable
                                                                        className="addenquiry_inputs_product_category"
                                                                          options={category}
                                                                          placeholder="Search..."
                                                                          onChange={handlerproductcategory}
                                                                          name="products"
                                                                          
                                                                              /><br/>
                <label className='addenquiry_label'>Products  : </label> <Select 
                                                                          isSearchable
                                                                          isMulti
                                                                        className="addenquiry_inputs_products"
                                                                          options={products}
                                                                          placeholder="Search..."
                                                                          onChange={handlerproduct}
                                                                          name="products"
                                                                          
                                                                              /><br/>

<br/>
                  <table id="enquiry_table1">
        <thead>
          <tr className='add_enquiry_row'>
            <th className='add_enquiry_row'>Sl.no</th>
            <th className='add_enquiry_row'>Product</th>
            <th className='add_enquiry_row'>Quantity</th>
            <th className='add_enquiry_row'>Unit Price</th>
            <th className='add_enquiry_row'>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {newproducts.map((item, index) => (
            <tr key={index} className='add_enquiry_row'>
              <td className='add_enquiry_row'>{serialNumber + index}</td>
              <td className='add_enquiry_row'>
                <input type='text' name="product" value={item.products} placeholder='products' className="product_add_input" />
              </td>
              <td className='add_enquiry_row'>
                <input type='number' name='quantity' value={item.quantity} onChange={(event) => handleQuantityChange(event, index)} placeholder='Enter Your Quantity here..' className="product_add_input" />
              </td>
              <td className='add_enquiry_row'>
                <input type='text' name="unitprice" value={item.unitprice} placeholder='Unit price' onChange={(event)=>handleUnitPriceChange(event,index)} className="product_add_input" />
              </td>
              <td className='add_enquiry_row'>
                <input type='text' name="totalprice" value={item.totalprice} placeholder='Total Price' className="product_add_input" />
              </td>
            </tr>
          ))}
        </tbody>
      </table> <br/>
                  <table id="enquiry_table1">
        <thead>
          <tr className='add_enquiry_row'>
            <th className='add_enquiry_row'>Sl.no</th>
            <th className='add_enquiry_row'>Product</th>
            <th className='add_enquiry_row'>Quantity</th>
            <th className='add_enquiry_row'>Unit Price</th>
            <th className='add_enquiry_row'>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {existproducts.map((item, index) => (
            <tr key={index} className='add_enquiry_row'>
              <td className='add_enquiry_row'>1</td>
              <td className='add_enquiry_row'>
                <input type='text' name="product" value={item.product} placeholder='products' className="product_add_input" />
              </td>
              <td className='add_enquiry_row'>
                <input type='number' name='quantity' value={item.quantity} onChange={(event) => handleQuantityChange(event, index)} placeholder='Enter Your Quantity here..' className="product_add_input" />
              </td>
              <td className='add_enquiry_row'>
                <input type='text' name="price" value={item.unitprice} placeholder='Unit price' className="product_add_input" />
              </td>
              <td className='add_enquiry_row'>
                <input type='text' name="totalprice" value={item.totalprice} placeholder='Total Price' className="product_add_input" />
              </td>
            </tr>
          ))}
        </tbody>
      </table> <br/> <br/>
                <label className='addenquiry_label'>Expected Order</label>  <input type='text' className="addenquiry_inputs_date" value={database.date} onChange={handler} name="date" required/><br/> 
                <label className='addenquiry_label'>Remarks</label>     <input type='text' className="addenquiry_inputs_remarks" name="remarks" value={database.remarks} onChange={handler} placeholder='Remarks If Any'/><br/>
                
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
