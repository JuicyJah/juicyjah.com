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
	import BowAnimation from './BowAnimation.svelte'
	import LookOverHere from './LookOverHere.svelte'

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
			scale = false
			play = false
			bow = false
			shipIt = false
			lookOverHere = false
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
		playCheckbox = false,
		scale = null,
		bow = false,
		shipIt = false,
		lookOverHere = false
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

		if (trig == 'look_over_here') lookOverHere = true

		if (trig == 'checkbox') {
			playCheckbox = true
			setTimeout(() => (playCheckbox = false), 600)
		}

		if (trig == 'scale') {
			scale = true
		}

		if (trig == 'bow') {
			bow = true
		}

		if (trig == 'bow_out') {
			bow = false
		}

		if (trig == 'ship_it') {
			shipIt = true
			bow = false
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
	{#if play}
		<div class="animation-bg-1 fixed top-0 right-0 bottom-0 left-0 bg-slate-900" class:active={bgDraw} class:reset={bgDraw == false}>
			<Stars />
		</div>
	{/if}
	<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32 z-10">
		<div class="flex flex-col justify-center items-center">
			<h1 class="text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-slate-200 sm:text-6xl p-2">JuicyJah</h1>
			<div class="terminal-shell w-[100vw] max-w-[48rem] lg:w-[48rem] h-64 z-30 relative box-border" class:scale-in-out={scale} class:ship-it={shipIt}>
				<div class="terminal-shell-front w-full h-full border-8 border-gray-500 rounded-md">
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
					{#if bow}
						<BowAnimation />
					{/if}
				</div>
				<div class="terminal-shell-back bg-[#a67549] w-full h-full overflow-hidden">
					<div class="shipping-label m-[10%] w-[20%] h-[30%] bg-white"></div>
					<div class="shipping-ribbon absolute bottom-0 right-[-10%] h-[15%] w-[40%]"></div>
				</div>
				<div class="terminal-shell-right bg-[#a67549] w-[100px] h-full"></div>
				<div class="terminal-shell-left bg-[#a67549] w-[100px] h-full"></div>
				<div class="terminal-shell-top bg-[#a67549] w-full h-[100px]">
					<div class="tape w-full h-[25%] absolute top-[40%] bg-slate-400"></div>
				</div>
				<div class="terminal-shell-bottom bg-[#a67549] w-full h-[100px]">
					<div class="tape w-full h-[25%] absolute top-[40%] bg-slate-400"></div>
				</div>
			</div>
			{#if playConfetti}
				<Confetti on:finished={() => (playConfetti = false)} />
			{/if}
			<a type="button" href={ROUTES.projects} class="button primary text-lg px-3 py-1 mt-4">See Projects <i class="ml-2 fa-solid fa-arrow-right"></i></a>
		</div>
	</div>
	{#if lookOverHere}
		<LookOverHere />
	{/if}
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

	.scale-in-out {
		animation: scale-in-out 0.6s ease-in-out forwards;
	}

	@keyframes scale-in-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.25);
		}
		100% {
			transform: scale(1);
		}
	}

	.terminal-shell.ship-it {
		transform-origin: 50% 50% -300px;
		/* transform: rotateY(120deg) rotateZ(45deg); */
		transform: rotateY(0);
		transform-style: preserve-3d;
		animation: ship-terminal 1s linear forwards;
		/* perspective: 30rem; */
	}

	.shipping-ribbon {
		background: repeating-linear-gradient(45deg, #3b82f6, #3b82f6 10px, #c7d2fe 10px, #c7d2fe 20px);
		transform: rotate(-45deg);
	}

	@keyframes ship-terminal {
		0% {
			transform: rotateY(0) rotateZ(0);
		}
		50% {
			transform: rotateY(180deg) rotateZ(22deg);
		}
		100% {
			transform: rotateY(360deg) rotateZ(0);
		}
	}

	.terminal-shell-back,
	.terminal-shell-right,
	.terminal-shell-left,
	.terminal-shell-top,
	.terminal-shell-bottom {
		position: absolute;
		border: 8px solid #8f5f37;
		/* margin: -8px; */
		transform: translateZ(100px);
		/* transform: translateY(calc(100vw * 0.25)) rotateY(45deg, 0deg) translateZ(calc(40rem * 0.499)); */
	}

	.terminal-shell-front,
	.terminal-shell-back {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.terminal-shell-back {
		transform: translateZ(-100px) rotateY(180deg);
	}

	.terminal-shell-back::before {
		position: relative;
	}

	.terminal-shell-right {
		top: 0;
		right: 0;
		transform-origin: right;
		transform: rotateY(-90deg);
	}

	.terminal-shell-left {
		top: 0;
		left: 0;
		transform-origin: left;
		transform: rotateY(90deg);
	}

	.terminal-shell-top {
		top: 0;
		transform-origin: top;
		transform: rotateX(-90deg);
	}

	.terminal-shell-bottom {
		bottom: 0;
		transform-origin: bottom;
		transform: rotateX(90deg);
	}
</style>
