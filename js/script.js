const question = document.getElementById("question");
const time = document.getElementById("timer");
const options = Array.from(document.getElementsByClassName("default"));
var counter = 0,
  incorrectAnswers = 0,
  correctAnswers = 0;
var timer;
var questionsArray = [];
var correctAnswersArray = [];
//2D array
var incorrectAnswersArray = [];
const random = Math.ceil(Math.random() * 3);
function swap(array) {
  let current_index = array.length;
  while (current_index !== 0) {
    let random_index = Math.floor(Math.random() * current_index);
    current_index--;
    [array[current_index], array[random_index]] = [
      array[random_index],
      array[current_index],
    ];
  }
  return array;
}
window.onload = async function () {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple"
    );

    if (!response.ok) throw new Error("An Error Occurred");

    const data = await response.json();
    for (let i = 1; i < data.results.length; i++) {
      questionsArray.push(data.results[i].question);
      correctAnswersArray.push(data.results[i].correct_answer);
      incorrectAnswersArray.push(data.results[i].incorrect_answers);
    }
    displayQuestion(counter);
    countDown();
    const allAnswers = [data.results[0].correct_answer].concat(
      data.results[0].incorrect_answers
    );
    const answers = swap(allAnswers);
    options.forEach((button, index) => {
      button.innerHTML = answers[index];
      button.addEventListener("click", function () {
        check(data.results[0].correct_answer);
      });
    });
  } catch (err) {
    console.error(err);
  }
};
function displayQuestion(count) {
  question.innerHTML = `${count + 1}. ${questionsArray[counter]}`;
}
function check(correct_answer) {
  options.forEach((button) => {
    if (button.textContent === correct_answer) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });
  console.log(correct_answer);
  disable();
  setTimeout(() => {
    nextQuestion();
  }, 4000);
}
function disable() {
  options.forEach((button) => {
    button.disabled = true;
    button.classList.remove("hover");
    clearInterval(timer);
  });
}
function countDown() {
  let timeleft = 50;
  clearInterval(timer);
  time.innerHTML = timeleft;
  timer = setInterval(() => {
    timeleft--;
    time.innerHTML = timeleft;
    if (timeleft <= 0) {
      clearInterval(timer);
      alert("Times Up !");
      disable();
      check();
    }
  }, 1000);
}

function nextQuestion() {
  if (counter < 19) {
    displayQuestion(counter + 1);
    const allAnswers = [correctAnswersArray[counter - 1]].concat(
      incorrectAnswersArray[counter - 1]
    );
    const answers = swap(allAnswers);
    options.forEach((button, index) => {
      button.classList.remove("wrong", "correct");
      button.classList.add("hover", "default");
      button.innerHTML = answers[index];
      button.disabled = false;
      button.style.backgroundColor = "white";
      button.addEventListener("click", function () {
        check(correctAnswersArray[counter - 1]);
      });
    });
    countDown();
  } else {
    clearInterval(timer);
    alert("Game Over");
  }
}