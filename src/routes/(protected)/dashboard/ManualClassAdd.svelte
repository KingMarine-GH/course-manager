<script lang="ts">
    import { writable } from 'svelte/store';

    // Time validation (24 hour time)
    const timeArray = writable<[string, string][]>([['', '']]);
    const timeValidation = (time: string) => {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(time);
    };

    let forcedError = false;
</script>

<form
    method="POST"
    on:submit|preventDefault
    action="?/class"
    class="grid grid-cols-[repeat(9,auto)] gap-x-2 gap-y-1 form-control"
>
    <label class="self-center text-center row-span-2" for="classnumber"> Class Number </label>
    <label class="self-center text-center row-span-2" for="coursecode"> Course Code </label>
    <label class="self-center text-center row-span-2" for="section"> Section </label>
    <label class="self-center text-center row-span-2" for="faculty"> Faculty </label>
    <label class="self-center text-center" for="days"> Day/s </label>
    <label class="self-center text-center row-span-2" for="timestart"> Time Start </label>
    <label class="self-center text-center row-span-2" for="timeend"> Time End </label>
    <label class="self-center text-center row-span-2" for="room"> Room </label>
    <label class="self-center text-center row-span-2" for="remarks"> Remarks </label>
    <textarea
        class="row-start-3 text-center resize-none font-mono textarea input-bordered"
        rows="1"
        cols="7"
        name="class-number"
        id=""
    />
    <textarea
        class="row-start-3 text-center resize-none font-mono textarea input-bordered"
        rows="1"
        cols="10"
        name="course-code"
        id=""
    />
    <textarea
        class="row-start-3 text-center resize-none font-mono textarea input-bordered"
        rows="1"
        cols="10"
        name="section"
        id=""
    />
    <textarea
        class="row-start-3 text-center resize-none font-mono textarea input-bordered"
        rows="1"
        cols="50"
        name="faculty"
        id=""
    />
    <div class="grid grid-cols-6 text-center gap-x-1 gap-y-1 col-start-5">
        <!-- Ignore as they should not be clickable -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>M</label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>T</label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>W</label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>H</label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>F</label>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>S</label>
    </div>
    {#each $timeArray as [timeStart, timeEnd], i}
        {@const rowNumber = i * 2 + 3}
        <div
            class="row-start-{rowNumber} col-start-5 grid grid-cols-6 text-center gap-x-1 gap-y-1 place-items-center"
        >
            <input class="checkbox" type="checkbox" name="days-{i}" id="M" />
            <input class="checkbox" type="checkbox" name="days-{i}" id="T" />
            <input class="checkbox" type="checkbox" name="days-{i}" id="W" />
            <input class="checkbox" type="checkbox" name="days-{i}" id="H" />
            <input class="checkbox" type="checkbox" name="days-{i}" id="F" />
            <input class="checkbox" type="checkbox" name="days-{i}" id="S" />
        </div>
        <textarea
            class="row-start-{rowNumber} col-start-6 block text-center resize-none font-mono textarea input-bordered"
            rows="1"
            cols="5"
            name="time-start-{i}"
            bind:value={timeStart}
            class:input-error={!timeValidation(timeStart) && timeStart != ''}
            id=""
        />
        <label
            class="label row-start-[{rowNumber + 1}] col-start-6"
            for=""
            class:invisible={!(!timeValidation(timeStart) && (timeStart != '' || forcedError))}
        >
            <span class="label-text-alt text-error"> <b>HH:MM</b> format </span>
        </label>
        <textarea
            class="row-start-{rowNumber} col-start-7 block w-full text-center resize-none font-mono textarea input-bordered"
            rows="1"
            cols="5"
            name="time-end-{i}"
            bind:value={timeEnd}
            class:input-error={!timeValidation(timeEnd) && (timeEnd != '' || forcedError)}
        />
        <label
            class="label row-start-[{rowNumber + 1}] col-start-7"
            for=""
            class:invisible={!(!timeValidation(timeEnd) && (timeEnd != '' || forcedError))}
        >
            <span class="label-text-alt text-error"> <b>HH:MM</b> format </span>
        </label>
        <textarea
            class="row-start-{rowNumber} col-start-8 text-center resize-none font-mono textarea input-bordered"
            rows="1"
            cols="10"
            name="room-{i}"
            id=""
        />
    {/each}
    <textarea
        class="row-start-3 text-center resize-none font-mono textarea input-bordered"
        rows="1"
        cols="10"
        name="remarks"
        id=""
    />
    <input type="hidden" name="time-rows" bind:value={$timeArray.length} />
    <div
        class="grid grid-cols-2 col-start-5 row-start-{$timeArray.length * 2 +
            3} place-items-center join"
    >
        <button
            type="button"
            class="block w-full btn btn-success join-item"
            on:click={() => {
                timeArray.update((currentArray) => {
                    currentArray.push(['', '']);
                    return currentArray;
                });
            }}
            disabled={$timeArray.length == 3}>Add</button
        >
        <button
            type="button"
            class="block w-full btn btn-error join-item"
            on:click={() => {
                timeArray.update((currentArray) => {
                    currentArray.pop();
                    return currentArray;
                });
            }}
            disabled={$timeArray.length == 1}>Remove</button
        >
    </div>
    <button
        type="submit"
        class="row-start-{$timeArray.length * 2 + 4} col-span-9 w-60 m-auto btn btn-primary"
    >
        Add Class Manually
    </button>
</form>
