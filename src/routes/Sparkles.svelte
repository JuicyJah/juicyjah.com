<script>
	import { onMount } from 'svelte'

	export let top = null
	export let right = null
	export let left = null
	export let bottom = null

	let sparkles = []

	function generateSparkles() {
		const count = 8

		for (let i = 0; i < count; i++) {
			const xDir = left != null ? -1 : 1
			const yDir = top != null ? -1 : 1

			sparkles.push({
				xmove: `${6 * Math.random() * xDir}vw`,
				ymove: `${6 * Math.random() * yDir}vh`,
				color: '#ff0'
			})
		}
		sparkles = sparkles
	}

	onMount(() => {
		generateSparkles()
	})
</script>

<div class="sparkles-container absolute" style="top: {top}; bottom: {bottom}; left: {left}; right: {right};">
	{#each sparkles as { xmove, ymove, color }}
		<div
			class="sparkles absolute"
			style="
        background: {color};
        --x-move: {xmove};
        --y-move: {ymove};
      ">
		</div>
	{/each}
</div>

<style>
	.sparkles-container::before {
		position: relative;
	}

	.sparkles {
		width: 5px;
		height: 5px;
		animation: fly-out 0.5s forwards;
		--moveX: calc(-1 * var(--x-move));
		--moveY: calc(-1 * var(--y-move));
	}

	@media (min-width: 1024px) {
		.sparkles {
			--moveX: calc(-1 * var(--x-move));
			--moveY: calc(-1 * var(--y-move));
		}
	}

	@keyframes fly-out {
		95% {
			transform: translateX(var(--moveX)) translateY(var(--moveY));
			opacity: 0.5;
		}
		100% {
			opacity: 0;
		}
	}
</style>
