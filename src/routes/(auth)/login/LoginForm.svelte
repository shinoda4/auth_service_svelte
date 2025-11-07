<script lang="ts">
	export let action: string = ''; // 可以绑定表单 action
</script>

<form method="POST" {action}>
	<label>Username: <input name="username" required /></label><br />
	<label>Password: <input name="password" type="password" required /></label><br />
	<button type="submit">Login</button>
</form>
