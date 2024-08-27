
import express from 'express';
import { v5 as uuidv5 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const cache = new Map();

const NAMESPACE = process.env.NAMESPACE ||                'e6b56f02-4a3d-4c26-82d4-d945aeb7c007';

const CACHE_TTL = 300000;


const dummyProducts = [
    { productName: "Phone A", price: 100, rating: 4.5, discount: 10, availability: "yes" },
    { productName: "Phone B", price: 200, rating: 4.0, discount: 20, availability: "yes" },
    { productName: "Phone C", price: 150, rating: 4.8, discount: 15, availability: "no" },
    { productName: "Phone D", price: 300, rating: 3.9, discount: 5, availability: "yes" },
    { productName: "Phone E", price: 120, rating: 4.2, discount: 25, availability: "yes" },
    { productName: "Phone F", price: 180, rating: 4.6, discount: 30, availability: "no" },
    { productName: "Phone G", price: 220, rating: 4.4, discount: 12, availability: "yes" },
    { productName: "Phone H", price: 90, rating: 4.7, discount: 8, availability: "yes" },
    { productName: "Phone I", price: 250, rating: 4.3, discount: 10, availability: "no" },
    { productName: "Phone J", price: 130, rating: 4.1, discount: 20, availability: "yes" },
    { productName: "Phone K", price: 350, rating: 4.5, discount: 15, availability: "yes" },
    { productName: "Phone L", price: 400, rating: 4.8, discount: 5, availability: "no" },
    { productName: "Phone M", price: 170, rating: 4.0, discount: 10, availability: "yes" },
    { productName: "Phone N", price: 190, rating: 4.2, discount: 25, availability: "yes" },
    { productName: "Phone O", price: 280, rating: 4.6, discount: 12, availability: "yes" },
];


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
