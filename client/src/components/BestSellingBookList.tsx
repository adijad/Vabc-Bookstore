import '../assets/css/BestsellingBookList.css';
import { BookItem } from "../types";
import { useEffect, useState } from "react";
import api from "../services/api";

const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    console.log(`NAME: ${name}`)
    return `${name}.gif`;
};

function BestSellingBookList() {
    const [books, setBooks] = useState<BookItem[]>([]);

    useEffect(() => {
        api.get<BookItem[]>(`/categories/1001/suggested-books?limit=3`)
            .then(result => setBooks(result.data))
            .catch(console.error);
    }, []);

    return (
        <div className="bestselling_box">
            { books.length > 0 && books.map((book) => (
                <div className="bestselling_card">
                    <img
                        src={require("../assets/images/books/" + bookImageFileName(book))}
                        alt="Book Cover"
                    />
                    <div className="Info_about">
                        <h3>{book.title}</h3>
                        <p>
                            {book.author}
                        </p>
                        <h2>Available from $ {book.price}</h2>
                    {/*<div className="social_icon1">*/}
                    {/*    <i className="fa-solid fa-cart-plus"></i>*/}
                    {/*</div>*/}
                    {/*<div className="social_icon2">*/}
                    {/*    <i className="fa-solid fa-bookmark"></i>*/}
                    {/*</div>*/}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BestSellingBookList;