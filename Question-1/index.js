
import express from 'express';
import { v5 as uuidv5 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const cacheStore = new Map();

const NAMESPACE = process.env.NAMESPACE ||                'e6b56f02-4a3d-4c26-82d4-d945aeb7c007';

const CACHE_DURATION = 300000;


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


async function fetchProducts(category, limit, minCost, maxCost) {
    const filteredItems = dummyProducts.filter(item =>
        item.price >= minCost && item.price <= maxCost
    );

    filteredItems.forEach(item => {
        item.id = uuidv5(item.productName + item.price + item.rating, NAMESPACE);
    });

    return filteredItems;
}

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER, sort_by = 'price', order = 'asc' } = req.query;

    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(n, 10);

    const cacheKey = `${categoryname}-${sort_by}-${order}-${currentPage}-${itemsPerPage}-${minPrice}-${maxPrice}`;
    if (cacheStore.has(cacheKey) && (Date.now() - cacheStore.get(cacheKey).timestamp < CACHE_DURATION)) {
        return res.json(cacheStore.get(cacheKey).data);
    }

    let products = await fetchProducts(categoryname, itemsPerPage, minPrice, maxPrice);

    products.sort((a, b) => {
        if (order === 'asc') {
            return a[sort_by] - b[sort_by];
        } else {
            return b[sort_by] - a[sort_by];
        }
    });

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    cacheStore.set(cacheKey, { data: paginatedProducts, timestamp: Date.now() });

    res.json(paginatedProducts);
});


app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    const products = await fetchProducts(categoryname, 100, 0, Number.MAX_SAFE_INTEGER);

    const product = products.find(prod => prod.id === productid);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
