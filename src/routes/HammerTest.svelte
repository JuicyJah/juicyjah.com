<script>
	export let flipped = false
	export let top = null
	export let right = null
	export let left = null
	export let bottom = null

	export let horizontal = false
</script>

<div
	class="hammer-test-container absolute text-slate-50"
	style="top: {top}; bottom: {bottom}; left: {left}; right: {right}; --flip: {flipped ? 1 : -1}; --rotate:{horizontal ? (flipped ? '-180deg' : '180deg') : flipped ? '270deg' : '-90deg'}">
	<i class="hammer fa-solid fa-hammer text-[3rem]"></i>
</div>

<style>
	.hammer-test-container::before {
		position: relative;
	}

	.hammer-test-container {
		width: 3rem;
		height: 3rem;
		transform: scaleX(var(--flip)) rotateZ(var(--rotate)) rotateY(0deg);
		animation:
			hammer-entry 0.58s ease-in forwards,
			hammer 0.27s alternate ease-in infinite;
		animation-delay: 0s, 0.58s;
		transform-origin: bottom left;
	}

	.hammer {
		background: linear-gradient(to top right, #a16207 55%, silver 55%);
		color: transparent;
		background-clip: text;
	}

	@keyframes hammer-entry {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes hammer {
		0% {
			transform: scaleX(var(--flip)) rotateZ(var(--rotate));
		}
		100% {
			transform: scaleX(var(--flip)) rotateZ(calc(var(--rotate) + 45deg));
		}
	}
</style>
