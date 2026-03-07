const questions = {
  "frontend developer": [
    "What is the difference between useState and useEffect?",
    "Explain Virtual DOM in React.",
    "What are React hooks?",
    "What is prop drilling?"
  ],
  "backend developer": [
    "What is REST API?",
    "Explain middleware in Express.js.",
    "What is JWT authentication?",
    "Difference between SQL and NoSQL?"
  ],
  "full stack developer": [
    "Explain MVC architecture.",
    "What happens when you type a URL in the browser?",
    "Difference between client-side and server-side rendering?",
    "How does authentication work in web apps?"
  ]
};

function generateQuestion(role) {

  const key = role.toLowerCase();

  const list = questions[key] || questions["frontend developer"];

  return list[Math.floor(Math.random() * list.length)];

}

function evaluateAnswer(answer) {

  const score = Math.floor(Math.random() * 10) + 1;

  const feedback = [
    "Good answer but could include more technical depth.",
    "Nice explanation, try giving examples.",
    "Decent answer but missing some details.",
    "Very clear explanation."
  ];

  return {
    score,
    feedback: feedback[Math.floor(Math.random() * feedback.length)]
  };

}

module.exports = { generateQuestion, evaluateAnswer };