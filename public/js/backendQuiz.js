var backendQuiz = [
  {
    question:
      "WHich of the following accuratly describes the async...await syntax?",
    choices: [
      "1. async returns a promise; await is a promise",
      "2. async is a function; await is an operator",
      "3. async is an operator; await is a function",
      "4. async is a promise; await returns a promise",
    ],
    answer: "2. async is a function; await is an operator",
  },
  {
    question: "Which of the following is true with respect to Node?",
    choices: [
      "1. Every API of Node js are asynchronous.",
      "2. Node being a single thread uses async function calls to maintain concurrency.",
      "3. Node thread keeps an event loop and whenever any task get completed, fires the corresponding event, which signals the event listener function to get executed.",
      "4. All of the above",
    ],
    answer: "4. All of the above",
  },

  {
    question: "Which MySQL statement is used to update data in a database?",
    choices: ["1. MODIFY", "2. SAVE", "3. UPDATE", "4. INSERT"],
    answer: "3. UPDATE",
  },

  {
    question:
      "With MySQL, how do you select all the records from a table named 'Persons' where the value of the column 'FirstName' starts with an 'a'?",
    choices: [
      "1. SELECT * FROM Persons WHERE FirstName LIKE 'a%'",
      "2. SELECT * FROM Persons WHERE FirstName='%a%'",
      "3. SELECT * FROM Persons WHERE FirstName LIKE '%a'",
      "4. SELECT * FROM Persons WHERE FirstName='a'",
    ],
    answer: "1. SELECT * FROM Persons WHERE FirstName LIKE 'a%'",
  },

  {
    question:
      "Which of the following is true about the fork method of a child_process module?",
    choices: [
      "1. The fork() method os a special case of the spawn() to create Node processes",
      "2. The fork method returns object with a built in communicatiopn channel in addition to having all the methods in a normal ChildProcess instance",
      "3. Both of the above",
      "4. None of the above",
    ],
    answer: "3. Both of the above",
  },

  {
    question:
      "What does the function example() return when code async function example() {} is executed?",
    choices: ["1. undefined", "2. A function", "3. A string", "4. A promise"],
    answer: "4. A promise",
  },

  {
    question:
      "Which of the following is useful for awaiting mutiple promises where all are required but none depend on each other to execute",
    choices: [
      "1. setTimeout()",
      "2. Using the async...await syntax instead of a native promise syntax",
      "3. Promise.all()",
      "4. Using nested callback functions",
    ],
    answer: "3. Promise.all()",
  },

  {
    question: "The async function can return each of the following except:",
    choices: [
      "1. A promise",
      "2. A promise with a value of await",
      "3. A promise with a resolved value that is not a promise",
      "4. A promise with a resolved value of undefined",
    ],
    answer: "2. A promise with a value of await",
  },

  {
    question: "onreadystatechangeis a(n):",
    choices: ["1. property", "2. function", "3. event handler", "4. method"],
    answer: "3. event handler",
  },

  {
    question: "Which answer does NOT apply to the JavaScript Fetch API?",
    choices: [
      "1. It's powered by a XMLHttpRequest and used heavily in AJAX Programming",
      "2. Uses promises to handle asynchronous data",
      "3. The main fetch() function accepts a URL parameter",
      "4. Returns a promise that resolves to a response object or rejects with an error",
    ],
    answer:
      "1. It's powered by a XMLHttpRequest and used heavily in AJAX Programming",
  },
];
