<script lang="ts">
    import { user } from '$lib/client/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$user) {
            goto('/login');
        }
    });
</script>

<slot />
