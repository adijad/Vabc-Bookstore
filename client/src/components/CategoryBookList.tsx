import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import { BookItem } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function CategoryBookList() {
    const { id} = useParams();
    const [books, setBooks] = useState<BookItem[]>([]);

    useEffect(() => {
        api.get<BookItem[]>(`/categories/name/${id}/books`)
            .then(result => setBooks(result.data))
            .catch(console.error);
    }, [id]);

  return (
      <section>
          <div className="Category_bar">
              <CategoryNav />
          </div>

      <div className="categories">
          <CategoryBookListItem bookList={books} />
      </div>
      </section>
)
}

export default CategoryBookList;
