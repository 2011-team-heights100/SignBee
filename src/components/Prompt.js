import React, { Component } from "react";

//first level
const lettersFromDatabase = ["A", "B", "C", "D"];

// function shuffle(a) {
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

export default class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFeedback: null,
      feedback: [], //thumbs up or down
      userAnswer: "",
      correctAnswer: [],
      wrongAnswer: [],
      levelEnd: false,
      score: 0,
    };
  }

  render() {
    const promptLetters = () => {
      //   lettersFromDatabase.forEach((char, i) => {
      //     console.log("what is this", char.shift());
      //     //console.log(this.state);
      //     //console.log(el);
      //     if (lettersFromDatabase.length) {
      //       setTimeout(promptLetters, 5000);
      //     }
      //     // setTimeout(() => {
      //     //   console.log(char);
      //     // }, 5000 * (i + 1));
      //   });
    };
    return <div prompt-appear>{promptLetters}</div>;
  }
}
