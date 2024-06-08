import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './updateslist.css';
import Swal from 'sweetalert2';

export default function Updateslist() {
const location = useLocation();
    const ern = location.state; 
    const [update, setUpdate] = useState([]);

    useEffect(() => {
      
        axios.get(`http://localhost:8000/getupdates/${ern}`).then((res) => {
            setUpdate(res.data);
           
        }).catch((err) => {
            console.log(err);
        });
    }, [ern]); 

    const deletehandler=(id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          axios.delete(`http://localhost:8000/update/${id}`).then((res)=>{
            if(res.status===500){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: res.data,
               
              });
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
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              window.location.reload();
            }
          }).catch((err)=>{
            Swal.fire({
              title: "The Internet?",
              text: "That thing is still around?",
              icon: "question"
            });
          })
       
        }
      });
    }

    return (
        <section>
          <div id="updatelist-table-div">
            <div class="seven">
  <h1>Updates</h1>
               </div>
               <div>
                <table style={{width:"100%"}}>
                  <thead>
                    <tr style={{borderBottom:"solid 0.8px grey",height:"50px",textAlign:"center"}}>
                      <th>Reference Number</th>
                      <th>Upadte-Date</th>
                      <th>Update</th>
                      <th>Documents</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {update.map((item)=><>
                    <tr style={{borderBottom:"solid 0.8px grey",height:"50px",textAlign:"center"}}>
                      <td>{item.enquiryreferncenumber	}</td>
                      <td>{item.date}</td>
                      <td>{item.update}</td>
                      <td><a href={`http://localhost:8000/documentuploads/${item.file}`} download target='blank'><button id="updateslist-documents-download">Download <i class="bi bi-download"></i></button></a></td>
                    
                      <td><button id="updateslist-documents-delete" onClick={()=>{deletehandler(item.id)}}>Delete <i class="bi bi-trash"></i></button></td>
                    </tr>
                    </>)}
                  </tbody>
                </table>
               </div>
               </div>







               <div id="updatelist-grids-div">
               <div class="seven">
  <h1>Updates</h1>
               </div>  
               {update.map((item)=><>
                <div id="updates-grid-container">
                     <div className='updates-divs'><label>Enquiry Referncenumber: </label><span>{item.enquiryreferncenumber}</span></div>
                     <div className='updates-divs'> <label>Date: </label> <span>{item.date}</span> </div>
                     <div className='updates-divs'> <label>Update: </label> <span>{item.update}</span></div>
                     <div className='updates-divs'> <label>Documents: </label> <a href={`http://localhost:8000/documentuploads/${item.file}`} download target='blank'><button id="updates-grid-download">Download <i class="bi bi-download"></i></button></a></div>
                     <div className='updates-divs'><button id="updates-grid-delete" onClick={()=>{deletehandler(item.id)}}>Delete <i class="bi bi-trash"></i></button></div>
                </div>
               </>)}
                      
               </div>
        </section>
    );
}
