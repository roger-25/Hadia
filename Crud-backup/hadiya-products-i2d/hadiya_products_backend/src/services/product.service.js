import { ProductRepository } from '../database/index.js'
import { API400Error } from '../utils/errors/index.js';

export class ProductService {

    constructor() {
        this.repository = new ProductRepository();
    }

    async AddProduct (productData) {
        if(!productData){
            throw new API400Error('Request missing product data!')
        }
        const { name, price, currency, imageURL } = productData;
        if(!name || !price || !currency || !imageURL){
            //handle
            throw new API400Error('Required fields in product data missing!');
        }
        await this.repository.insertProduct({ name, price, currency, imageURL });
    }

    async GetProducts (pagination) {
        return await this.repository.fetchAllProducts(pagination);
    }

    async GetProductById (id) {
        if(!id){
            throw new API400Error('Request is missing product ID!');
        }
        return await this.repository.fetchProductById(id);
    }

    async UpdateProduct(productData){
        if(!productData){
            throw new API400Error('Request missing product data!')
        }
        await this.repository.updateProduct(productData);
    }

    async DeleteProduct(id){
        if(!id){
            throw new API400Error('Request is missing product ID!');
        }
        await this.repository.removeProduct(id);
    }

}