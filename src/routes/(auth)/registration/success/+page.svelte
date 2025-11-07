<script lang="ts">
	import { page } from '$app/state';
	let email = '';

	$: email = page.url.searchParams.get('email') ?? '';
</script>

<h2>Registration Successful</h2>
<p>A verification email has been sent to <strong>{email}</strong>. Please check your inbox.</p>

<p>Not received the email?</p>
<a href="/registration/resend-verification?email={email}">Resend Verification Email</a>

<br />

<a href="/login">Go to Login</a>
