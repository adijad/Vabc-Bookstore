
// import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/Home.css'
import BestSellingBookList from "./BestSellingBookList";
import { Link } from "react-router-dom";
import {useContext} from "react";
import { Category } from "../contexts/CategoryContext";


function Home() {
    const categories = useContext(Category);

    return(
        <section>
            <div className="main">
                <div className="main_tag">
                    <h1>WELCOME TO<br/><span>VABC BOOKSTORE</span></h1>
                    <Link to={`/categories/${categories.length > 0 && categories[0].name}`}>
                    <div className="main_btn"><u color="black">SHOP NOW</u></div>
                    </Link>
                </div>

                <div className="main_img">
                    <img
                        src={require("../assets/images/books/image_10.gif")}
                        alt="Bookstore"
                        // width="1000px"
                        // height="auto"
                    />
                </div>
            </div>

            <div className="bestselling">
                <div className="bestselling_tag">
                    <h4><u>Bestsellers</u></h4>
                </div>

                <div className="bestselling_box">
                    <BestSellingBookList />
                </div>
            </div>
        </section>
    );
}

export default Home;
