<script>
    import { Route } from 'svelte-routing';
    import accessDenied from './accessDenied.svelte';
    import { token } from '../store/stores.js';
    export let path;
    export let component;

    $: isAuthenticated = $token;
</script>

{#if isAuthenticated}
    <Route path={path} component={component} />
{:else}
    <Route path={path} component={accessDenied} />
{/if}