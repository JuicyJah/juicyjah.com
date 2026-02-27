<script>
	import { page } from '$app/stores'

	$: ({ articles } = $page.data)
</script>

<div>
	<div class="">Articles</div>

	{#each articles as article}
		<div class="border-2 border-gray-300 rounded-md p-4 mb-4">
			<h2 class="text-xl font-bold mb-2">{article.title}</h2>
			<a href={`/articles/${article.id}`} class="text-blue-500 hover:underline">Read more</a>
		</div>
	{/each}
</div>
