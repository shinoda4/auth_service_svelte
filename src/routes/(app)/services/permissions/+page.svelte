<script lang="ts">
	let { data } = $props();
</script>

<button onclick={() => (window.location.href = '/services/permissions/new')}>
	Create New Permission
</button>

<form method="get">
	<input name="search" placeholder="Search" value={data.query?.search ?? ''} />
	<button type="submit">Search</button>
</form>

<table>
	<thead>
		<tr><th>ID</th><th>Code</th><th>Name</th><th>Description</th></tr>
	</thead>
	<tbody>
		{#each data.results as p}
			<tr>
				<td>{p.id}</td>
				<td>{p.permission_code}</td>
				<td>{p.permission_name}</td>
				<td>{p.description}</td>
			</tr>
		{/each}
	</tbody>
</table>
