import { v4, validate, version } from 'uuid';
import { API400Error, API404Error } from '../../utils/errors/index.js';
import pkg from '../models/index.cjs';
const { sequelize } = pkg;
const Product = sequelize.models["Product"];
export class ProductRepository {
    async insertProduct (productData) {
        if(!productData){
            // handle
            throw new API400Error(`Request missing product data!`)
        }
        productData.uuid = v4();
        // await sequelize.Product.create(productData)
        await Product.create(productData);
    }
      
    async fetchAllProducts (pagination) {
        const limit = pagination.limit ? pagination.limit : 10;
        const offset = pagination.offset ? pagination.offset : 0;
        const count = await Product.count();
        const products = await Product.findAll({ offset: offset, limit: limit, order: [['updatedAt','DESC']] });
        if(!products || products.length === 0){
            throw new API404Error('Products not found!');
        }
        return {
            products: products,
            pagination: {
                limit: limit,
                offset: offset,
                totalRecordCount: count
            }
        };
    }

    async fetchProductById (id) {
        if(!validate(id) || version(id) !== 4){
            // handle error invalid id
            throw new API400Error('Invalid product ID!');
        }
        const product = await Product.findOne({where: { uuid: id }});
        if(!product){
            throw new API404Error(`Product with id ${id} not found!`);
        }
        return product;
    }

    async updateProduct(productData){
        if(!productData || !productData.id){
            throw new API400Error(`Request missing product data!`)
        }
        if(!validate(productData.id) || version(productData.id) !== 4){
            // handle error invalid id
            throw new API400Error('Invalid product ID!');
        }
        await Product.update(
            { name: productData.name, price: productData.price, currency: productData.currency, imageURL: productData.imageURL },
            { where: { uuid: productData.id } }
        );
    }

    async removeProduct(id){
        if(!id){
            throw new API400Error(`Request missing product id!`)
        }
        if(!validate(id) || version(id) !== 4){
            // handle error invalid id
            throw new API400Error('Invalid product ID!');
        }
        await Product.destroy({ where: { uuid: id } });
    }
}