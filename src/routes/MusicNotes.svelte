<script>
	import { onMount } from 'svelte'

	const possibleNotes = ['&#9835; &#9833;', '&#9833;', '&#9839; &#9834;', '&#9834;']

	let notes = []

	function generateNotes() {
		const count = 6

		for (let i = 0; i < count; i++) {
			const xdir = Math.random() < 0.5 ? -1 : 1
			const ydir = Math.random() < 0.5 ? -1 : 1
			notes.push({
				content: possibleNotes[Math.floor(Math.random() * possibleNotes.length)],
				x: Math.random() * 100 + 20,
				y: Math.random() * 100 - 20,
				size: `${Math.random() * 35}px`,
				speed: Math.random() * 3 + 1
			})
		}
		notes = notes
	}

	onMount(() => {
		generateNotes()
	})
</script>

<div class="music-notes absolute top-0 bottom-0 right-0 left-0">
	{#each notes as { x, y, size, speed, content }}
		<div
			class="note absolute bottom-0 right-0 text-slate-50"
			style="
        font-size: {size}px;
        animation-duration: {speed}s;
        animation-delay: {Math.random() * 3}s;
      ">
			{@html content}
		</div>
	{/each}
</div>

<style>
	.music-notes {
		margin: auto;
		width: 100%;
		height: 100%;
	}

	.music-notes::before {
		position: relative;
	}

	.note {
		animation: notes 2s infinite linear;
		font-size: 35px;
		opacity: 0;
	}

	@keyframes notes {
		0% {
			transform: scale(1) translate(0, 0);
			opacity: 0;
		}
		50% {
			opacity: 1;
			transform: scale(1.5) translate(-50%, -50%);
		}
		80% {
			opacity: 0;
			transform: scale(1.5) translate(-100%, -100%);
		}
		100% {
			transform: scale(1.5) translate(-100%, -100%);
			opacity: 0;
		}
	}
</style>
