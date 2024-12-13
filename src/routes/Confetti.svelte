<script>
	import { onMount, createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	let confettiPieces = []

	let highestDuration = 1
	function generateConfetti() {
		const count = 100
		const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f']

		for (let i = 0; i < count; i++) {
			const duration = Math.random() * 2.2
			if (duration > highestDuration) highestDuration = duration
			confettiPieces.push({
				x: Math.random() * 100, // horizontal start position
				drift: (Math.random() - 0.5) * 20, // Random drift
				y: Math.random() * -100, // start above the screen
				color: colors[Math.floor(Math.random() * colors.length)],
				delay: 0, //Math.random() * 2, // animation delay
				duration // duration between 1-2 seconds
			})
		}
		confettiPieces = confettiPieces
		return highestDuration * 1000
	}

	onMount(() => {
		let dur = generateConfetti()
		setTimeout(() => {
			dispatch('finished')
		}, dur)
	})
</script>

<div class="confetti-container">
	{#each confettiPieces as { x, y, color, drift, delay, duration }}
		<div
			class="confetti"
			style="
        --drift: {drift};
        background: {color};
        left: {x}%;
        --duration: {duration}s;
        --delay: {delay}s;
      ">
		</div>
	{/each}
</div>

<style>
	.confetti {
		position: fixed;
		top: -10px;
		left: 0;
		width: 10px;
		height: 10px;
		opacity: 0.9;
		transform-origin: center;
		animation-name: confetti-fall;
		animation-duration: var(--duration);
		animation-iteration-count: 1;
		animation-timing-function: linear;
		animation-delay: var(--delay);
		animation-direction: normal;
		animation-fill-mode: none;
	}

	@keyframes confetti-fall {
		0% {
			transform: translateY(-10%) rotate(0deg) translateX(0);
		}
		50% {
			transform: translateX(var(--drift));
			opacity: 0.9;
		}
		100% {
			transform: translateY(100vh) rotate(720deg) translateX(0);
			opacity: 0;
		}
	}

	@keyframes confetti-drift {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(var(--drift));
		}
	}
</style>
