// Contains all the custom types we want to use for our application
// import Classics from './assets/images/categories/classics.jpg';
// import Fantasy from './assets/images/categories/fantasy.jpg';
// import Mystery from './assets/images/categories/mystery.jpg';
// import Romance from './assets/images/categories/romance.jpg';

// import book1 from './assets/images/books/it-starts-with-us.png';
// import book2 from './assets/images/books/ugly-love.png';
// import book3 from './assets/images/books/RemindersOfHim.png';
// import category1 from './assets/images/books/american-prometheus.png';
// import category2 from './assets/images/books/History/GreatBattleForBoys.png';
// import category3 from './assets/images/books/mans-search-for-meaning.png';
// import category4 from './assets/images/books/History/MeinKampf.png';
// import category5 from './assets/images/books/the-art-of-war.png';
// import category6 from './assets/images/books/the-diary-of-a-young-girl.png';
// import book10 from './assets/images/books/History/';
// import book11 from './assets/images/books/it-starts-with-us.png';


// export interface BookItem {
//   bookId: number;
//   title: string;
//   author: string;
//   description: string;
//   price: number;
//   isPublic: boolean;
//   book: any;
//   categoryId: number;
// }

export interface BookList {
  bookList: BookItem[]
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}

// export const categoryImages: Record<string, any> = {
//   classics: Classics,
//   fantasy : Fantasy,
//   mystery : Mystery,
//   romance : Romance
// };

export interface CatProp{
  catList: CategoryItem[];
}
export const categoryList = [
    { categoryId: 1001, name: "Bestsellers"},
    { categoryId: 1002, name: "History"},
    { categoryId: 1003, name: "Biography"},
    { categoryId: 1004, name: "Comics"},
    { categoryId: 1005, name: "Mystery"},
    { categoryId: 1006, name: "Humor"},
    { categoryId: 1007, name: "Horror"},
    { categoryId: 1008, name: "Fiction"},
    { categoryId: 1009, name: "Fantasy"},
    { categoryId: 1010, name: "Thriller"},
    { categoryId: 1011, name: "Romance"},
];

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
    id: number;
    book: BookItem;
    quantity: number;

    constructor (theBook: BookItem) {
        this.id = theBook.bookId;
        this.book = theBook;
        this.quantity = 1;
    }
}

export const initialCartState:ShoppingCartItem[] =  [];

export interface ContextProps {
    children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
    name: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpiryMonth: number;
    ccExpiryYear: number;
}

export interface BookItem {
    bookId: number;
    title: string;
    author: string;
    price: number;
    isPublic: boolean;
    categoryId: number;
    rating: number;
    description: string;
    isFeatured: boolean;
}

export interface Order {
    orderId: number;
    amount: number;
    dateCreated: number;
    confirmationNumber: number;
    customerId: number;
}

export interface LineItem {
    bookId: number;
    orderId: number;
    quantity: number;
}

export interface Customer {
    customerName: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpDate: number;
}

export interface OrderDetails {
    order: Order;
    customer: Customer;
    books: BookItem[];
    lineItems: LineItem[];
}

export interface ServerErrorResponse {
    reason: string;
    message: string;
    fieldName: string;
    error: boolean;
}