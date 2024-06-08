import React, { useEffect, useState } from 'react';
import './producs.css';
import axios from 'axios';
import Seethamdaraassets from './seethamdaraassets';
import Swal from 'sweetalert2';

export default function Products() {

    const [products,setProducts]=useState([]);
    const [search,setSearch]=useState('');
    const [toggle,setToggle]=useState(1);

    useEffect(() => {
        axios.get('http://localhost:8000/getenquiryproduct')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                Swal.fire({
                    title: "The Internet?",
                    text: "Error fetching data. Please try again later.",
                    icon: "question"
                  });
            });
    }, []);
    
  return (
    <section>
    <div>
        
      <div id="div_for_products_tab">
        <ul id="ul_for_products_tab">
            <li id="li_for_Pedagantyada_Assets" title='click here to see avalible assets at Pedagantyada' onClick={()=>setToggle(1)}>{toggle===1?<span className="correct-entity">&#128585;</span>:<span className="wrong-entity">&#128584;</span>}Pedagantyada_Assets</li>
            <li id="li_for_Seethammadhara_Assets" title='click here to see avalible assets at Seethammadhara' onClick={()=>setToggle(2)}>{toggle===2?<span className="correct-entity">&#128585;</span>:<span className="wrong-entity">&#128584;</span>}Seethammadhara_Assets</li>
        </ul>
      </div>
      <hr style={{ color: 'blue', height: '6px', backgroundColor: 'blue' }} />
      <div  className={toggle===1 ? "show_div":"hide_div"}>
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
       <div className={toggle===2 ? "show_div":"hide_div"} >
            <Seethamdaraassets/>
       </div>
       <div></div>
    </div>
    </section>
  )
}
