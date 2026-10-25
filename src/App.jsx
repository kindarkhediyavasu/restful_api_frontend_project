import Products from "./components/Products";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Add from "./components/Add";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductContext from "./store/ProductContext";

function App(){
    const [products,setProducts] = useState([]);
    const [edit,setEdit] = useState({isEdit:false});
    useEffect(() => {
        const fetchData = async () => {
            try{
                  const response = await fetch("https://fakestoreapi.com/products");
                  if(!response.ok){
                    throw new Error("sorry,products not fetch");
                  }
                  const data = await response.json();
                  setProducts(data);
            }catch(error){
                alert(error.message);
            }
          
        }
        fetchData();
    },[]);
    return <div className="main_container">
        <ProductContext.Provider value={{products,setProducts,edit,setEdit}}>
            <Sidebar/>
            <Outlet/>
       </ProductContext.Provider>
    </div>
}
export default App;