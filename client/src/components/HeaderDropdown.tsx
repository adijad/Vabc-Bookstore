import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import {categoryList} from '../types';
import { Link } from 'react-router-dom';
import {CatProp} from "../types";


function HeaderDropdown() {
return (
      <div className="header-dropdown">
        <button className="button categories-button">Categories</button>
        <ul>
         {categoryList.map((item) =>
             <li>
                     <Link to ="/categories">
                         {item.categoryId}
                     </Link>
             </li>
         )}

        </ul>

</div>

)
}
export default HeaderDropdown

