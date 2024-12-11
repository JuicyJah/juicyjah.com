<script>
	import { onMount } from 'svelte'

	let stars = []
	const numStars = 200

	function generateStars() {
		for (let i = 0; i < numStars; i++) {
			stars.push({
				x: Math.random() * 100 + 20,
				y: Math.random() * 100 - 20,
				size: Math.random() * 2 + 1,
				speed: Math.random() * 0.2 + 0.1
			})
		}
		stars = stars
	}

	onMount(() => {
		generateStars()
	})
</script>

<div class="background">
	{#each stars as { x, y, size, speed }}
		<div
			class="star"
			style="
        left: {x}%;
        top: {y}%;
        width: {size}px;
        height: {size}px;
        animation-duration: {speed * 120}s;
        animation-delay: {Math.random() * -20}s;
      ">
		</div>
	{/each}
</div>

<style>
	.star {
		position: absolute;
		background: white;
		border-radius: 50%;
		animation: moveStar linear infinite;
	}

	@keyframes moveStar {
		0% {
			transform: translateY(0) translateX(0);
		}
		100% {
			transform: translateY(100vh) translateX(-75vw);
		}
	}
</style>
