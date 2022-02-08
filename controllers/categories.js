const Category = require('../models/category');

module.exports = {
    async create(req, res){
        const category = await new Category(req.body);

        category.save((err, category) => {
            if(err) return res.json({err});
            return res.json(category);
        });
    },

    async categoryIndex(req, res){
        const categories = await Category.find().limit(7);
        
        return res.json(categories);
    },

    async categoryUpdate(req, res){
        const category = await Category.findOne({name: req.body.name});
        
        category.subCategory.push(req.body.subCategory);

        category.save((err, category) => {
            if(err) return res.json({err});
            return res.json(category);
        })
    },

    async subCategory(req, res){
        const category = await Category.findOne({main: `${req.params.category}`});
        return res.json(category);
    }
}