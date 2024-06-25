const router = require("express").Router();
const user = require("../models/user");
const express = require('express');

router.route("/add").post((req, res) => {
    const { username, contact_number, address, email, password,birth} = req.body;

    const newUser = new user({
        username,
        address,
        email,
        contact_number,
        password
        //birth
    });

    newUser.save()
        .then(() => {
            res.json("customer added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error with adding user", error: err.message });
        });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Log the request body to see what data is being received
      console.log("Request Body:", req.body);

      // Find the user in the database by email
      const foundUser = await user.findOne({ email });

      // Log the found user to see if it's retrieving the correct user
      console.log("Found User:", foundUser);
  
      if (!foundUser) {
        // If user not found, return error
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      // Compare the passwords
      if (foundUser.password !== password) {
        // If password is not valid, return error
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }
  
      // If user is found and password is valid, return success message
      res.json({ success: true, message: 'Login successful', userId: foundUser._id });
      // You can redirect to the user's account page URL here
      // Example: res.redirect(`/account/${foundUser._id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'An error occurred. Please try again later.' });
    }
});
router.get("/", async (req, res) => {
    try {
        // Find all users in the database
        const allCustomers = await user.find({});
        res.status(200).json(allCustomers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { username, address, email, contact_number, password } = req.body;

    const updateUser = {
        username,
        contact_number,
        address,
        email,
        password
       // birth
    };

    try {
        const updatedUser = await user.findByIdAndUpdate(userId, updateUser);
        res.status(200).send({ status: "user updated", user: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error with updating user", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        await user.findByIdAndDelete(userId);
        res.status(200).send({ status: "user deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error with deleting user", error: err.message });
    }
});

router.route("/get/:id").get(async (req, res) => {
    const userId = req.params.id;

    try {
        const fetchedUser = await user.findById(userId);
        res.status(200).send({ status: "user fetched", user: fetchedUser });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error with fetching user", error: err.message });
    }
});


router.get("/MyAccount/:email", async (req, res) => {
    const email = req.params.email;
  
    try {
      // Find the user in the database by email
      const User = await user.findOne({ email });
  
      if (!User) {
        // If user not found, return a 404 error
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      // If user is found, return the user details
      res.status(200).json({ success: true, User });
    } catch (err) {
      // If an error occurs, return a 500 error
      console.error(err);
      res.status(500).json({ success: false, error: 'An error occurred. Please try again later.' });
    }
});

module.exports = router;
