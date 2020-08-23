const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");

const User = require("../../models/User");

// @route GET api/auth/login
// @desc login user
// @access Public
router.get("/login/", (req, res) => res.send("Login Route"));

// @route POST api/auth/register
// @desc register User
// @access Public
router.post("/register/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with a minimum of 6 or more characters").isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);

    // Responding with error code of 400 for bad request
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try 
    {
        // Checking if user exists in db
        let user = await User.findOne({email});

        if(user)
        {
            return res.status(400).json({errors: [{message: "User already exists"}]});
        }

        // Getting users gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        });

        // Creating new instance of user
        user = new User({
            name, email, avatar, password
        });

        // Hashing and Encrypting password using Bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Returning jsonwebtoken with a payload
        const payload = 
        {
            user: 
            {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 360000}, 
        (error, token) => {
            if(error) throw error;
            res.json({token});
        });

    } catch (error) 
    {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;