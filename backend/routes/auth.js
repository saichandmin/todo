const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const { v4: uuidv4 } = require("uuid");
const { createUser, getUserByEmail } = require("../models/User");

const router = express.Router();
const secret = "your-secret-key"; // Store it in an env variable for production

// Signup route
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  getUserByEmail(email, async (err, user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    createUser(id, email, hashedPassword, name);
    res.status(201).json({ msg: "User created successfully" });
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, user) => {
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) return res.status(400).json({ msg: "Invalid credentials" });

      // Create JWT token
      const payload = { id: user.id };
      const token = jwt.encode(payload, secret);

      res.json({ token });
    });
  });
});

module.exports = router;
