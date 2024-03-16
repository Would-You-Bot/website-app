const questions = [
  "Would you rather always be 10 minutes late or 20 minutes early?",
  "Would you rather be able to speak all languages or be able to play every musical instrument?",
  "Would you rather have a rewind button or a pause button in your life?",
  "Would you rather have super strength or super speed?",
  "Would you rather live in a haunted house or a house with no electricity?",
  "Would you rather have no one show up to your wedding or to your funeral?",
  "Would you rather not be able to taste or not be able to smell?",
  "Would you rather always have to say everything on your mind or never speak again?",
  "Would you rather be famous when you are alive and forgotten when you die, or unknown when you are alive but famous after you die?",
];

export const getRandomQuestion = () =>
  questions[Math.floor(Math.random() * questions.length)];
