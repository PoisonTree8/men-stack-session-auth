const user = require('../models/user');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.post('/sign-in', async (req, res) => {
    const userInDataBase = await user.findOne({ username: req.body.username});
    if (!userInDataBase) {
        return res.send('username or password is invaild')
    }
const vaildPassword = bcrypt.compareSync(req.body.password, userInDataBase.password);

if (!vaildPassword) {
    return res.send('username or password is invaild');
}

})

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});


router.post('/sign-up', async (req,res) => {

 const userInDataBase = await user.findOne({username: req.body.username});

   if(userInDataBase){
    return res.send('username or password is invaild')
    }

    if (req.body.password !== req.body.confirmPassword) {
     return res.send("Password and Confirm Password must match");
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = await user.body.create(req.body);
res.send(req.body);
})
module.exports = router;
