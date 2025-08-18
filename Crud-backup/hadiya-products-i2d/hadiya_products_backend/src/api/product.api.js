import { ProductService } from '../services/index.js';
import { Logger, HttpLogger } from '../utils/logger.js';

const SuccessCode = {
    'OK': 200,
    'CREATED': 201
}

export async function ProductAPI (app) {

    const productService = new ProductService();

    app.post('/products', async (req, res, next) => {
        try{
            const productData = {
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency,
                imageURL: req.body.imageURL
            }
            await productService.AddProduct(productData);
            const info = `${new Date()} Request id: ${req.id}. POST /products ${SuccessCode.CREATED} Product added successfully`;
            res.status(SuccessCode.CREATED).send({
                message: "Product added successfully"
            })
            Logger.info(info);
        }
        catch(err) {
            // handle
            next(err);
        }
        
    });

    app.get('/products', async (req, res, next) => {
        try{

            if(req.query.id){
                const product = await productService.GetProductById(req.query.id);
                const info = `${new Date()} Request id: ${req.id}. GET /products ${SuccessCode.OK} Product with id ${req.query.id} fetched successfully`;
                res.status(SuccessCode.OK).json({
                    message: "Success",
                    data: product
                });
                Logger.info(info);
            }
            else{
                let pagination = {};
                if(req.query.limit && req.query.offset){
                    pagination.limit = +req.query.limit;
                    pagination.offset = +req.query.offset
                }
                const products = await productService.GetProducts(pagination);
		const info = `${new Date()} Request id: ${req.id}. GET /products ${SuccessCode.OK} Products fetched successfully`;
                res.status(SuccessCode.OK).json({
                    message: "Success",
                    data: products
                })
                // Logger.info(info)
                HttpLogger.log(info, { req, res })
            }
        }
        catch(err){
            next(err);
        }
    });

    app.put('/products', async (req, res, next) => {
        try{
            const data = {
                id: req.query.id,
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency,
                imageURL: req.body.imageURL
            }
            await productService.UpdateProduct(data);
            const info = `${new Date()} Request id: ${req.id}. PUT /products ${SuccessCode.OK} Product with id ${req.query.id} updated successfully`;
            res.status(SuccessCode.OK).json({
                message: "Record updated successfully"
            });
            Logger.info(info);
        }
        catch(err){
            next(err);
        }
    })

    app.delete('/products', async (req, res, next) => {
        try{
            await productService.DeleteProduct(req.query.id);
            const info = `${new Date()} Request id: ${req.id}. DEL /products ${SuccessCode.OK} Product with id ${req.query.id} deleted successfully`;
            res.status(SuccessCode.OK).json({
                message: "Record deleted successfully"
            })
            Logger.info(info);
        }
        catch(err){
            next(err);
        }
    })

}
