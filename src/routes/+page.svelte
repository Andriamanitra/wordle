<script>
    import Guess from "$lib/Guess.svelte";
    import { game } from "$lib/wordle.js";
    import GuessInput from "../lib/GuessInput.svelte";

    function handleKeys(ev) {
        if (ev.key === "F1") {
            alert($game.secretWord);
        }
        if (ev.key === "F2") {
            $game.newGame();
        }
    }
</script>

<svelte:document on:keydown={handleKeys} />

<h1>Yet Another Wordle Clone</h1>
{#each $game.guesses as guess}
    <Guess {guess} />
{/each}

{#if $game.isSolved}
    <div>You win!</div>
    <button on:click={() => $game.newGame()}> Play again </button>
{/if}

<GuessInput />
