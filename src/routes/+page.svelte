<script>
	import { ROUTES } from '$lib/config.js'
	import TerminalCanvas from '$lib/components/animations/TerminalCanvas.svelte'
	import TerminalAnimations from '$lib/components/animations/home_terminal_animation.json'
	import Confetti from './Confetti.svelte'
	import Sparkles from './Sparkles.svelte'
	import Socks from './Socks.svelte'
	import Stars from './Stars.svelte'
	import TerminalCar from './TerminalCar.svelte'
	import MusicNotes from './MusicNotes.svelte'
	import AnimatedCheckbox from './AnimatedCheckbox.svelte'

	let audioPlayer, duration, currentTime, paused, volume, status, isPlaying
	const videoUrl = '/assets/build_it_juicy.mp3'

	async function waitFor(conditionCallback, time) {
		const promise = new Promise((resolve) => {
			if (conditionCallback() === true) return resolve()
			const checkInterval = setInterval(() => {
				if (conditionCallback()) {
					clearInterval(checkInterval)
					resolve()
				}
			}, time)
		})

		return await promise
	}

	async function tryToPlayAudio(terminal) {
		let check = 0
		const readyToPlay = new Promise((resolve) => {
			if (navigator?.userActivation?.hasBeenActive) return resolve()
			const checkInterval = setInterval(() => {
				if (navigator?.userActivation?.hasBeenActive) {
					clearInterval(checkInterval)
					resolve()
				}
				if (check == 5 && terminal) {
					terminal.lines.splice(terminal.lines.length - 1, 1)
					terminal.print('\t\t\t\tInteract with the screen to continue...')
					terminal.print('>')
				}
				check++
			}, 500)
		})
		try {
			await readyToPlay
			await audioPlayer.play()
		} catch (e) {}
	}

	async function waitForAudioToStop() {
		return await waitFor(() => status == undefined || status == null || status == 'can play all', 500)
	}

	let play = false
	async function loopTerminal(terminal) {
		while (true) {
			await waitFor(() => play == true, 500)
			await terminal.printLines(TerminalAnimations.awaiting_input)
			terminal.clear()
			await terminal.printLines(TerminalAnimations.play_music)
			await tryToPlayAudio(terminal)
			await terminal.delay(2000)
			terminal.clear()
			await terminal.printLines(TerminalAnimations.get_started)
			terminal.clear()
			await terminal.printLines(TerminalAnimations.build_me)
			bgDraw = false
			musicNotes = false
			await waitForAudioToStop()
			terminal.clear()
			play = false
		}
	}

	function terminalAnimations(e) {
		const { terminal } = e.detail

		setTimeout(() => loopTerminal(terminal), 600)
	}

	let playConfetti = false,
		playSparkles = false,
		playSocks = false,
		bgDraw = null,
		terminalCar,
		musicNotes = false,
		playCheckbox = false
	function trigger(e) {
		const trig = e.detail

		// if (!['sparkle', 'confetti', 'socks'].includes(trig)) return

		if (trig == 'confetti') playConfetti = true

		if (trig == 'sparkle') {
			playSparkles = true
			setTimeout(() => (playSparkles = false), 1500)
		}

		if (trig == 'socks') {
			playSocks = true
			setTimeout(() => (playSocks = false), 1500)
		}

		if (trig == 'bgfade') bgDraw = true
		if (trig == 'reset') {
			musicNotes = false
			bgDraw = false
		}

		if (trig == 'terminalCar') terminalCar.startAnimation()

		if (trig == 'music_notes') musicNotes = true

		if (trig == 'checkbox') {
			playCheckbox = true
			setTimeout(() => (playCheckbox = false), 1000)
		}
	}
</script>

<div class="relative isolate px-6 pt-14 lg:px-8">
	<div class="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80 -z-10" aria-hidden="true">
		<div
			class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
		</div>
	</div>
	<div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
		<div
			class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
		</div>
	</div>
	<div class="animation-bg-1 fixed top-0 right-0 bottom-0 left-0 bg-slate-900" class:active={bgDraw} class:reset={bgDraw == false}>
		<Stars />
	</div>
	<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32 z-10">
		<div class="flex flex-col justify-center items-center">
			<h1 class="text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-slate-200 sm:text-6xl p-2">JuicyJah</h1>
			<div class="w-[100vw] lg:w-[48rem] h-64 border-8 border-gray-500 rounded-md z-30">
				<div class="bg-black w-full h-full relative">
					<TerminalCanvas on:ready={terminalAnimations} on:trigger={trigger} />
					{#if musicNotes}
						<MusicNotes />
					{/if}
					<TerminalCar bind:this={terminalCar} />
					<audio
						bind:this={audioPlayer}
						bind:duration
						bind:currentTime
						bind:paused
						bind:volume
						on:canplay={() => (status = 'can play some')}
						on:canplaythrough={() => (status = 'can play all')}
						on:waiting={() => (status = 'waiting')}
						on:timeupdate={() => (status = 'playing')}
						on:seeking={() => (status = 'seeking')}
						on:ended={() => {
							isPlaying = false
							currentTime = 0
						}}
						src={videoUrl} />
					{#if !play}
						<button class="absolute rounded-full top-[40%] right-[48%] text-5xl text-slate-50" on:click={() => (play = true)}><i class="fa-solid fa-play"></i></button>
					{/if}

					{#if playConfetti}
						<Confetti on:finished={() => (playConfetti = false)} />
					{/if}

					{#if playSparkles}
						<Sparkles top={0} right={0} />
						<Sparkles top={0} left={0} />
						<Sparkles bottom={0} right={0} />
						<Sparkles bottom={0} left={0} />
					{/if}

					{#if playSocks}
						<Socks top={0} right={0} />
						<Socks top={0} left={0} />
						<Socks bottom={0} right={0} />
						<Socks bottom={0} left={0} />
					{/if}

					<AnimatedCheckbox active={playCheckbox} />
				</div>
			</div>
			<a type="button" href={ROUTES.projects} class="button primary text-lg px-3 py-1 mt-4">See Projects <i class="ml-2 fa-solid fa-arrow-right"></i></a>
		</div>
	</div>
</div>

<style>
	.animation-bg-1 {
		opacity: 0;
	}

	.animation-bg-1::before {
		position: relative;
	}

	.animation-bg-1.active {
		animation: bg-in 4s forwards;
	}

	.animation-bg-1.reset {
		animation: bg-out 3s forwards;
	}

	@keyframes bg-in {
		100% {
			opacity: 1;
		}
	}

	@keyframes bg-out {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
