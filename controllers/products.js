const { validationResult } = require('express-validator');

const Product = require('../models/product');

const sortOptions = {
    PriceLowToHigh: {price: 1},
    PriceHighToLow: {price: -1},
    AvgCustomerReview: {rating: -1}
};

exports.getProducts = async (req, res, next) => {
    try {
        const search = req.query.search;
        const sortBy = req.query.sort;
        const returnOnlyNames = (req.query.namesOnly === 'true');
        const currentPage = req.query.page || 1;
        const perPage = 12;

        let filter = {};
        let fields = '';
        let sort = {};

        if (search) {
            filter.name = new RegExp(search, 'i');
        }
        if (returnOnlyNames) {
            fields = 'name';
        }
        if (sortBy && sortOptions[sortBy]) {
            sort = sortOptions[sortBy];
        }
        
        const totalItems = await Product.find(filter).countDocuments();
        const products = await Product.find(filter, fields)
            .sort(sort)
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
        res.status(200).json({
            products: products,
            totalItems: totalItems
        });
    } catch (error) {
       next(error);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            const error = new Error('The product not found.');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(product);

    } catch (error) {
        next(error);
    }
};