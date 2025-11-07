<script lang="ts">
	import { capitalize } from '$lib/utils/parse';

	let { data } = $props();
</script>

{#if data.user}
	<h1>Hello, {capitalize(data.user.username)}!</h1>
{/if}
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
