const question = document.getElementById("question");
const time = document.getElementById("timer")
const options = Array.from(document.getElementsByTagName("button"));
var counter = 0, incorrectAnswers = 0, correctAnswers = 0
var timer;
const random = Math.ceil(Math.random() * 3);
function swap(array) {
  let current_index = array.length;
  while (current_index !== 0) {
      let random_index = Math.floor(Math.random() * current_index);
      current_index--;
      [array[current_index], array[random_index]] = [array[random_index], array[current_index]];
  }
  return array;
}
window.onload = async function () {
  counter++
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple"
    );

    if (!response.ok) throw new Error("An Error Occurred");

    const data = await response.json();
    question.innerHTML = `${counter}. ${data.results[0].question}`;
    countDown()
    const allAnswers = [data.results[0].correct_answer].concat(
      data.results[0].incorrect_answers
    );
    const answers = swap(allAnswers);
    options.forEach((button, index) => {
      button.innerHTML = answers[index];
      button.addEventListener("click", function(){
        check(data.results[0].correct_answer)
      })
    });
  } catch (err) {
    console.error(err);
  }
};
function check(correct_answer) {
  options.forEach(button => {
    if (button.textContent === correct_answer) {
      button.style.backgroundColor = "green";
    } else {
      button.style.backgroundColor = "red";
    }
  });
  console.log(correct_answer)
  disable()
}
function disable() {
  options.forEach(button => {
     button.disabled = true
     button.classList.remove("hover")
     clearInterval(timer)
  })
}
function countDown() {
   let timeleft = 50
   clearInterval(timer)
   time.innerHTML = timeleft
   timer = setInterval(()=>{
     timeleft--
     time.innerHTML = timeleft
     if(timeleft <= 0){
       clearInterval(timer)
       alert("Times Up !")
       disable()
       check()
     }
   }, 1000)
}