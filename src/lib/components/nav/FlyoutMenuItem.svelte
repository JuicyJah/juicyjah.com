<script>
	export let title
	export let description = null
	export let href
</script>

<div
	class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
	<div class="flex-auto">
		<a {href} class="block font-semibold text-gray-900" data-sveltekit-reload>
			{title}
		</a>
		{#if description}
			<p class="mt-1 text-gray-600">{description}</p>
		{/if}
	</div>
</div>
