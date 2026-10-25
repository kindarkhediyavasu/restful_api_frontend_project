import style from "./Products.module.css";
import { useContext } from "react";
import ProductContext from "../store/ProductContext";
import { useNavigate } from "react-router-dom";

function Products(){
    const {products,setProducts,setEdit} = useContext(ProductContext);
    const naviGate = useNavigate();
    const handleEdit = (e,product) => {
        naviGate("/add");
        setEdit({isEdit:true,edit_product:product});
    }
    async function deleteProduct(id) {
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"DELETE",
        });
        if(!response.ok){
            throw new Error("sorry, product not delete");
        }else{
            setProducts((prev_products) => {
                return prev_products.filter((product) => product.id !== id);
            });
            alert("item deleted");
        }
    }catch(error){
        alert(error.message);
    }
}
    return <div className={style.table_wrapper}> <table className={style.table_container}>
        <thead>
            <tr className={style.table_raw}>
                <th className={style.id_column}>id</th>
                <th>image</th>
                <th>name</th>
                <th>category</th>
                <th>action</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => {
                return  <tr className={style.table_raw} key={product.id}>
                <td>{product.id}</td>
                <td><div className={style.product_image}><img src={product.image} alt=""/></div></td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td><button className={style.edit_button} onClick={(e) => handleEdit(e,product)}>Edit</button><button className={style.delete_button} onClick={(e) => deleteProduct(product.id)}>delete</button></td>
            </tr>
            })}
           
        </tbody>
    </table>
</div>
}
export default Products;