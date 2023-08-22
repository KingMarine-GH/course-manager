<script>
    import '../app.postcss';
    // Initiate firebase on start
    import '$lib/client/firebase';

    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { invalidateAll } from '$app/navigation';
    import { onMount } from 'svelte';
    onMount(() => {
        const authUnsub = onAuthStateChanged(getAuth(), () => invalidateAll());

        return () => authUnsub();
    });

    import { dev } from '$app/environment';
    import { user } from '$lib/client/auth';

    import AccountButton from './AccountButton.svelte';
</script>

{#if dev}
    <div class="flex gap-2">
        <p>User status: {$user?.displayName}</p>
    </div>
{/if}

<nav>
    <AccountButton />
</nav>

<slot />
