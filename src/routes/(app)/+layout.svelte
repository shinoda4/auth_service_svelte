<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="app-nav">
	{#if data.isAuthenticated}
		<div>
			<a href="/">Home</a>
			<a href="/welcome">Welcome Page</a>
		</div>
		<a href="/logout">Logout</a>
	{:else}
		<div></div>
		<a href="/login">Login</a>
	{/if}
</nav>

{@render children()}

<style lang="scss">
	.app-nav {
		display: flex;
		justify-content: space-between;
	}
</style>
