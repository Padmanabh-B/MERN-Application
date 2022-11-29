const express = require('express');
const { signout, signup,signin, isSignedIn } = require('../controller/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post("/signup", [
    check("name", "name should at least 3 character").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 3 }),
], signup);

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password filed is required").isLength({ min: 1 }),
], signin);







router.get("/signout", signout)


router.get("/test", isSignedIn,  (req,res)=>{
    res.json(req.auth)
})


module.exports = router;