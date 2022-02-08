const router = require("express").Router();
const passwordHash = require("password-hash");
const { generateAccessToken } = require("../helpers/jwtHelper");
const userModel = require('../models/userModel');

router.get('/', (req, res) => {
    res.send('user get request');
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const isverifiedUser = await userModel.findOne({ email });
        if (!isverifiedUser) return res.send('user not registerd yet....');

        const isloggedIn = passwordHash.verify(password, isverifiedUser.password);
        if(!isloggedIn) return res.send('your password incorrect....');

        const result = {
            status: 'success',
            token: generateAccessToken({id: isverifiedUser._id, name: isverifiedUser.name }),
            refreshToken: generateAccessToken({id: isverifiedUser._id, name: isverifiedUser.name })
        }

        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
});

router.post('/', async (req, res) => {
   try {
       const { name, email, password } = req.body;
       const user = new userModel({
           name,
           email,
           password: passwordHash.generate(password)
       });
       await user.save();
       res.send({ status: 'Success' });
   } catch (err) {
       res.send(err.message);
   }
});

router.put('/', (req, res) => {
    res.send('user put request');
});

router.delete('/', (req, res) => {
    res.send('user delete request');
});

module.exports = router;