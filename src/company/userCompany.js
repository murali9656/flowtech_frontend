import React, { useEffect , useState} from 'react';
import './usercompany.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserCompany() {

  const [data, setData] = useState([]);
  const id = localStorage.getItem('id'); // Assuming 'id' is a string
  
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/usercompany/${id}`).then((res) => {
        setData(res.data);
        
      }).catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
    
  }, [id]);


   

  return (


  




   <section>
    
    {data.map((item)=><>
    <div id="usercompany-maindiv">
      <h2 id="company-name">{item.company_name}</h2><hr/>
      <label id="employe-name">Employe name :</label> <span>{item.contact_personame}</span> 
      <label id="employe-gst">Gst :</label>  <span>{item.gst}</span><br/>
      <label id="employe-email">Contact Email</label> <span>{item.contact_email}</span>
      <label id="employe-number">Contact number</label> <span>{item.contact_number}</span><br/>
      <Link to={`/companyedit/${item.id}`}><button id="company-edit-btn">Edit</button></Link>  <button id="company-delete-btn">Delete</button>
    </div>
    </>)}
   </section>
  )
}
