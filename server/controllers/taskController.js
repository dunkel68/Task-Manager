const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  let query;

  // Filter by status if provided
  if (req.query.status) {
    query = { user: req.user.id, completed: req.query.status === 'completed' };
  } else {
    query = { user: req.user.id };
  }

  const tasks = await Task.find(query).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  if (req.body.dueDate) {
    req.body.dueDate = new Date(req.body.dueDate);
  }
  console.log('Received task data:', req.body);
  req.body.user = req.user.id;

  const task = await Task.create(req.body);
  console.log('Created task:', task);

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this task`, 401)
    );
  }

  await task.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Toggle task completion status
// @route   PATCH /api/tasks/:id/toggle
// @access  Private
exports.toggleTaskStatus = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  task.completed = !task.completed;
  await task.save();

  res.status(200).json({
    success: true,
    data: task,
  });
});