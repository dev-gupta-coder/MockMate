const { GoogleGenerativeAI } = require("@google/generative-ai");
const mockAI = require("../utils/mockAI");

const useMock = process.env.USE_MOCK_AI === "true";

let genAI;

if (!useMock) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// 🔥 Generate Question
async function generateQuestion(role) {

  if (useMock) {
    return mockAI.generateQuestion(role);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const result = await model.generateContent(
    `Generate ONLY one medium-level technical interview question for a ${role} developer.`
  );

  return result.response.text().trim();
}


// 🔥 Evaluate Answer
async function evaluateAnswer(question, answer) {

  if (useMock) {
    return mockAI.evaluateAnswer(answer);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest"
  });

  const result = await model.generateContent(
    `
    Evaluate this answer:

    Question: ${question}
    Answer: ${answer}

    Return:
    Score out of 10
    Short feedback
    `
  );

  return {
    score: Math.floor(Math.random() * 10) + 1, // optional parsing later
    feedback: result.response.text()
  };
}

module.exports = {
  generateQuestion,
  evaluateAnswer
};