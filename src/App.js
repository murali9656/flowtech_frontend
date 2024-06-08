import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./pages/navbar";
import Login from "./login.signup/login";
import Signup from "./login.signup/signup";
import Resetpassword from "./login.signup/resetpassword";
import Products from "./assets/products";
import Enquiry from "./enquiry/enquiry";
import Enquiryversions from "./enquiry/enquiryversions";
import Slidebar from "./pages/slidebar";
import Addnewenquiry from "./enquiry/addnewenquiry";
import Addcompany from "./company/addcompany";
import Addproducts from "./assets/addproducts";
import Adminenquiryedit from "./enquiry/adminenquiryedit";
import Enquiryview from "./enquiry/enquiryview";
import Companies from "./company/companies";
import Seethamdaraassets from "./assets/seethamdaraassets";
import UserCompany from "./company/userCompany";
import Userenquiry from "./enquiry/userenquiry";
import  Reports from "./reports/reports";
import Userenquiryedit from "./enquiry/userenquiryedit";
import Update from "./updates/update";
import Companyedit from "./company/companyedit";
import Reportview from "./reports/reportview";
import { useEffect, useState } from "react";
import Userhome from "./pages/userhome";
import Updateslist from "./updates/updateslist";





function App() {

const [auth,setAuth]=useState(false);
 
useEffect(()=>{
  if(localStorage.getItem('user')!==null){
    setAuth(true)
  }
  else{
    setAuth(false)
  }
},[])







  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    {auth ?  <Slidebar/> :''}
    <Routes>
      
      <Route path="/" element={<Login/>}></Route>
      <Route path="companies" element={<Companies/>}></Route>
      <Route path="home/:id" element={<Home/>}></Route>
      <Route path="signup" element={<Signup/>}></Route>
      <Route path="resetpassword" element={<Resetpassword/>}></Route>
      <Route path="products" element={<Products/>}></Route>
      <Route path="enquiry" element={<Enquiry/>}></Route>
      <Route path="userenquiry" element={<Userenquiry/>}></Route>
      <Route path="enquiryversions" element={<Enquiryversions/>}></Route>
      <Route path="addnewenquiry" element={<Addnewenquiry/>}></Route>
      <Route path="addcompany" element={<Addcompany/>}></Route>
      <Route path="addproducts" element={<Addproducts/>}></Route>
      <Route path="adminenquiryedit/:id" element={<Adminenquiryedit/>}></Route>
      <Route path="userenquiryedit/:id" element={<Userenquiryedit/>}></Route>
      <Route path="enquiryview/:id" element={<Enquiryview/>}></Route>
      <Route path="home" element={<Home/>}></Route>
      <Route path="seethamdaraassets" element={<Seethamdaraassets/>}></Route>
      <Route path="userCompany" element={<UserCompany/>}></Route>
      <Route path="reports" element={<Reports/>}></Route>
      <Route path="update/:ern" element={<Update/>}></Route>
      <Route path="companyedit/:id" element={<Companyedit/>}></Route>
      <Route path="userhome" element={<Userhome/>}></Route>
      <Route path="reportview/:ern" element={<Reportview/>}></Route>
      <Route path="updateslist" element={<Updateslist/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
