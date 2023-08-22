<script lang="ts">
    import { user } from '$lib/client/auth';
    import { goto } from '$app/navigation';

    if (!$user) {
        goto('/login');
    }
</script>

<slot />
