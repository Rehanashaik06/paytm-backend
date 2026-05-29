const Feedback = require("../models/Feedback");

// Submit Feedback
exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);

    const savedFeedback = await feedback.save();

    res.status(201).json({
      message: "Feedback Submitted Successfully",
      data: savedFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Feedbacks
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};