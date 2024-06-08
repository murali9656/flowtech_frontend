import React, { useEffect, useState } from 'react';
import './addnewenquiry.css';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.css';
import Addcompany from '../company/addcompany';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate } from 'react-router-dom';


export default function Addnewenquiry() {

 


    
  const usenav=useNavigate();

  const [companies,setCompanies]=useState([]);  //stored the data comes from database;
  const [empolye,setEmpolye]=useState([]);    //store the contact details based on company
  const [contactdetails, setContactdetails] = useState({ gst: "", contactnumber: "", contactemail: "" });

  const [products,setProducts]=useState([]);    //store products from database
  const [category,setProductscategory]=useState([]);  //store productscategory from database


  const [serialNumber, setSerialNumber] = useState(1);


  const [selectproduct, setSelectproduct] = useState([{ products: "" ,quantity:"", unitprice:"",totalprice:""}]);




  const Enquiry_Source=[
    {value:"By Website", label:"By Website"},
    {value:"By Staff", label:"By Staff"},
    {value:"By Offline", label:"By Offlines"},
];

const stage=[
  {value:"intial",label:"intial"},
  {value:"in-review", label:"in-review"}
]

useEffect(()=>{             //api request for getting all companies from database
  axios.get('http://localhost:8000/company').then((res)=>{
    setCompanies(res.data);
  })
},[]);



const handleforcompany = (selectedOption) => {   //handle for get the selected company from dropdow
  handlerforcompany(selectedOption);
  if (selectedOption) {
      
      axios.get(`http://localhost:8000/company/${selectedOption.value}`).then(res => {
          if (res.data === "no data") {
              alert("no company");        //api request for getting specifi company details by using company name
          } else {
              setEmpolye(res.data);
              console.log(empolye);
          }
      }).catch(error => {
          console.error("Error occurred while fetching company data:", error);
          // Handle error appropriately, e.g., show an error message to the user
      });
  } else {
     console.log("network error")
  }
};


const handlerforperson=(person)=>{    //handle for getting the contactperson name from the dropdown
 
    if(person){
      changeHandlerForPerson(person);
            axios.get(`http://localhost:8000/contactperson/${person.value}`).then(res=>{
              // console.log(res.data)      //api for getting the email & contact number for the selected person
              const { gst, contact_number, contact_email, state, city } = res.data[0];
              setContactdetails(prevState => ({
                  ...prevState,
                  gst: gst,
                  contactnumber: contact_number,
                  contactemail: contact_email,
                  state:state,
                  city:city
              }));
            }).catch(error=>{
              console.log("Error occurred while fetching company data:", error)
            })
    }
    // console.log(contactdetails)

}

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

const handlerproduct = (selectedOptions) => {
  // Map over the array of selected options and extract their values
  const selectedValues = selectedOptions.map(option => ({ products: option.value, quantity: "" }));
  
  // Update the state using a functional update to ensure the latest state
  setSelectproduct(selectedValues);
  console.log(setSerialNumber)

  // Log the updated state to see the correct state value
  console.log(selectproduct);
}

const handlerproductcategory = (selectdcategory) => {
    // console.log(selectcategory.value)
    axios.get(`http://localhost:8000/enquiryproduct/${selectdcategory.value}`).then((res)=>{
    setProducts(res.data);    //api for getting products from database
   console.log(res.data)
  })
  
}


const handler = (e) => {
  const { name, value } = e.target; // Destructure name and value from the target object

  setData(prevState => ({
    ...prevState,
    [name]: value // Update the state with the new value based on the input name
  }));
};

const handleQuantityChange = (event, index) => {
  const newSelectproduct = [...selectproduct];
  newSelectproduct[index].quantity = event.target.value; // Update quantity for the corresponding entry
  newSelectproduct[index].totalprice=newSelectproduct[index].quantity * newSelectproduct[index].unitprice
  setSelectproduct(newSelectproduct);
  console.log(selectproduct);
};

const handleUnitPriceChange=(event,index)=>{
  const newSelectproduct=[...selectproduct];
  newSelectproduct[index].unitprice=event.target.value;
  newSelectproduct[index].totalprice=newSelectproduct[index].quantity * newSelectproduct[index].unitprice;
  setSelectproduct(newSelectproduct);
}




const handlerforcompany = (selectedOption) => {
  if (selectedOption) {
    setData(prevState => ({
      ...prevState,
      company_name: selectedOption.value // Update company_name in state with selected option's value
    }));
    // console.log(data.company_name) 
    // Log the selected company name
  }
};



const changeHandlerForPerson = (person) => {
  if (person) {
    setData(prevState => ({
      ...prevState,
      contact_person: person.value
    }));

    
    // console.log(data.contact_person); // Log the updated value
  }
};

const handleforsource=(source)=>{
  if(source){
    setData(prevState=>({
      ...prevState,
      source:source.value
    }))
  }
};


const handlerforstage=(stage)=>{
  if(stage){
    setData(prevState=>({
      ...prevState,
      stage:stage.value
    }))
  }
  console.log(contactdetails.contactnumber)
}



const [data,setData]=useState({company_name:"",contact_person:"",state:"",city:"",stage:"",source:"",date:"",remarks:"",sector:""});
const id=localStorage.getItem("id");
const submithandler=(event)=>{
  event.preventDefault();
    const status="pending";
    var rNumber = Math.floor(10000000 + Math.random() * 90000000);
    const referenceNumber= "FT"+rNumber;
    const enquiryOwner = localStorage.getItem('user')
    const role=localStorage.getItem("role");
  var enquiry={id:id,enqruirowner:enquiryOwner,company_name:data.company_name,contact_person:data.contact_person,gst:contactdetails.gst,contactnumber:contactdetails.contactnumber,contactemail:contactdetails.contactemail,state:contactdetails.state,sector:data.sector,city:contactdetails.city,stage:data.stage,source:data.source,date:data.date,remarks:data.remarks,status:status,referenceNumber:referenceNumber};
  // console.log(enquiry);
  axios.post("http://localhost:8000/enquiry",enquiry).then(res=>{
    if(res.data==="Enquiry_added" && role==="admin"){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your  Enquiry Added Successfully...",
        showConfirmButton: false,
        timer: 1500
      });
      usenav("/enquiry");
    }
    else if(res.data==="Enquiry_added" && role==="user"){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your  Enquiry Added Successfully...",
        showConfirmButton: false,
        timer: 1500
      });
      usenav("/userenquiry");
    }
  }).catch((error)=>{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  })

  const ordersData = selectproduct.map(item => ({
    product: item.products,
    quantity: item.quantity,
    unitprice:item.unitprice,
    totalprice:item.totalprice,
    referenceNumber: referenceNumber // Make sure to replace 'referenceNumber' with the actual reference number
  }));

  // console.log(ordersData);

  axios.post('http://localhost:8000/orders', ordersData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error('Error making POST request:', error);
    });
}






  
  
  return (
    <section>
        <div>
          <p id="add_enquiry_header">Add New Enquiry</p>
            <div id="addnew_enquiry_div">
              <form method='post' onSubmit={submithandler}>
             <label className='addenquiry_label'>Enquiry Owner</label> <input type='text' className="addenquiry_inputs" name='enqruirowner' value={localStorage.getItem('user')} onChange={handler} required/><br/><br/>
             <label className='addenquiry_label'>Account Name</label>  <Select 
                                                                          isSearchable
                                                                        className="addenquiry_inputs"
                                                                          options={companies}
                                                                          placeholder="Search for your company_name..."
                                                                          onChange={handleforcompany}
                                                                          name='company_name'
                                                                          required
                                                                              /> <div id="addcompany_div"> <Addcompany/> </div>
                                                                              <span id="add_company_span">If Your Company not register yet click on Add company +</span><br/>
             
             <label className='addenquiry_label'>Contact Person</label>     <Select 
                                                                          isSearchable
                                                                        className="addenquiry_inputs_person"
                                                                          options={empolye}
                                                                          placeholder="Search for your employee name..."
                                                                          onChange={handlerforperson}
                                                                          name='contact_person'
                                                                          required
                                                                              /><br/>
               <label className='addenquiry_label'>GST</label>   <input type='text' className="addenquiry_inputs_gst" name="gst" value={contactdetails.gst} placeholder='Your GST will automatically fill' required/><br/>
               

               <label className='addenquiry_label'>Contact Number</label>  <input type='text' className="addenquiry_inputs_contact_number" name="contactnumber" value={contactdetails.contactnumber} placeholder='Your Contact Number will automatically fill' required/><br/>
               <label className='addenquiry_label'>Contact Email</label>  &emsp;&nbsp;<input type='email' className="addenquiry_inputs_contact_number" name="contactemail" value={contactdetails.contactemail} placeholder='Your Contact email will automatically fill' required/><br/>
      
               <label className='addenquiry_label'>State</label>  <input type='text' className="addenquiry_inputs_city" name="state" value={contactdetails.state} placeholder='Your State will automatically fill' required/><br/>
               <label className='addenquiry_label'>City</label>  &emsp;&nbsp;<input type='tetx' className="addenquiry_inputs_state" name="city" value={contactdetails.city} placeholder='Your City will automatically fill'/><br/>
               <label className='addenquiry_label'>Enquiry Source</label>    <Select 
                                                                          isSearchable
                                                                        className="addenquiry_inputs_enquiry_source"
                                                                          options={Enquiry_Source}
                                                                          placeholder="Search..."
                                                                          name="city"
                                                                          onChange={handleforsource}
                                                                          required
                                                                              /><br/>
               <label className='addenquiry_label'>Sector</label>  <input type='text' className="addenquiry_inputs_sector" name="sector" onChange={handler} placeholder='Enter Your sector' required/><br/>
               <label className='addenquiry_label'>Stage</label>     <Select 
                                                                          isSearchable
                                                                        className="addenquiry_inputs_stage"
                                                                          options={stage}
                                                                          name='stage'
                                                                          onChange={handlerforstage}
                                                                          placeholder="Search..."
                                                                          required
                                                                              /><br/>
                   <label className='addenquiry_label'>product category</label>   <Select 
                                                                          isSearchable
                                                                        className="addenquiry_inputs_product_category"
                                                                          options={category}
                                                                          placeholder="Search..."
                                                                          onChange={handlerproductcategory}
                                                                          name="products"
                                                                          required
                                                                              /><br/>                                                            
                 <label className='addenquiry_label'>Product</label>   <Select 
                                                                          isSearchable
                                                                          isMulti
                                                                          className="addenquiry_inputs_products"
                                                                          options={products}
                                                                          placeholder="Search..."
                                                                          onChange={handlerproduct}
                                                                          name="products"
                                                                          required
                                                                              /><br/>
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
          {selectproduct.map((item, index) => (
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
      <label className='addenquiry_label'>Special Notes</label> <textarea rows={5} cols={63} name="remarks" onChange={handler} style={{marginLeft:"54px"}} placeholder='Text here here if you have any spacial notes'></textarea><br/>
                <label className='addenquiry_label'>Expected Order</label>  <input type='month' className="addenquiry_inputs_date" name="date" onChange={handler} required/><br/> 
                
                
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
