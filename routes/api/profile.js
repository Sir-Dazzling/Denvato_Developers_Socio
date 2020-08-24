const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationReuslt, validationResult} = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
    try 
    {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "avatar"]);

        if(!profile)
        {
            return res.status(400).json({message: "There is no profile for this user"});
        }

        res.json(profile);
    } catch (error) 
    { 
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route GET api/profile
// @desc Get all user profiles
// @access Public
router.get("/", async (req, res) => {
    try 
    {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        res.json(profiles); 
    } catch (error) 
    {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
    try 
    {
        const profile = await Profile.findOne({user: req.params.user_id}).populate("user", ["name", "avatar"]);

        if(!profile) res.status(400).json({message: "Profile not found"});
        res.json(profile); 
    } catch (error) 
    {
        console.error(error.message);
        if(error.kind == "ObjectId")
        {
            res.status(400).json({message: "Profile not found"});
        }
        res.status(500).send("Server Error");
    }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post("/", [auth, [
        check("status", "Status is required").not().isEmpty(),
        check("skills", "Skills is required").not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const 
    {
        company,
        website,
        location,
        bio,
        status,
        githubUsername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubUsername) profileFields.githubUsername = githubUsername;
    if(skills)
    {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    console.log(profileFields.social.twitter);

    try 
    {
        let profile = await Profile.findOne({user: req.user.id});

        if(profile)
        {
            // Update User profile
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true}); 
            return res.json(profile);
        }

        // Create User profile
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch (error) 
    {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;