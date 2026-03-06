const OpenAI = require("openai");
const Interview = require("./models/Interview");

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate Question
exports.generateQuestion = async (req, res) => {

  const { role } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Generate one medium level technical interview question for ${role} developer.`
      }
    ],
  });

  res.json({ question: completion.choices[0].message.content });
};


// Submit Answer
exports.submitAnswer = async (req, res) => {

  const { role, question, answer } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
        Question: ${question}
        Candidate Answer: ${answer}

        Evaluate and give feedback and score out of 10
        `
      }
    ],
  });

  const feedback = completion.choices[0].message.content;

  const interview = await Interview.create({
    userId: req.user,
    role,
    question,
    answer,
    feedback,
    score: Math.floor(Math.random() * 10) + 1
  });

  res.json(interview);
};


// 📊 Analytics Function
exports.analytics = async (req, res) => {

  // Find interviews of logged-in user
  const interviews = await Interview.find({ userId: req.user });

  // Total interviews
  const total = interviews.length;

  // Average score calculation
  const avgScore =
    interviews.reduce((sum, interview) => sum + interview.score, 0) / total || 0;

  // Send analytics response
  res.json({
    total,
    avgScore,
    interviews
  });
};