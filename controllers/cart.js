const ObjectId = require('mongoose').Types.ObjectId; 
const CartModels = require('../models/cart');
const Cart = CartModels.Cart;
const CartItem = CartModels.CartItem;

exports.addItemToCart = async (req, res, next) => {
    try {
        let userCart = await Cart.findOne({userId: new ObjectId(req.userId)});

        if (!userCart) {
            userCart = new Cart({
                userId: req.userId,
                items: []
            });
        }

        const exsitProduct = userCart.items.filter((x) => {
            return x._doc.productId.toString() === req.body.productId;
        });

        if (exsitProduct.length > 0) {
            const productQty = exsitProduct[0]._doc.qty + 1;
            await Cart.updateOne(
                {userId: new ObjectId(req.userId), "items.productId": new ObjectId(req.body.productId)}, 
                {$set: {"items.$.qty": productQty}}
            );

        } else {
            const cartItem = new CartItem({
                productId: req.body.productId,
                name: req.body.name,
                price: req.body.price,
                qty: req.body.qty
            });
            userCart.items.push(cartItem);
            await userCart.save();
        }

        res.status(201).json({
            message: 'New item added successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getUserCart = async (req, res, next) => {
    try {
        const userId = req.userId;
        const userCart = await Cart.findOne({userId: new ObjectId(userId)});

        if (!userCart) {
            res.status(200);
        }

        res.status(200).json(userCart.items);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.removeCartItem = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const userCart = await Cart.findOne({userId: new ObjectId(req.userId)});

        if (!userCart) {
            const error = new Error('User cart not found.');
            error.statusCode = 404;
            throw error;
        }

        await Cart.updateOne(
            {userId: new ObjectId(req.userId)},
            {$pull: {items: {productId: new ObjectId(productId)}}});

        res.status(201).json({
            message: 'Cart item removed successfully!'
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.updateCartItemQty = async (req, res, next) => {
    try {
        const userId = req.userId;
        const productId = req.body.productId;
        const productQty = req.body.productQty;
        const userCart = await Cart.findOne({userId: new ObjectId(userId)});

        if (!userCart) {
            const error = new Error('User cart not found.');
            error.statusCode = 404;
            throw error;
        }

        const result = await Cart.updateOne(
            {userId: new ObjectId(userId), "items.productId": new ObjectId(productId)}, 
            {$set: {"items.$.qty": productQty}}
        );

        res.status(201).json({
            message: 'Cart item updated successfully!'
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
