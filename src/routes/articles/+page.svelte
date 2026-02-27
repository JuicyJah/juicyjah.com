<script>
	import { page } from '$app/stores'
	import { ROUTES } from '$lib/config.js'
	import ArticleListPlaceholder from '$lib/components/ArticleListPlaceholder.svelte'

	$: ({ articles } = $page.data)

	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
</script>

<div>
	<div class="mb-14">
		<p class="text-xs font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-4">Writing</p>
		<h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Articles</h1>
	</div>

	<div>
		{#await articles}
			{#each Array(5) as _}
				<ArticleListPlaceholder />
			{/each}
		{:then resolvedArticles}
			{#each resolvedArticles as article}
				<a
					href={`${ROUTES.articles}/${article.id}`}
					class="group flex items-center justify-between py-5 border-b border-slate-100 dark:border-zinc-800/60 -mx-2 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
					<div>
						<p class="text-xs text-slate-400 dark:text-zinc-500 mb-1 font-medium">{formatDate(article.createdTime)}</p>
						<h2 class="text-base font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{article.title}</h2>
					</div>
					<svg
						class="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			{/each}
		{:catch}
			<p class="text-sm text-slate-400 dark:text-zinc-500 py-5">Failed to load articles.</p>
		{/await}
	</div>
</div>
