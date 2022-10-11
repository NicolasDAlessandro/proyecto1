
const {readFile,writeFile} = require('fs/promises')

class Cart{
    constructor(){
        this.cart = []
    }

    async newCart(){
        try {
            const cart = await readFile('./data/cart.json', 'utf-8');
            const cartSave = JSON.parse(cart);
            const timeStamp = new Date();
            const newCart = {
                id: cartSave.length + 1,
                timeStamp: timeStamp.toLocaleString(),
                products: []
            };
            cartSave.push(newCart);
            writeFile('./data/cart.json', JSON.stringify(cartSave));
            return newCart.id           
        } catch (error) {
            return error
        }
    }

    async delete(id){
        try {
            const cart = await readFile('./data/cart.json', 'utf-8');
            const cartSave = JSON.parse(cart);
            const newCart = cartSave.filter(cart => cart.id != id);
            writeFile('./data/cart.json', JSON.stringify(newCart));
            return newCart
        } catch (error) {
            return error
        }
    }

    async getProducts(id){
        try {
            const cart = await readFile('./data/cart.json', 'utf-8');
            const cartSave = JSON.parse(cart);
            const filterCart = cartSave.filter( (cart) => cart.id == id);
            return filterCart.products       
        } catch (error) {
            return error
        }
    }

    async addToCart(id,idProd){
        try {
            const cart = await readFile('./data/cart.json', 'utf-8');
            const cartSave = JSON.parse(cart);
            const productsList = await readFile('./data/products.json','utf-8');
            const saveProducts = JSON.parse(productsList);
            const cartIndex = cartSave.findIndex((cart) => cart.id == id);
            const prodIndex = saveProducts.findIndex((prod) => prod.id == idProd);
            cartSave[cartIndex].products.push(saveProducts[prodIndex])
            writeFile('./data/cart.json', JSON.stringify(cartSave));
            return cartSave[cartIndex].products
        } catch (error) {
            return error
        }
    }

    async deleteProd(id,idProd){
        try {
            const cart = await readFile('./data/cart.json', 'utf-8');
            const cartSave = JSON.parse(cart);
            const cartIndex = cartSave.findIndex((cart) => cart.id == id);
            cartSave[cartIndex].products = cartSave[cartIndex].products.filter((prod) => prod.id != idProd);
            writeFile('./data/cart.json', JSON.parse(cartSave));          
        } catch (error) {
            return error
        }
    }
}

class Products{
    constructor(){
        this.products = []
    }

    async getAll(){
        try {
            const productsList = await readFile('./data/products.json','utf-8');
            const saveProducts = JSON.parse(productsList);
            return saveProducts            
        } catch (error) {
            return error
        }
    }

    async getById(id){
        try {
            const productsList = await readFile('./data/products.json','utf-8');
            const saveProducts = JSON.parse(productsList);
            const filterProd = saveProducts.filter( p => p.id == id );
            return filterProd
        } catch (error) {
            return error
        }
    }

    async newProduct(product){
        const productsList = await readFile('./data/products.json','utf-8');
        const saveProducts = JSON.parse(productsList);
        const timeStamp = new Date();
        const newProd = {
            id: saveProducts.length + 1,
            timeStamp: timeStamp.toLocaleString(),
            ...product
        };
        saveProducts.push(newProd);
        writeFile('./data/products.json',JSON.stringify(saveProducts));
        return newProd
    }

    async updateProd(id,prod){
        try {
            const saveProducts = await readFile('./data/products.json','utf-8')
            const productsList = JSON.parse(saveProducts);
            const productIndex = productsList.findIndex((prod) => prod.id == id);
            if (productIndex < 0) return res.status(404).json({ success: false, error: `Product id: ${productId} doesn't match!`});
            const newProduct = {
                ...productsList[productIndex],
                ...prod
            };
            productsList[productIndex] = newProduct;
            await writeFile('./data/products.json',JSON.stringify(productsList));
            return newProduct            
        } catch (error) {
            return error
        }
    }

    async deleteProd(id){
        try {
            const saveProducts = await readFile('./data/products.json','utf-8')
            const productsList = JSON.parse(saveProducts);
            const newList = productsList.filter(p => p.id != id);
            this.products = [...newList];
            await writeFile('./data/products.json',JSON.stringify(newList));
            return newList
        } catch (error) {
            return {error: error.message}
        }
    }
}

module.exports = { Products, Cart }