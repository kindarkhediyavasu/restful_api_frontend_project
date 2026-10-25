import { Link } from "react-router-dom";
import style from "./Sidebar.module.css";
import { useContext } from "react";
import ProductContext from "../store/ProductContext";
function Sidebar(){
    const {setEdit} = useContext(ProductContext);
    return <ul className={style.container}>
        <li className={style.link}><Link  to="/">Products</Link></li>
        <li className={style.link}><Link  to="/add" onClick={() => setEdit({isEdit:false}) }>add</Link></li>
    </ul>
}
export default Sidebar;