<script lang="ts">
	export let action: string = ''; // 可以绑定表单 action
</script>

<form method="POST" {action}>
	<label>Username: <input name="username" required /></label><br />
	<label>Email: <input name="email" type="email" required /></label><br />
	<label>Phone Number: <input name="phoneNumber" type="tel" required /></label><br />
	<label>Password: <input name="password" type="password" required /></label><br />
	<label>Confirm Password: <input name="confirmPassword" type="password" required /></label><br />
	<button type="submit">Register</button>
</form>
