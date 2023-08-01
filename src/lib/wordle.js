import { isWord, randomWord } from "./words.js"
import { writable } from "svelte/store";

export class Wordle {
    constructor() {
        this.secretWord = randomWord().toUpperCase();
        this.guesses = [];
        this.isSolved = false;
    }

    guess(word) {
        if (word.length !== this.secretWord.length) {
            return false;
        }
        if (!isWord(word)) {
            return false;
        }

        const newGuess = [];
        for (let c of word) {
            newGuess.push({
                letter: c,
                correctness: "grey",
            });
        }
        const remainingLetters = [];
        for (let i = 0; i < word.length; i += 1) {
            if (newGuess[i].letter === this.secretWord[i]) {
                newGuess[i].correctness = "green";
            } else {
                remainingLetters.push(this.secretWord[i]);
            }
        }

        this.isSolved = remainingLetters.length === 0;

        for (const letterGuess of newGuess) {
            if (letterGuess.correctness === "green") continue;

            const idx = remainingLetters.indexOf(letterGuess.letter);
            if (idx !== -1) {
                letterGuess.correctness = "yellow";
                remainingLetters.splice(idx, 1);
            }
        }
        this.guesses.push(newGuess)
        game.set(this)
        return true
    }

    newGame() {
        this.secretWord = randomWord().toUpperCase();
        this.guesses = [];
        this.isSolved = false;
        game.set(this)
    }
}

export const game = writable(new Wordle())
