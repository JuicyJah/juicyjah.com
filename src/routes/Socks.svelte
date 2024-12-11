<script>
	export let top = null
	export let right = null
	export let left = null
	export let bottom = null

	const xDir = left != null ? -1 : 1
	const yDir = top != null ? -1 : 1
</script>

<div class="socks-container absolute" style="top: {top}; bottom: {bottom}; left: {left}; right: {right};">
	<img
		alt="socks"
		src="/assets/socks.png"
		class="socks absolute"
		style="
        --x-move: {6 * Math.random() * xDir}vw;
        --y-move: {6 * Math.random() * yDir}vh;
      " />
</div>

<style>
	.socks-container::before {
		position: relative;
	}

	.socks {
		transform-origin: center;
		min-width: 50px;
		height: 50px;
		animation: fly-out 0.5s forwards;
	}

	@keyframes fly-out {
		90% {
			opacity: 0.9;
		}
		95% {
			transform: translateX(var(--x-move)) translateY(var(--y-move)) rotate(360deg);
			opacity: 0.5;
		}
		100% {
			opacity: 0;
		}
	}
</style>
