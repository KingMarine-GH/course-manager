<script lang="ts">
    import { user } from '$lib/client/auth';

    import { signOut, getAuth } from 'firebase/auth';
</script>

{#if $user}
    <button on:click={() => signOut(getAuth())}>Sign out</button>
{:else}
    <a href="/login">Sign in</a>
{/if}
