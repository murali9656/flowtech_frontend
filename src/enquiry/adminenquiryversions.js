import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Adminenquiryversions() {

  const [data,setData]=useState([]);
  const id=localStorage.getItem("id");

  useEffect(() => {
      // Only fetch data if id exists
      if (id) {
          axios.get(`http://localhost:8000/versions`).then((res) => {
              setData(res.data);
              console.log(res.data);
          }).catch((error) => {
              console.error('Error fetching data:', error);
          });
          
      }
  }, [id]); // Add id as a dependency
    

  const delbtn=(id)=>{

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
        axios.delete(`http://localhost:8000/versions/${id}`).then(res=>{
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
        }).catch((Err)=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: Err,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        })

       
      }
    });
    
  }
 

  return (
    <section>
    <div>
    <table id="enquiry_table">
        <thead>
            <th className='enquiry_th'>Version id</th>
            <th className='enquiry_th'>Reference number</th>
            <th className='enquiry_th'>Enquiry Owner</th>
            <th className='enquiry_th'>Account Name</th>
            <th className='enquiry_th'>GST</th>
            <th className='enquiry_th'>contact person</th>
            <th className='enquiry_th'>contact email</th>
            <th className='enquiry_th'>contact number</th>
            <th className='enquiry_th'>state</th>
            <th className='enquiry_th'>city</th>
            <th className='enquiry_th'>stage</th>
            <th className='enquiry_th'>sector</th>
            <th className='enquiry_th'>enquiry_source</th>
            <th className='enquiry_th'>products</th>
            <th className='enquiry_th'>quantity</th>
            <th className='enquiry_th'>order_expected</th>
            <th className='enquiry_th'>status</th>
            <th className='enquiry_th'>documents</th>
            <th className='enquiry_th'>remarks</th>
            <th className="enquiry_th" colSpan={2}>Actions</th>
        </thead>
        <tbody>
          {data.map((item)=><>
            <tr>
            <td className='enquiry_td'>{item.version_id}</td>
            <td className='enquiry_td'>{item.ern}</td>
            <td className='enquiry_td'>{item.owner}</td>
            <td className='enquiry_td'>{item.company}</td>
            <td className='enquiry_td'>{item.gst}</td>
            <td className='enquiry_td'>{item.person}</td>
            <td className='enquiry_td'>{item.email}</td>
            <td className='enquiry_td'>{item.number}</td>
            <td className='enquiry_td'>{item.state}</td>
            <td className='enquiry_td'>{item.city}</td>
            <td className='enquiry_td'>{item.stage}</td>
            <td className='enquiry_td'>{item.sector}</td>
            <td className='enquiry_td'>{item.source}</td>
            <td className='enquiry_td'>
      <details>
      {item.products.map((product, index) => (
        <div key={index}>
          <p>{product.products}</p>
        </div>
      ))}
      
      </details>
      </td>
      <td className='enquiry_td'> <details>
        
      {item.products.map((product, index) => (
        <div key={index}>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
      
      </details></td>
            <td className='enquiry_td'>{item.date}</td>
            <td className='enquiry_td'>{item.source}</td>
            <td className='enquiry_td'>{item.documents}</td>
            <td className='enquiry_td'>{item.remarks}</td>
            <td className='enquiry_td'><button className='enquiry_view_btn'>&#x1F441;</button></td>
            <td className='enquiry_td'><button className='enquiry_view_btn' onClick={()=>{delbtn(item.ern)}} style={{backgroundColor:"red"}}>&#x1F5D1;</button></td>
            </tr>
            </>)}
        </tbody>
    </table>





 {data.map((item)=><>
    
    <div id="Enquiry_grid_div">

   <label className='enquriy_label'>id</label> &emsp; <span className='enquiry_span'>{item.id}</span><br/>
   <label  className='enquriy_label'>Refernce Number</label> &emsp; <span className='enquiry_span'>{item.ern}</span><br/>
   <label  className='enquriy_label'>Enquiry Owner</label> &emsp; <span className='enquiry_span'>{item.owner}</span><br/>
   <label  className='enquriy_label'>Company Name</label> &emsp; <span className='enquiry_span'>{item.company}</span><br/>
   <label  className='enquriy_label'>Gst</label> &emsp; <span className='enquiry_span'>{item.gst}</span><br/>
   <label  className='enquriy_label'>contact Person</label> &emsp; <span className='enquiry_span'>{item.person}</span><br/>
   <label  className='enquriy_label'>contact Email</label> &emsp; <span className='enquiry_span'>{item.email}</span><br/>
   <label  className='enquriy_label'>Contact Number</label> &emsp; <span className='enquiry_span'>{item.number}</span><br/>
   <label  className='enquriy_label'>Territory</label> &emsp; <span className='enquiry_span'>{item.territory}</span><br/>
   <label  className='enquriy_label'>State</label> &emsp; <span className='enquiry_span'>{item.state}</span><br/>
   <label  className='enquriy_label'>City</label> &emsp; <span className='enquiry_span'>{item.city}</span><br/>
   <label  className='enquriy_label'>Stage</label> &emsp; <span className='enquiry_span'>{item.stage}</span><br/>
   <label  className='enquriy_label'>Sector</label> &emsp; <span className='enquiry_span'>{item.sector}</span><br/>
   <label  className='enquriy_label'>Enquiry Source</label> &emsp; <span className='enquiry_span'>{item.source}</span><br/>
   <label  className='enquriy_label'>Enquiry Status</label> &emsp; <span className='enquiry_span'>{item.status}</span><br/>
   <table className="grid_products_table">
    <tr className="grid_products_table_tr">
      <th>Products</th>
      <th>Quantity</th>
    </tr>
    {item.products.map((item)=><>
    <tr className="grid_products_table_tr">
      <td>{item.products}</td>
      <td>{item.quantity}</td>
    </tr></>)}
   </table>
   {/* <label  className='enquriy_label'>Products</label> &emsp; <span className='enquiry_span'>no documents</span><br/>
   <label  className='enquriy_label'>Quantity</label> &emsp; <span className='enquiry_span'>no remarks</span><br/> */}
   <label  className='enquriy_label'>Order Expected</label> &emsp; <span className='enquiry_span'>{item.date}</span><br/>
   <label  className='enquriy_label'>Documents</label> &emsp; <span className='enquiry_span'>{item.documents}</span><br/>
   <label  className='enquriy_label'>Remarks</label> &emsp; <span className='enquiry_span'>{item.remarks}</span><br/>
   <label  className='enquriy_label'>Actions</label> &emsp; <span className='enquiry_span'> <button className='enquiry_view_btn'>&#x1F441; View</button></span>
                                    
   


    </div>
    </>)}

    </div>
    </section>
  )
}
