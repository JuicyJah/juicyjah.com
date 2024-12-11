<script>
	import { onMount, createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	const keyboardAudioURL = '/assets/keyboard_type.mp3'
	const popAudioURL = '/assets/pop.mp3'

	let canvas, keyboardTyping, popSound

	class AnimatedConsole {
		lineHeight = 20
		xStart = 10
		constructor(canvas) {
			this.lines = []
			this.canvas = canvas
			this.ctx = canvas.getContext('2d')
			this.ctx.font = '16px monospace'
			this.ctx.fillStyle = 'white'

			this.charIndex = 0
			this.currentLine = ''
		}

		type(command) {
			if (this.charIndex < command.length) {
				this.currentLine += command[this.charIndex]
				this.charIndex++
			} else {
				this.lines.push(command)
				this.charIndex = 0
				this.currentLine = ''
				return Promise.resolve()
			}

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			for (let i = 0; i <= this.lines.length; i++) {
				const text = i < this.lines.length ? this.lines[i] : this.currentLine
				this.ctx.fillText(text, this.xStart, 30 + i * this.lineHeight)
			}

			return new Promise((resolve) => {
				setTimeout(async () => {
					await this.type(command)
					resolve()
				}, 50)
			})
		}

		print(out) {
			this.lines.push(out)
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			for (let i = 0; i < this.lines.length; i++) {
				const text = this.lines[i]
				this.ctx.fillText(text, this.xStart, 30 + i * this.lineHeight)
			}
		}

		delay(time) {
			return new Promise((resolve) => {
				setTimeout(resolve, time)
			})
		}

		async printLines(lines) {
			/**
			 * line {
			 *   action: "print" || "type",
			 *   content: "some content here"
			 * }
			 */
			if (!lines) return

			for (let i = 0; i < lines.length; i++) {
				const line = lines[i]
				if (['print', 'type'].includes(line?.action) && line?.content != null) {
					if (line.trigger) dispatch('trigger', line.trigger)
					switch (line.action) {
						case 'print':
							if (line.sound == true) {
								popSound.load()
								popSound.play()
							}
							this.print(line.content)
							break
						case 'type':
							if (line.sound == true) keyboardTyping.play()
							await this.type(line.content)
							if (line.sound == true) {
								keyboardTyping.pause()
								keyboardTyping.load()
							}
							break
						default:
							break
					}
				}
				if (line?.delay) await this.delay(line.delay)
				if (!!line?.clear) this.clear()
			}
		}

		clear() {
			this.lines = []
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			// this.ctx.fillText('', this.xStart, 30)
		}
	}

	onMount(() => {
		keyboardTyping = new Audio(keyboardAudioURL)
		popSound = new Audio(popAudioURL)
		const parent = getComputedStyle(canvas.parentElement)
		const mr = Number(parent.marginRight.replace(/px$/, ''))
		const ml = Number(parent.marginLeft.replace(/px$/, ''))
		const mt = Number(parent.marginTop.replace(/px$/, ''))
		const mb = Number(parent.marginBottom.replace(/px$/, ''))
		const marginWidth = Math.round(ml + mr)
		const marginHeight = Math.round(mt + mb)
		const parentW = Number(parent.width.replace(/px$/, ''))
		const parentH = Number(parent.height.replace(/px$/, ''))
		const w = parentW - marginWidth
		const h = parentH - marginHeight
		canvas.width = w
		canvas.height = h

		const term = new AnimatedConsole(canvas)

		dispatch('ready', {
			terminal: term
		})
	})
</script>

<canvas bind:this={canvas} id="commandPromptCanvas"></canvas>

<style>
	canvas {
		display: block;
		margin: 0 auto;
		background-color: transparent;
		color: white;
		font-family: monospace;
	}
</style>
