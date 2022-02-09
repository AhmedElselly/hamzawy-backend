const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = {
    getUserById(req, res, next, id) {
        User.findById(id).exec((err, user) => {
            if(err) return res.json({err});
            req.user = user;
            next();
        });
    },
    async login(req, res){
        const {user, err} = await User.authenticate()(req.body.email, req.body.password);

        if(!user || err) return res.status(400).json({error: 'email and password do not match!'});
        
        const token = await jwt.sign({email: user.email, _id: user._id}, process.env.SECRETKEY);

        // req.login();
        return res.json({token, user});
    },

    async signup(req, res){
        const user = await new User(req.body);
        await user.setPassword(req.body.password);

        user.save((err, user) => {
            if(err) return res.json({err});
            return res.json(user);
        });
    },

    async updateUser(req, res) {
        const user = await req.user;
        user.changePassword(user.password, req.body.password);
        user.save((err, user) => {
            if(err) return res.json({err});
            return res.json(user);
        })
    }
}