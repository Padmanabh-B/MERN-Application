const User = require("../models/user")
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt")


exports.signup = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }



    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ err: "NOT able to save user in DB" })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}


exports.signin = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }


    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User Email Does not Exist"
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password Do not Match"
            })

        }

        // Create Token based on user id
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        //Put Token in Cookies
        res.cookie("token", token, { expire: new Date() + 9999 })

        //res response to front-end
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } })

    })


}

exports.signout = (req, res) => {
    res.clearCookie("token")

    res.json({
        message: "User Signout successfully",
    })
}


//Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})



//Custom Middlewares

exports.isAuthenticated = (req, res, next) => {
    // profile and signin middleware and it comesfrom frontend
    let checker = req.profile && req.auth && req.profile.id === req.auth._id
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }

    next();
}

//Admin
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are Not ADMIN, Access Denied"
        });
    }

    next();
}