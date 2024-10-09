const question = document.getElementById("question");
const random = Math.ceil(Math.random() * 3);
const options = Array.from(document.getElementsByTagName("button"));
function swap(array) {
  let current_index = array.length;
  while (current_index != 0) {
    let random_index = Math.floor(Math.random() * array.length);
    current_index--;
    let temp = array[current_index];
    array[current_index], (array[random_index] = array[random_index]), temp;
  }
  return array;
}
window.onload = async function () {
  try {
    console.log(random);
    const response = await fetch(
      "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple"
    );

    if (!response.ok) throw new Error("An Error Occurred");

    const data = await response.json();
    question.innerHTML = `${data.results[0].question}`;
    const allAnswers = [data.results[0].correct_answer].concat(
      data.results[0].incorrect_answers
    );
    const answers = swap(allAnswers);
    options.forEach((button, index) => {
      button.innerHTML = answers[index];
    });
  } catch (err) {
    console.error(err);
  }
};
