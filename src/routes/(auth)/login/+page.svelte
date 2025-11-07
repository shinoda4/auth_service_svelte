<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	export let form;
</script>

<h2>Login</h2>

<LoginForm action="?/login" />

{#if form?.error}
	<p style="color:red">{form.error}</p>
{/if}

<nav>
	<div>
		Don't have an account?
		<a href="/registration">Go to Registration</a>
	</div>
</nav>
