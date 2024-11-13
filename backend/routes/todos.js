const express = require("express");
const { v4: uuidv4 } = require("uuid");
const authenticate = require("../middleware/auth");
const {
  addTodo,
  getTodosByUserId,
  updateTodo,
  deleteTodo,
} = require("../models/Todo");

const router = express.Router();

// Get all todos for a user
router.get("/", authenticate, (req, res) => {
  const { id } = req.user;
  getTodosByUserId(id, (err, todos) => {
    if (err) return res.status(400).json({ msg: "Error fetching todos" });
    res.json(todos);
  });
});

// Add a new todo
router.post("/", authenticate, (req, res) => {
  const { title, status } = req.body;
  const id = uuidv4();
  const userId = req.user.id;

  addTodo(userId, title, status || "pending", id);
  res.status(201).json({ msg: "Todo added successfully" });
});

// Update a todo
router.put("/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  updateTodo(id, title, status);
  res.json({ msg: "Todo updated successfully" });
});

// Delete a todo
router.delete("/:id", authenticate, (req, res) => {
  const { id } = req.params;

  deleteTodo(id);
  res.json({ msg: "Todo deleted successfully" });
});

module.exports = router;
