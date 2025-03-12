import React, { createContext, useEffect, useState } from "react";
import { CategoryItem } from "../types";
import api from "../services/api";

export const Category = createContext<CategoryItem[] | []>([]);
Category.displayName = 'CategoryContext';

interface CategoryContextProps {
    children: React.ReactNode;
}

function CategoryContext({ children }: CategoryContextProps) {
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(() => {
        api.get<CategoryItem[]>('/categories')
            .then((result) => setCategories(result.data))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value={categories}>{children}</Category.Provider>
    );
}

export default CategoryContext;