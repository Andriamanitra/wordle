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
            addToGuess(ev.key.toUpperCase())();
        }
    }

    function addToGuess(letter) {
        return () => {
            if (currentGuess.length < $game.secretWord.length) {
                currentGuess = currentGuess + letter;
            }
        };
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

{#if !$game.isSolved}
    <Guess guess={currentGuessObject} class={guessClass} />
{/if}

<div class="keeb">
    <div class="row">
        {#each "QWERTYUIOP" as k}
            <button on:click={addToGuess(k)} class={$game.letterStatus[k]}>
                {k}
            </button>
        {/each}
        <button
            class="large"
            on:click={() => (currentGuess = currentGuess.slice(0, -1))}
        >
            ⌫
        </button>
    </div>
    <div class="row">
        {#each "ASDFGHJKL" as k}
            <button on:click={addToGuess(k)} class={$game.letterStatus[k]}>
                {k}
            </button>
        {/each}
        <button
            class="large"
            on:click={() => {
                if ($game.guess(currentGuess)) currentGuess = "";
            }}
        >
            ⏎
        </button>
    </div>
    <div class="row">
        {#each "ZXCVBNM" as k}
            <button on:click={addToGuess(k)} class={$game.letterStatus[k]}>
                {k}
            </button>
        {/each}
        <button class="large" on:click={() => (currentGuess = "")}>
            Clear
        </button>
    </div>
</div>
