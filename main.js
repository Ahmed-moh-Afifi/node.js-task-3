import { promises as readline } from "node:readline";
import { promises as fs } from "fs";

const readlineInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  readlineInstance.question(question).then((answer) => {
    if (!answer.trim()) {
      askQuestion(question + "(Please enter a valid input): ");
      return;
    }

    askForMethod(answer);
  });
}

function askForMethod(answer) {
  readlineInstance
    .question("Which method do you want to use? (then/async): ")
    .then((method) => {
      if (method === "then") {
        writeFileWithThen(answer);
      } else if (method === "async") {
        writeFileWithAsync(answer);
      } else {
        console.error("Invalid method");
        askForMethod(answer);
        return;
      }
    });
}

function writeFileWithThen(answer) {
  fs.appendFile("user_data.txt", answer + "\n")
    .then(() => {
      console.log("Data written to file");
      readlineInstance.close();
    })
    .catch((err) => {
      console.error("Error writing to file");
    });
}

async function writeFileWithAsync(answer) {
  try {
    await fs.appendFile("user_data.txt", answer + "\n");
    console.log("Data written to file");
    readlineInstance.close();
  } catch (err) {
    console.error("Error writing to file");
  }
}

askQuestion("What is your name? ");
