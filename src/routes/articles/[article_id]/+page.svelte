<script>
	import { page } from '$app/stores'
	import Block from './Block.svelte'

	$: ({ article } = $page.data)
</script>

<div>
	<div class="text-5xl font-bold mb-8">{article.title}</div>

	{#each article.blocks as block}
		<Block {...block} />
	{/each}
</div>
