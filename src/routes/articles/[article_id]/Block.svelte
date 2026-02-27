<script>
	import Paragraph, { isParagraph } from './Paragraph.svelte'
	import Heading, { isHeading } from './Heading.svelte'

	export let type
</script>

<div class="mt-[1px] mb-[1px]">
	{#if isHeading(type)}
		<Heading {type} {...$$props[type]} />
	{:else if isParagraph(type)}
		<Paragraph {...$$props[type]} />
	{/if}
</div>
