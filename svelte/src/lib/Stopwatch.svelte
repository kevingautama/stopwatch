<script lang="ts">
  let timeInSecond = 0;
  let interval : number | undefined;
  let lapTimes : number[] = [];

  function generateTimerDisplay(timeInSeconds : number){
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds}`;
  };

  function startAndResume(){
    clearInterval(interval);

    interval = setInterval(() => {
        timeInSecond++;
    }, 1000);
  }

  function stop(){
    clearInterval(interval);
    interval = undefined;
  }

  function reset(){
    clearInterval(interval);
    interval = undefined;
    timeInSecond = 0;
    lapTimes = [];
  }

  function lap(){
    lapTimes = [...lapTimes, timeInSecond];
  }
</script>

<h2>{generateTimerDisplay(timeInSecond)}</h2>
<div style="display: flex; width: 100%">
    {#if interval === undefined}
    <button on:click={() =>startAndResume()} style="margin-left: auto">
        Start / Resume
    </button>
    {:else}
    <button on:click={() =>stop()} style="margin-left: auto">
        Stop
    </button>
    {/if}
    <button on:click={() =>reset()}>
        Reset
    </button>
    <button on:click={() =>lap()} style="margin-right: auto">
        Lap
    </button>
</div>
<div style="display:flex; width: 100%">
    <ul style="margin: 0 auto">
        {#each lapTimes as time}
            <li>{generateTimerDisplay(time)}</li>
        {/each}
    </ul>
</div>
