import React, { Fragment, useState } from 'react';
import { Form,Button, Table} from 'react-bootstrap';
import './App.css'
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import IconButton from './components/iconButton';
import Fuse from 'fuse.js';


const shops = ["Migros","Teknosa","Bim"];

const shopsObj = shops.map((shops,index)=>({
  id: index,
  name: shops,
}))

const categories = ["elektronik","Şarküteri","Oyuncak","Bakliyat","Fırın "];

const categoriesObj = categories.map((categories,index)=>({
  id: index,
  name: categories,
}))

const TableRow=styled.tr`
text-decoration: ${(props)=>
  props.isBought === true? "line-through": "unset"
};`

function App() {
  const [products, setProducts]= useState([]);
  const [productName, setProductName]=useState("");
  const [productShop, setProductShop]=useState("");
  const [productCategory, setProductCategory]=useState(""); 
 
  const [filteredName, setFilteredName] = useState("");

  const [filteredShopId, setFilteredShopId]=useState("");
  const [filteredCategoryId, setFilteredCategoryId]=useState("");
  const [filteredStatus, setFilteredStatus]=useState("");
  const handleAddProduct = ()=> {
    
    const product={
      id:nanoid(),
      name: productName,
      category: productCategory,
      shop: productShop,
    };


    setProducts([...products, product]);
  };


const filteredProducts=products.filter((product)=>{
  let result = true;
   const fuse=new Fuse(products,{
    keys:["name"],
   });
   const res = fuse.search(filteredName);
   
   if(filteredName !== '' && !res.find(r => r.item.id===product.id) ){
    result=false;
   }
   
   if(filteredStatus !=='reset'&& product.isBought===true && filteredStatus !== true||product.isBought ==undefined && filteredStatus ===true){
    result=false
   }

   if(filteredShopId!== "" && product.shop !== filteredShopId){
    result=false
   }

   if(filteredCategoryId !==""&& product.category !==filteredCategoryId){
    result=false
   }
   return product;
})

  return (
    <Fragment>
  <div className='d-flex align-items-end'>
   <Form className='d-flex align-items-end'>
    <Form.Group  controlId="exampleForm.ControlInput1">
      <Form.Label>Name</Form.Label>
      <Form.Control value={productName} onChange={(e)=>{
        setProductName(e.target.value);
      }} type="text"  />
    </Form.Group>
    <Form.Select value={productShop} onChange={(e)=>{
      setProductShop(e.target.value);
    }} aria-label="Default select example">
      <option>Shop</option>
      {shopsObj.map(shop=> <option key={shop.id} value={shop.id}>{shop.name}</option>)}
    </Form.Select>
   <Form.Select value={productCategory} onChange={(e)=>{
    setProductCategory(e.tager.value);
   }}
    aria-label='Default select example'>
    <option>Category</option>
    {categoriesObj.map((category)=>(
      <option key={category.id} value={category.id}>{category.name}</option>
    ))}
    
   </Form.Select>
  </Form>
    <Button onClick={handleAddProduct}>Ekle</Button>
    </div>
    <Form className='d-flex align-items-end'>
    <Form.Group  controlId="exampleForm.ControlInput1">
    
      <Form.Label>Filter Name</Form.Label>
      <Form.Control value={filteredName} onChange={(e)=>{
        setFilteredName(e.target.value);
        
      }} type="text"  />
      
    </Form.Group>
    <Form.Group onChange={(e)=>{
      setFilteredStatus(e.target.value)
    }} className='d-flex flex-column'>
   <Form.Check 
   inline
   value={"reset"}
   label="sıfırla"
   name='group1'
   type={"radio"}
   id={`inline-radio-1`}
   />
   <Form.Check 
   inline
   value={"true"}
   label="alınmış"
   name='group1'
   type={"radio"}
   id={`inline-radio-1`}
   />
   <Form.Check 
   inline
   value={"false"}
   label="alınmamıs"
   name='group1'
   type={"radio"}
   id={`inline-radio-1`}
   />
   </Form.Group>
    <Form.Select value={setFilteredShopId} onChange={(e)=>{
      setFilteredShopId(e.target.value);
    }} aria-label="Default select example">
      <option value={""}>Filter Shop</option>
      {shopsObj.map(shop=> <option key={shop.id} value={shop.id}>{shop.name}</option>)}
    </Form.Select>
   <Form.Select value={setFilteredCategoryId} onChange={(e)=>{
    setFilteredCategoryId(e.tager.value);
   }}
    aria-label='Default select example'>
    <option value={""}>Filter Category</option>
    {categoriesObj.map((category)=>(
      <option key={category.id} value={category.id}>{category.name}</option>
    ))}

    
   </Form.Select>
 
  </Form>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Shop</th>
          <th>Category</th>
          <th>ID</th>
          <th>Sil</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product=>
        <TableRow isBought={product.isBought}
        onClick={()=>{
          if(updatedProducts.every(uP=> Boolean(uP.isBought)))
            {
              alert("alışveriş tamamlandı")
            }
          const updatedProducts = product.map(oldProduct=>{
            if(product.id=== product.id){
              return{...oldProduct, isBought:true};
            }
            else{
              return oldProduct;
            }
          });
        
            setProducts(updatedProducts);

          
        
        }}>
          <td>{product.name}</td>
         <td>
          {shopsObj.find((shopsObj)=> shopsObj.id== product.shop).name}
         </td>
          <td>{categoriesObj.find(
            (categoryobj)=> categoryobj.id ==product.category).name
          }</td>
          <td>{product.id}</td>
          <IconButton 
          handleClick={()=>{
            setProducts(products.filter(filterProduct=>filterProduct.id!==product.id))
          }}/>
        </TableRow>)}
      </tbody>
    </Table>
    </Fragment>
  )
}

export default App
