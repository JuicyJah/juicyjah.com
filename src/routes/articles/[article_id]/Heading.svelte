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
	<h2 class="font-bold text-4xl mt-8 mb-[4px]">
		{#each rich_text as txtItem}
			<RichText {...txtItem} />
		{/each}
	</h2>
{:else if type == 'heading_2'}
	<h3 class="font-bold text-3xl mt-6 mb-[1px]">
		{#each rich_text as txtItem}
			<RichText {...txtItem} />
		{/each}
	</h3>
{:else if type == 'heading_3'}
	<h4 class="font-bold text-2xl mt-4 mb-[1px]">
		{#each rich_text as txtItem}
			<RichText {...txtItem} />
		{/each}
	</h4>
{/if}
