<script>
	import { page } from '$app/stores'
	import Block from './Block.svelte'
	import { ROUTES } from '$lib/config.js'
	import ArticleLoadingPlaceholder from '$lib/components/ArticleLoadingPlaceholder.svelte'

	$: ({ article } = $page.data)
</script>

<div>
	<a href={ROUTES.articles} class="inline-flex items-center gap-1.5 text-sm text-slate-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-12 transition-colors group">
		<svg class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
		</svg>
		Articles
	</a>

	{#await article}
		<ArticleLoadingPlaceholder />
	{:then resolvedArticle}
		<h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 mb-4">{resolvedArticle.title}</h1>

		<div class="flex items-center gap-3 text-sm text-slate-400 dark:text-zinc-500 mb-12">
			<span>By JuicyJah</span>
			<span>&middot;</span>
			<span>Last updated {new Date(resolvedArticle.lastEditedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
		</div>

		{#each resolvedArticle.blocks as block}
			<Block {...block} />
		{/each}
	{:catch}
		<p class="text-sm text-slate-400 dark:text-zinc-500 py-5">Failed to load article.</p>
	{/await}
</div>
