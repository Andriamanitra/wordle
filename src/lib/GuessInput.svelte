<script>
    import Guess from "./Guess.svelte";
    import { game } from "./wordle.js";
    import { isWord } from "./words.js";

    let currentGuess = "";
    let currentGuessObject;
    let guessClass = "";

    function handleKeys(ev) {
        if (ev.key === "Backspace") {
            currentGuess = currentGuess.slice(0, -1);
        } else if (ev.key === "Enter") {
            if ($game.guess(currentGuess)) currentGuess = "";
        } else if (ev.key.match(/^[a-z]$/i)) {
            if (currentGuess.length < $game.secretWord.length) {
                currentGuess = currentGuess + ev.key.toUpperCase();
            }
        }
    }
    $: currentGuessObject = [...$game.secretWord].map((c, i) => ({
        letter: currentGuess[i] || " ",
        correctness: "white",
    }));
    $: if (currentGuess.length === $game.secretWord.length) {
        guessClass = isWord(currentGuess) ? "valid" : "invalid";
    } else {
        guessClass = "";
    }
</script>

<svelte:document on:keydown={handleKeys} />

<Guess guess={currentGuessObject} class={guessClass} />
