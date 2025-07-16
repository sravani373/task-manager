const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
const { protect } = require('../middleware/auth');


router.use(auth);

// router.get('/', async (req, res) => {
//   const tasks = await Task.find({ userId: req.user.id });
//   res.json(tasks);
// });

router.post('/', protect, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      userId: req.user.id, // ⬅️ Associate with logged-in user
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/:id', protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.userId.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});
router.delete('/:id', protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.userId.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not authorized' });

  await task.remove();
  res.json({ message: 'Task deleted' });
});


// router.post('/', async (req, res) => {
//   const { title, description, status } = req.body;
//   const task = await Task.create({ title, description, status, userId: req.user.id });
//   res.status(201).json(task);
// });

// router.put('/:id', async (req, res) => {
//   const updated = await Task.findOneAndUpdate(
//     { _id: req.params.id, userId: req.user.id },
//     req.body,
//     { new: true }
//   );
//   res.json(updated);
// });

// router.delete('/:id', async (req, res) => {
//   await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//   res.json({ message: 'Task deleted' });
// });

module.exports = router;
