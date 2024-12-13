<script>
</script>

<div class="look-over-here here-1 fixed bottom-0 right-0 p-6 rounded-md font-color-default bg-slate-700">
	<p>Hey, look over here! <span class="">👋</span></p>
</div>

<div class="look-over-here here-2 fixed bottom-0 left-0 p-6 rounded-md font-color-default bg-slate-700">
	<p>Now here! <span class="flip-emoji">👋</span></p>
</div>

<div class="look-over-here here-3 fixed top-0 left-0 p-6 rounded-md font-color-default bg-slate-700">
	<p>Over here! <span class="flip-emoji">👋</span></p>
</div>

<style>
	.flip-emoji {
		transform: scaleX(-1);
	}

	.look-over-here {
		animation: look-over-here 1.16s ease-in-out forwards;
	}

	.here-1 {
		--init: 100%;
		transform: translateX(var(--init));
		animation-delay: 0s;
	}

	.here-2 {
		--init: -100%;
		transform: translateX(var(--init));
		animation-delay: 0.58s;
	}

	.here-3 {
		--init: -100%;
		transform: translateX(var(--init));
		animation-delay: 1.16s;
	}

	@keyframes look-over-here {
		0% {
			transform: translate(var(--init));
		}
		35%,
		65% {
			transform: translateX(0);
		}
		100% {
			transform: translate(var(--init));
		}
	}
</style>
