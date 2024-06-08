import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';



export default function Seethamdaraassets() {


  const [products, setProducts] = useState([]);
const [search, setSearch] = useState('');

axios.get("http://localhost:8000/getseethamdaraassets")
  .then((res) => {
    setProducts(res.data);
  })
  .catch((error) => {
    Swal.fire({
      title: "The Internet?",
      text: "Error fetching data. Please try again later.",
      icon: "question"
  
    });
    // console.log("err")
    
  },[]);


  return (
    <center>
        <div>
        <input
        type="text"
        placeholder="Search Any Products..."
        id="products_search"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
     
      />
       <table id="products_table">
        <thead>
            <tr className='products_tr'>
                <th>sl.no</th>
                <th>Product Category</th>
                <th>Products</th>
                <th>quantity</th>
            </tr>
        </thead>
        <tbody>
        {products.filter(product => product.sub_productcategory && product.sub_productcategory.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
    <tr className='products_tr' key={index}>
        <td>{item.product_id}</td>
        <td>{item.product_category}</td>
        <td>{item.sub_productcategory}</td>
        <td>{item.quantity}</td>
    </tr>
))}

        </tbody>
       </table>
        </div>
    </center>
  )
}
