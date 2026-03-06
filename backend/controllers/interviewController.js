const { GoogleGenerativeAI } = require("@google/generative-ai");
const Interview = require("../models/Interview");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



// 🚀 Generate Interview Question
exports.generateQuestion = async (req, res) => {
  try {

    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate ONLY one medium-level technical interview question for a ${role} developer. Do not add explanation.`
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.7
      }
    });

    const question = result.response.text().trim();

    // Save question in DB
    const interview = new Interview({
      userId: req.user.id,
      role,
      question
    });

    await interview.save();

    res.status(200).json({
      message: "Question generated",
      question
    });

  } catch (error) {
    console.error("Generate Question Error:", error);

    res.status(500).json({
      message: "AI error",
      error: error.message
    });
  }
};



// 🧠 Submit Answer + AI Evaluation
exports.submitAnswer = async (req, res) => {
  try {

    const { role, question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
              Evaluate this interview answer.

              Question: ${question}

              Candidate Answer: ${answer}

              Provide:
              1. Score out of 10
              2. Short feedback
              3. Improvement suggestion
              `
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.5
      }
    });

    const feedback = result.response.text();

    const score = Math.floor(Math.random() * 10) + 1;

    const interview = await Interview.create({
      userId: req.user.id,
      role,
      question,
      answer,
      feedback,
      score
    });

    res.status(200).json({
      message: "Answer evaluated",
      interview
    });

  } catch (error) {

    console.error("Submit Answer Error:", error);

    res.status(500).json({
      message: "Evaluation failed",
      error: error.message
    });

  }
};



// 📊 Interview Analytics
exports.analytics = async (req, res) => {
  try {

    const interviews = await Interview.find({
      userId: req.user.id
    });

    const total = interviews.length;

    const avgScore =
      total === 0
        ? 0
        : interviews.reduce((sum, i) => sum + (i.score || 0), 0) / total;

    res.status(200).json({
      totalInterviews: total,
      averageScore: avgScore.toFixed(2),
      interviews
    });

  } catch (error) {

    console.error("Analytics Error:", error);

    res.status(500).json({
      message: "Analytics error",
      error: error.message
    });

  }
};