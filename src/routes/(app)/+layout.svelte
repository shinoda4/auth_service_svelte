<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	{#if (data.isAuthenticated)}
		<a href="/welcome">Welcome Page</a>
		<a href="/logout">Logout</a>
	{:else}
		<a href="/login">Login</a>
	{/if}
</nav>

{@render children()}
