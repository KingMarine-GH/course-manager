<script lang="ts">
    import { user } from '$lib/client/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        // Added setTimeout as Firebase needs a few milliseconds to initialize
        setTimeout(() => {
            if (!$user) goto('/login');
        }, 500);
    });
</script>

<slot />
