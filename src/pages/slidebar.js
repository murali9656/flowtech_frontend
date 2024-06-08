
import './slidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate} from 'react-router-dom';

export default function Slidebar() {

    const usenav=useNavigate();
  
   const logout=()=>{
    localStorage.clear();
    usenav('/')
   }


    return (
        
        <>
            <input type="checkbox" id="check" />
            <label for="check" id="lab">
            <AiOutlineMenu id="btn1" style={{height:"50px", width:"60px"}}/>
               
                <i class="bi bi-x-octagon-fill" id="canc"></i>
            </label>
            <div className='slidebar'>
                <header>
                    
                    <img src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" height="80px" width="80px" style={{ borderRadius: '50%',marginBottom:'-20px',marginLeft:'20px' }}></img><br />
                    <span style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 0 25px' }} height="100px" id="um">Welcome {localStorage.getItem("user")}</span>
                    
                </header>
                <ul>
              
                   {localStorage.getItem("role")==="admin" ?  <li><Link to="home"><i class="bi bi-house-fill"></i>Home</Link></li>:""}

                   {localStorage.getItem("role")==="user" ?  <li><Link to="userhome"><i class="bi bi-house-fill"></i>Home</Link></li>:""}
                     {localStorage.getItem("role")==="admin" ? <li><Link to="companies"><i class="bi bi-door-open-fill"></i>Companies</Link></li>:""}

                     {localStorage.getItem("role")==="user" ? <li><Link to="userCompany"><i class="bi bi-door-open-fill"></i>Company</Link></li>:""}
                     {localStorage.getItem("role")==="admin" ?<li><Link to="enquiry"><i class="bi bi-r-circle-fill"></i>Enquiry</Link></li>:""}
                     {localStorage.getItem("role")==="user" ?<li><Link to="userenquiry"><i class="bi bi-r-circle-fill"></i>Enquiry</Link></li>:""}
                     

                    <li><Link to="products"><i class="bi bi-ticket-detailed-fill"></i>Assets</Link></li> 
                    <li><Link to="reports"><i class="bi bi-arrow-left-right"></i>Reports</Link></li> 

                   {localStorage.getItem("role")==="admin"? <li><Link to="addproducts"><i class="bi bi-box-arrow-in-up"></i>Add Assets</Link></li> :""}

                     <li onClick={logout}><a class="active" href="/"><i class="bi bi-box-arrow-right"></i>Logout</a></li>

                    {/* <li><Link to=""><h5 id="logout"><i class="bi bi-door-closed-fill"></i>Logout</h5></Link></li> */}

                    {/* <li><h5 id="greets">Welcome {localStorage.getItem('username')} </h5></li> */}



                </ul>
            </div>
            <section></section>
        </>
    )
}