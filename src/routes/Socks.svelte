<script>
	export let top = null
	export let right = null
	export let left = null
	export let bottom = null

	const xDir = left != null ? -1 : 1
	const yDir = top != null ? -1 : 1
</script>

<div class="socks-container absolute min-w-[4rem] h-[4rem] border-none z-30" style="top: {top}; bottom: {bottom}; left: {left}; right: {right};">
	<img
		alt="socks"
		src="/assets/socks.png"
		class="socks absolute"
		style="
        --x-move: {6 * Math.random() * xDir + 2}vw;
        --y-move: {6 * Math.random() * yDir + 2}vh;
      " />
</div>

<style>
	.socks-container::before {
		position: relative;
	}

	.socks {
		transform-origin: center;
		min-width: 4rem;
		height: 4rem;
		animation: fly-out 0.5s forwards;
		--moveX: calc(-1 * var(--x-move));
		--moveY: calc(-1 * var(--y-move));
	}

	@media (min-width: 1024px) {
		.socks {
			--moveX: var(--x-move);
			--moveY: var(--y-move);
		}
	}

	@keyframes fly-out {
		90% {
			opacity: 0.9;
		}
		95% {
			transform: translateX(var(--moveX)) translateY(var(--moveY)) rotate(360deg);
			opacity: 0.5;
		}
		100% {
			opacity: 0;
		}
	}
</style>
