<script lang="ts">
	export let data;
</script>

{#if data.status}
	<p>{data.status}</p>
	<a href="/login">Go to Login</a>
{/if}

{#if data.error}
	<p style="color:red">{data.error}</p>
	<a href="/login">Go to Login</a>
{/if}
