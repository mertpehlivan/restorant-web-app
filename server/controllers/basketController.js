const BasketRepository = require("../repositories/BasketRepository");

const findOrCreateBasket = async (req, res) => {
    const email = req.email;

    try {
        await BasketRepository.findOrCreateBasket(email);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};

const addProductBasket = async (req, res) => {
    const email = req.email;
    const productId = req.body.productId; // Assuming the product ID is in the request body

    try {
        await BasketRepository.addProductBasket(email, productId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};
const listBasket = async (req, res) => {
    const email = req.email; // Assuming the user's email is available in the request

    try {
        const basket = await BasketRepository.findOrCreateBasket(email);
        const basketItems = await BasketRepository.listBasketItems(basket[0].basket_id); // Replace with actual function name from your repository
        res.status(200).json(basketItems);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};
const removeProductFromBasket = async (req, res) => {
    const email = req.email; // Assuming the user's email is available in the request
    const productId = req.params.productId; // Assuming the product ID is in the URL parameter

    try {
        const basket = await BasketRepository.findOrCreateBasket(email);
        await BasketRepository.removeProductFromBasket(basket[0].basket_id, productId);
        res.status(200).json({ message: 'Product removed from basket.' });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
};
// controllers/basketController.js
const connection = require('../config/db');







module.exports = {
    findOrCreateBasket,
    addProductBasket,
    listBasket,
    removeProductFromBasket
};
