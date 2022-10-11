const express = require('express')
const { Products } = require('../../api/api');

const router = express.Router();
const products = new Products();

router.get('/', async (req,res) =>{
    const prod = await products.getAll();
    return res.json(prod)
});

router.get('/:id', async (req,res)=>{
    const { id } = req.params;
    const prod = await products.getById(id);
    return res.json(prod)
});

router.post('/',async (req,res) =>{
    const {name,price,url,stock,descrip,codigo} = req.body;
    const newP = {
        name,
        price,
        url,
        stock,
        descrip,
        codigo
    };
    const newProduct = await products.newProduct(newP);
    return res.json(newProduct)
});

router.put('/:id', async (req,res) =>{
    const { params: { id }, body: { name, price, url, stock, descrip, codigo,} } = req;
    if ( !name || !price || !url || !stock || !descrip || !codigo) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
      };
    const updateProd = {
        name,
        price,
        url,
        stock,
        descrip,
        codigo
    };
    const newProduct = await products.updateProduct(id, updateProd);
    return res.json({ success: true, result: newProduct});
    
})

router.delete('/:id', async (req,res) =>{
    const { id } = req.params;
    const products = await api.deleteByID(id);
    return res.json({Products:products})
});

module.exports = router;


