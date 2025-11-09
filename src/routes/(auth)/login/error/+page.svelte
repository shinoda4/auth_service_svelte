<script lang="ts">
	import { page } from '$app/state';

	let username = page.url.searchParams.get('username') || 'User';
</script>

<h2>Error Login</h2>

<a href="/login">Go to Login Page</a>
