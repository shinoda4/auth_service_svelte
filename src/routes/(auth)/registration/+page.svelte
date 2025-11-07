<script lang="ts">
	import RegistrationForm from './RegistrationForm.svelte';
	export let form; // SvelteKit 自动注入 actions 返回的错误或数据
</script>

<h2>Registration</h2>

<RegistrationForm action="?/register" />

{#if form?.error}
	<p style="color:red">{form.error}</p>
{/if}

<nav>
	<div>
		Already have an account? <a href="/login">Go to Login</a>
	</div>
</nav>
