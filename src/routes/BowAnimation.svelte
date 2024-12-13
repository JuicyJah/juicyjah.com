<script>
</script>

<div class="absolute inset-0 m-[-8px]" style="--duration: 1s;">
	<div class="animated-bow absolute w-full h-full inset-x-0 inset-y-0 overflow-hidden">
		<div class="bow-h h-8 w-full absolute left-0 top-[40%] bg-rose-800"></div>
		<div class="bow-v w-8 h-full absolute top-0 md:right-[10rem] right-[5rem] bg-rose-800"></div>
	</div>
	<svg class="bow absolute top-[-2rem] right-[-4rem] md:right-[1rem] stroke-rose-600" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<path class="bow-main" />
		<path class="bow-right" />
	</svg>
</div>

<style>
	.animated-bow::before {
		position: relative;
	}

	.bow-h {
		transform: translateX(-100%);
		animation: bow-h-in-out calc(var(--duration) * 0.3) ease-in-out forwards;
	}

	.bow-v {
		transform: translateY(-100%);
		animation: bow-v-in-out calc(var(--duration) * 0.3) ease-in-out forwards;
	}

	@keyframes bow-h-in-out {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes bow-v-in-out {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}

	.bow {
		width: 20rem;
		height: 20rem;
		transform: rotate(12deg);
	}

	.bow-main {
		d: path('M 50 50 C -20 50, 0 -35, 50 50 C 130 30, 80 -35, 50 50 L 30 100');
		fill: none;
		stroke-width: 10;
		animation-name: bow-path;
		stroke-dasharray: 350;
		stroke-dashoffset: 350;
		animation-delay: calc(var(--duration) * 0.4);
		animation-duration: calc(var(--duration) * 0.6);
		animation-timing-function: ease-in;
		animation-fill-mode: forwards;
	}

	.bow-right {
		d: path('M 50 50 L 70 100');
		fill: none;
		stroke-width: 10;
		animation-name: bow-right;
		stroke-dasharray: 350;
		stroke-dashoffset: 350;
		animation-timing-function: ease-in;
		animation-fill-mode: forwards;
		animation-delay: calc(var(--duration) * 0.4 + var(--duration) * 0.6 * 0.9);
		animation-duration: calc(var(--duration) * 0.6 * 0.23);
	}

	@keyframes bow-right {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes bow-path {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
