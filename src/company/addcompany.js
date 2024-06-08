import { Modal, ModalBody, ModalHeader,Row,Col } from 'reactstrap';
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';


export default function Addcompany() {

  var id=localStorage.getItem('id');
 

    const [modal,setModal]=useState(false);
    const [data,setData]=useState({id:id,cname:"",gst:"",cperson:"",cnumber:"",cemail:"",state:""});
    const [states,setStates]=useState([]);
    const [city,setCity]=useState([]);


    useEffect(()=>{             //api request for getting all states from database
      axios.get('http://localhost:8000/states').then((res)=>{
               setStates(res.data);
              //  console.log(states)
      })
    },[]);

    const handleforstate=(state)=>{     
      // console.log(state.value)
      if(state){    
        setData(prevState=>({
          ...prevState,
          state:state.value
        }));
        // console.log(data.state)
          axios.get(`http://localhost:8000/states/${state.value}`).then(res=>{
            setCity(res.data);     //api for getting cities from database based on state
          }).catch(error=>{
            console.log("Error occurred while fetching company data:", error)
          })
      }
    };

    const handleforcity=(city)=>{
         if(city){
          setData(prevState=>({
            ...prevState,city:city.value
          }))
         }
    }

    const modalopen=(e)=>{
        e.preventDefault();
        setModal(!modal)
    }

    const openmodal=(e)=>{
        e.preventDefault();
        setModal(true)
    }

    const handler=(e)=>{
      const {name,value}=e.target;
      setData(prevState=>(
        {...prevState,[name]:value}
      ));
      // console.log(data.cname)

    }
    const Submithandler=(e)=>{
      e.preventDefault();
      
      const companydetails={uid:data.id,companyname:data.cname,gst:data.gst,contactperson:data.cperson,contactnumber:data.cnumber,contactemail:data.cemail,state:data.state,city:data.city};

      axios.post('http://localhost:8000/company',companydetails).then((res)=>{
        if(res.status===200){
          Swal.fire({
  position: "center",
  icon: "success",
  title: res.data,
  showConfirmButton: false,
  timer: 1500
});
  setModal(false)
  
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }).catch((err)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      })
    }
  return (
    <div>
        <Modal   
             size="lf"
             style={{maxWidth: '900px', width: '100%'}}
             isOpen={modal}
             toggle={()=>setModal(!modal)}>
             <ModalHeader size="lg"
                          isOpen={modal}
                          toggle={modalopen}><h4 className='text-primary'>Add Your Company Details</h4></ModalHeader>
                          <ModalBody>
                            <form method='post' onSubmit={Submithandler}>
                                <Row>
                                    <Col lg={12}>
                                        <div className="form-group">
                                            <label className="label label-default">Company Name</label> <input type="text" className="form-control input-lg" name="cname" id="custom-input-cname" placeholder='Enter_Your_CompanyName' onChange={handler} required/>
                                            <label for="gst">GST</label> <input type="text" name="gst" id="custom-input-gst" className='form-control' placeholder='Enter_Your_Gst_Number'  onChange={handler} required/>
                                            <label for="cperson">Contact Person</label> <input type="text" name="cperson" id="custom-input-cperson" className='form-control' placeholder='Enter_Your_Contact_Person'  onChange={handler} required/>
                                            <label for="cnumber">Contact Number</label> <input type="number" name="cnumber" id="custom-input-cnumber" className='form-control' placeholder='Enter_Your_Contac_Number'  onChange={handler} required/>
                                            <label for="cemail">Contact Email</label> <input type="email" name="cemail" id="custom-input-cemail" className='form-control' placeholder='Enter_Your_Email'  onChange={handler} required/>
                                            <label for="cemail">State</label> <Select 
                                                                          isSearchable
                                                                          id="add-company-state"
                                                                          options={states}
                                                                          placeholder="Search..."
                                                                          onChange={handleforstate}
                                                                          name="state"
                                                                          
                                                                              />
                                            <label for="cemail">City</label>      
                    <Select 
                                                                          isSearchable
                                                                          id="add-company-city"
                                                                          options={city}
                                                                          placeholder="Search..."
                                                                          name="city"
                                                                          onChange={handleforcity}
                                                                          
                                                                              />
                                            <button id="addcompany_submit">Submit</button>

                                        </div>
                                    </Col>
                                </Row>
                            </form>
                          </ModalBody>
                          </Modal>
      <button className='btn mt-1' style={{backgroundColor:"#0b3629",color:'white',height:"50px",width:"145px"}} onClick={openmodal}>+ Add Company</button>
    </div>
  )
}
