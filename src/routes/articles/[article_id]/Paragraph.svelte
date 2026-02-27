<script context="module">
	export function isParagraph(type) {
		return type === 'paragraph'
	}
</script>

<script>
	import RichText from './RichText.svelte'

	export let rich_text
</script>

<div class="py-[3px]" class:empty={!rich_text?.length}>
	{#each rich_text as txtItem}
		<RichText {...txtItem} />
	{/each}
</div>

<style>
	.empty:after {
		min-height: 1.5em;
		display: block;
		content: ' ';
	}
</style>
