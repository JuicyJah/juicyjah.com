<script context="module">
	export function isHeading(type) {
		return type?.startsWith('heading_') ?? false
	}
</script>

<script>
	import RichText from './RichText.svelte'

	export let type
	export let rich_text
</script>

{#if type == 'heading_1'}
	<h2 class="font-bold text-3xl tracking-tight text-slate-900 dark:text-zinc-50 mt-12 mb-3">
		{#each rich_text as txtItem}
			<RichText {...txtItem} />
		{/each}
	</h2>
{:else if type == 'heading_2'}
	<h3 class="font-bold text-2xl tracking-tight text-slate-900 dark:text-zinc-50 mt-10 mb-2">
		{#each rich_text as txtItem}
			<RichText {...txtItem} />
		{/each}
	</h3>
{:else if type == 'heading_3'}
	<h4 class="font-bold text-xl tracking-tight text-slate-800 dark:text-zinc-100 mt-8 mb-2">
		{#each rich_text as txtItem}
			<RichText {...txtItem} />
		{/each}
	</h4>
{/if}
