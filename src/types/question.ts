export interface Question {
  question: HTMLElement;
  choices: [];
  answer: number;
}

export interface Quiz {
  quizId: string;
  quizURL: string;

  currentQuestion: HTMLElement;
  availableQuestions: [];

  mistakeCounter: number;
  questionCounter: number;
  mistakeCounterElement: HTMLElement;
  questionCounterElement: HTMLElement;
}
