const question = document.getElementById("question");
const time = document.querySelector(".select");
const options = Array.from(document.getElementsByClassName("default"));
var data;
var timer;
var correctAnswers_exported, incorrectAnswers_exported;
var counter = 0,
  incorrectAnswers = 0,
  correctAnswers = 0;
var check_ifClicked = false;
const random = Math.ceil(Math.random() * 3);
var randomIndex = Math.round(Math.random() * 17);
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
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple"
    );

    if (!response.ok) {
      throw new Error("An Error Occurred");
    }

    data = await response.json();
    displayQuestion();
    countDown();
    const allAnswers = [data.results[randomIndex].correct_answer].concat(
      data.results[randomIndex].incorrect_answers
    );
    const answers = swap(allAnswers);
    options.forEach((button, index) => {
      button.innerHTML = answers[index];
      button.addEventListener("click", function (e) {
        check_ifClicked = true;
        check(data.results[randomIndex].correct_answer, e);
      });
    });
  } catch (err) {
    console.error(err);
  }
});
function displayQuestion() {
  counter++;
  localStorage.setItem("count", counter);
  question.innerHTML = data.results[randomIndex].question;
}

function check(correct_answer, userChoice) {
  options.forEach((button) => {
    button.classList.remove("default");
    if (button.textContent === correct_answer) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });
  console.log(correct_answer);
  disable();
  if (!check_ifClicked) alert("You didn' clicked any option");
  else if (userChoice.target.textContent === correct_answer) {
    correctAnswers++;
    localStorage.setItem("correct", correctAnswers);
  } else {
    incorrectAnswers++;
    localStorage.setItem("incorrect", incorrectAnswers);
  }
  setTimeout(() => {
    nextQuestion();
  }, 2500);
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
    if (timeleft <= 30 && timeleft > 10) {
      time.classList.remove("timer");
      time.setAttribute("id", "orange");
    } else if (timeleft <= 10) {
      time.removeAttribute("id");
      time.setAttribute("id", "red");
    }
  }, 1000);
}

function nextQuestion() {
  if (parseInt(localStorage.getItem("count"), 10) === 20) {
    correctAnswers_exported = parseInt(localStorage.getItem("correct"), 10);
    incorrectAnswers_exported = parseInt(localStorage.getItem("incorrect"), 10);
    console.log(
      console.log(correctAnswers_exported, incorrectAnswers_exported)
    );
    window.correctAnswers_exported = correctAnswers_exported;
    window.incorrectAnswers_exported = incorrectAnswers_exported;
  } else {
    if (!time.classList.contains("timer")) {
      time.removeAttribute("id");
      time.setAttribute("class", "timer");
    }
    const event = new Event("DOMContentLoaded");
    options.forEach((button) => {
      button.classList.remove("wrong", "correct");
      button.classList.add("default");
      button.disabled = false;
    });
    document.dispatchEvent(event);
  }
}
