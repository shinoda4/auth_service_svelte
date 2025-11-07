<script lang="ts">
	import { page } from '$app/state';

	export let form; // actions 返回的数据
	$: defaultEmail = page.url.searchParams.get('email') ?? '';
</script>

<h2>Resend Verification Email</h2>

<form method="POST" action="?/resend">
	<input type="email" name="email" placeholder="Your email" required bind:value={defaultEmail} />
	<button type="submit">Resend Email</button>
</form>

{#if form?.success}
	<p style="color:green">{form.success}</p>
{/if}

{#if form?.error}
	<p style="color:red">{form.error}</p>
{/if}

<a href="/login">Go to Login</a>
