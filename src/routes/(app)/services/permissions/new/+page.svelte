<script lang="ts">
	import { enhance } from '$app/forms'; // 用于表单无刷新提交
	export let form;
</script>

<h1>Create Permission</h1>

<form
	method="POST"
	use:enhance
	style="display: flex; flex-direction: column; align-items: flex-start;"
>
	<label>
		Permission Code:
		<input name="permission_code" required />
	</label>

	<label>
		Permission Name:
		<input name="permission_name" required />
	</label>

	<label>
		Description:
		<textarea name="description"></textarea>
	</label>

	<button type="submit">Create</button>
</form>

{#if form?.error}
	<p style="color: red">{form.error}</p>
{/if}
