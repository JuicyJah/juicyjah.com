<script>
	import { onMount, createEventDispatcher } from 'svelte'
	import { init, animate, startCarAnimation } from './terminal_car.js'

	const dispatch = createEventDispatcher()

	export function startAnimation() {
		startCarAnimation(() => {
			dispatch('finished')
		})
	}

	let worldCanvas
	onMount(async () => {
		await init(worldCanvas)
		animate()
	})
</script>

<div bind:this={worldCanvas} class="world absolute top-0 bottom-0 left-0 right-0 w-full h-full" />

<style>
	.world {
		overflow: hidden;
		background-color: transparent;
	}
</style>
