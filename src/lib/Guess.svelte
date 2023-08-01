<script>
    export let guess = [];
</script>

<div class="guess center flex-row {$$props.class}">
    {#each guess as g}
        <span class="letter {g.correctness}">{g.letter}</span>
    {/each}
</div>
