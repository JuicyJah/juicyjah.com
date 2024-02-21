<script>
	import { onMount } from 'svelte'
	import FlyoutMenuItem from '$lib/components/nav/FlyoutMenuItem.svelte'

	export let links = []
	let clazz
	export { clazz as class }

	let elem

	onMount(() => {
		const pos1 = elem.getBoundingClientRect()

		if (pos1.right > window.innerWidth) {
			elem.style.left = 0

			const pos2 = elem.getBoundingClientRect()
			elem.style.left = `${window.innerWidth - pos2.right}px`
		}
	})
</script>

<div
	class="absolute -left-8 top-full z-10 mt-3 w-screen overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 {clazz}"
	bind:this={elem}>
	<div class="p-1">
		{#each links as item}
			<FlyoutMenuItem {...item} />
		{/each}
	</div>
</div>
