import { useRef, useState } from "react";
import style from "./Add.module.css";
import { useContext } from "react";
import ProductContext from "../store/ProductContext";
function Add(){
    const nameRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();

    const {setProducts,edit,setEdit} = useContext(ProductContext);
    const [title,setTitle] = useState(edit.isEdit?edit.edit_product.title:"");
    const [price,setPrice] = useState(edit.isEdit?edit.edit_product.price:"");
    const [category,setCategory] = useState(edit.isEdit?edit.edit_product.category:"");
    const [image,setImage] = useState(edit.isEdit?edit.edit_product.image:"");

    async function  EditItem(id,obj) {
        try{
            const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(obj)
        });
        if(!response.ok){
            throw new Error("sorry, product not edited");
        }else{
            const updatedProduct = await response.json();
            setProducts((prev_product)=>{
                return prev_product.map((product) => {
                    return product.id === id ? updatedProduct : product;
                });
            })
            alert("product edited");
        }
        }catch(error){
            alert(error.message);
        }
        
    }
    
    async function AddData(obj){
    try{
         const response = await fetch("https://fakestoreapi.com/products",{
            method:"POST",
            headers: {
                 "Content-Type": "application/json",
            },
            body:JSON.stringify(obj),
        });
        if(!response.ok){
            throw new Error("sorry, product is not added");
        }
        const newProduct = await response.json();
        setProducts((prev_products) => {
            return [...prev_products,newProduct];
        });
        alert("product added successfully");
    }catch(error){
        alert(error.message);
    }
   
}

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = nameRef.current.value;
        const category = categoryRef.current.value;
        const price = priceRef.current.value;
        const image = imageRef.current.value;

        if(!title || !category || !priceRef ||!image){
            alert("please,Enter valid value");
            return;
        }
        const product_obj = {
            title:title,
            price:price,
            description:"this is descreption",
            image:image,
            category:category
        }
        
        if(edit.isEdit){
            alert("item come to edit");
            EditItem(edit.edit_product.id,product_obj);
        }else{
           AddData(product_obj);
        }
        setTitle("");
        setCategory("");
        setPrice("");
      
    }
    return <div className={style.formWrapper}>
        <form action="" className={style.form_container} onSubmit={handleSubmit}>
            <input type="text" name="product_name" placeholder="Enter product name" ref={nameRef} value={title} onChange={(e) => setTitle(e.target.value) }/>
            <input type="text" name="product_price" placeholder="Enter product price" ref={priceRef} value={price}  onChange={(e) => setPrice(e.target.value) }/>
            <input type="text" name="product_category" placeholder="Enter product category" ref={categoryRef} value={category}  onChange={(e) => setCategory(e.target.value) }/>
            <input type="text" name="product_image" placeholder="Enter product image URL" ref={imageRef} value={image}  onChange={(e) => setImage(e.target.value) }/>
            <button type="submin" className={style.add_button}>{edit.isEdit?"edit":"add"}</button>
        </form>
    </div>
}
export default Add;