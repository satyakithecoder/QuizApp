function getResults() {
  return {
    correctAnswers_exported: window.correctAnswers_exported,
    incorrectAnswers_exported: window.incorrectAnswers_exported,
  };
}

var correctAnswers = getResults().correctAnswers_exported;
var incorrectAnswers = getResults().incorrectAnswers_exported;
console.log(correctAnswers, incorrectAnswers);
