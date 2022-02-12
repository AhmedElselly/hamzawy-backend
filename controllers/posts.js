const Product = require('../models/product');
const {cloudinary} = require('../cloudinary');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: 'elselly',
//     api_key: '549562546544323',
//     api_secret: 'blNBwf7gQVPvt8LdgSN02BbSYnc',
//     // secure: true
// });

module.exports = {
    getProductById(req, res, next, id){
        Product.findById(id).exec((err, product) => {
            if(err) return res.json({err});
            req.product = product;
            next();
        });
    },
    async create(req, res){
        console.log(req.body)
        const product = await new Product(req.body);
        if(req.files){
            for(let image in req.files){
				console.log('here', req.files[image])
                let result = await cloudinary.uploader.upload(req.files[image].path);
				product.image.push(result.secure_url);
            }            
        }
        console.log(product)

        product.subCategory = req.body.subCategory;
        product.save((err, product) => {
            if(err) return res.status(400).json({err});
            return res.json(product);
        })        
    },

    async postIndex(req, res){
        const {query} = req;
        if(query.search || query.min || query.max){
			console.log('querymongo', query)
			console.log(req.query)
			
			console.log('req.body', req.query.min, req.query.max)
			const dbQuery = {'$or': []};
			// let dbQuery = [];
			const {search, min, max} = req.query;
			let regex = new RegExp(search,'i');
			if(search !== undefined){
				dbQuery['$or'].push(					
					{title: regex},
					{desc: regex},
					{category: regex},			
					{subCategory: regex},					
				)			
			}
	
			if(min){
				dbQuery['price'] = {$gte: Number(min)};
			}
			if(max){
				dbQuery['price'] = {$lte: Number(max)};
			}
			console.log('dbQuery', dbQuery)
			const products = await Product.paginate(dbQuery, {
				page: Number(query.page) || 1,
				limit: 8
			});
			return res.json(products);
		} else {
			console.log('in none query')
			const products = await Product.paginate({}, {
				page: Number(query.page) || 1,
				limit: 8
			});
			return res.json(products);
		}
    },

    async home(req, res){
        const products = await Product.find().limit(6).sort('-createdAt');
        return res.status(200).json(products);
    },

    async byCategories(req, res){
        const products = await Product.distinct('category');
        return res.json(products);
    },

    async allProducts(req, res){
        const products = await Product.find().sort('-createdAt');
        return res.status(200).json(products);
    },

    async byCategory(req, res){
        const products = await Product.find({category: req.params.name});
        return res.json(products);
    },

    async postId(req, res){
        const product = await req.product;
        return res.json(product);
    },

    async postUpdate(req, res){
        const product = await req.product;
        const {selected} = req.body;
        let imagesArray = selected.split(',')

        if(req.body.selected){
            for(let i = 0; i < imagesArray.length; i++){
                let index = product.image.indexOf(imagesArray[i]);
                product.image.pull(product.image[index]);
            }            
        }

        if(req.files){
            for(let image in req.files){
				console.log('here', req.files[image])
                let result = await cloudinary.uploader.upload(req.files[image].path);
				product.image.push(result.secure_url);
            }
        }

		product.title = req.body.title;
		product.subtitle = req.body.subtitle;
		product.desc = req.body.desc;
		product.price = req.body.price;
		product.category = req.body.category;
		product.subCategory = req.body.subCategory;
			
		product.save((err, product) => {
			if(err) return res.status(500).json({err});
			return res.json(product);
		});
    },

    async remove(req, res){
        const product = await req.product;
        product.remove((err, product) => {
            if(err) return res.json({err});
            return res.json({message: 'post removed successfully'})
        })
        // return res.json(products);
    }
}