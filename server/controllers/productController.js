const ProductRepository = require("../repositories/ProductRepository");

const getProduct = async (req, res) => {
    try {
        const result = await ProductRepository.getProduct();
        res.send(result);
    } catch (error) {
        console.error("Error in getProduct:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};

module.exports = {
    getProduct
};
