import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import { Link, useParams } from "react-router-dom";
import React, { useContext } from 'react';
import { Category } from "../contexts/CategoryContext";


function CategoryNav() {
    const { id} = useParams();
    const categories = useContext(Category);

    return (
      <div className="Category_bar">
        <ul>
          {categories.map((category) => (
              <li key={category.name}>
                  <Link
                    to={`/categories/${category.name}`}
                    className={category.name === id ? 'active' : ''}
                    onClick={() => localStorage.setItem('lastCat', category.name)}
                    >
                        {category.name}
                  </Link>
              </li>
          ))}
        </ul>
      </div>
    )
}

export default CategoryNav;

