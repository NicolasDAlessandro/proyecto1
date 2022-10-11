const express = require('express');
const { Cart } = require('../../api/api');

const router = express.Router();
const cart = new Cart();

router.post('/', async (req,res) =>{
    const newCart = await cart.newCart();
    return res.json({IdCarrito: newCart})
});

router.delete('/:id', async (req,res) =>{
    const { id } = req.params;
    const deleteCart = await cart.delete(id)
    return res.json(deleteCart)
});

router.get('/:id/productos', async (req,res) =>{
    const { id } = req.params;
    const products = await cart.getProducts(id);
    return res.json(products)
});

router.post('/:id/products/:id_prod', async (req,res) => {
    const { id, id_prod } = req.params;
    const cartAdd = cart.addToCart(id,id_prod);
    return res.json(cartAdd)
});

router.delete('/:id/products/:id_prod', async (req,res) =>{
    const { id, id_prod} = req.params;
    const deleteFromCart = cart.deleteProd(id,id_prod);
    return res.json(deleteFromCart)
});

module.exports = router;