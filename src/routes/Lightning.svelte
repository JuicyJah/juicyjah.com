<script>
	import { onMount, createEventDispatcher, onDestroy } from 'svelte'

	const thunderAudioURL = '/assets/thunder.mp3'
	let thunder,
		thunderPlaying = false

	let thunderInterval
	function playThunder() {
		if (thunderPlaying) return
		thunderPlaying = true
		thunder.play()
		setTimeout(() => {
			let volume = 1
			thunderInterval = setInterval(() => {
				volume -= 0.1
				if (volume <= 0) return clearInterval(thunderInterval)

				thunder.volume = volume
			}, 100)
		}, 1000)
	}

	let canvas, ctx

	const LEFT = 'LEFT'
	const RIGHT = 'RIGHT'

	const getDir = () => {
		const dec = Math.floor(Math.random() * 30)
		if (dec < 16) return LEFT
		else return RIGHT
	}

	class Cloud {
		constructor(x, y) {
			this.x = x
			this.y = y
			this.size = Math.floor(Math.random() * 30)
			this.dir = getDir()
			this.speed = Math.floor(Math.random() * 2) + 1
		}
		moveLeft() {
			this.x -= this.speed
		}
		moveRight() {
			this.x += this.speed
		}
		update() {
			if (!canvas) return
			if (this.x <= 0) {
				this.dir = RIGHT
			} else if (this.x >= canvas.width) {
				this.dir = LEFT
			}

			if (this.dir === LEFT) {
				this.moveLeft()
			} else {
				this.moveRight()
			}
		}

		drawRoot(x, y) {
			let sx = x,
				sy = y,
				ex = sx + Math.floor(Math.random() * 50) - 15,
				ey = sy + Math.floor(Math.random() * 30)

			let i = 0,
				limit = Math.floor(Math.random() * 20)

			while (i < limit) {
				// like drawing SVG path
				ctx.beginPath()
				ctx.strokeStyle = 'silver'
				ctx.lineWidth = 1
				ctx.moveTo(sx, sy)
				ctx.lineTo(ex, ey)
				ctx.stroke()

				sx = ex
				sy = ey
				ex = sx + Math.floor(Math.random() * 50) - 15
				ey = sy + Math.floor(Math.random() * 30)
				i++
			}
		}

		drawLightning() {
			// ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
			// ctx.fillRect(0, 0, canvas.width, canvas.height)
			let sx = this.x,
				sy = this.y,
				ex = sx + Math.floor(Math.random() * 30) - 15,
				ey = sy + Math.floor(Math.random() * 30)

			let i = 0,
				limit = Math.floor(Math.random() * 20) + 10

			while (i < limit) {
				// like drawing SVG path

				ctx.beginPath()
				ctx.strokeStyle = 'silver'
				ctx.lineWidth = 3
				ctx.moveTo(sx, sy)
				ctx.lineTo(ex, ey)
				ctx.stroke()

				sx = ex
				sy = ey
				ex = sx + Math.floor(Math.random() * 30) - 15
				ey = sy + Math.floor(Math.random() * 30)

				let root = Math.floor(Math.random() * 1000)
				if (root < 50) {
					this.drawRoot(sx, sy)
				}
				i++
			}
		}
		draw() {
			// ctx.beginPath()
			// ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
			// ctx.fill()

			const strike = Math.floor(Math.random() * 100000)

			if (strike < 100) {
				this.drawLightning()

				playThunder()

				setTimeout(() => {
					if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height)
				}, 100)
			}
		}
	}

	const clouds = []

	const animate = () => {
		// ctx.fillStyle = 'transparent'
		// ctx.fillRect(0, 0, canvas.width, canvas.height)
		// ctx.shadowColor = 'aliceblue'
		// ctx.shadowBlur = 10

		for (let c of clouds) {
			c.draw()
			c.update()
		}

		requestAnimationFrame(animate)
	}

	function resizeCanvas() {
		setCanvasSize()
		ctx = ctx = canvas.getContext('2d')
	}

	function setCanvasSize() {
		// const parent = getComputedStyle(document.documentElement)
		// const mr = Number(parent.marginRight.replace(/px$/, ''))
		// const ml = Number(parent.marginLeft.replace(/px$/, ''))
		// const mt = Number(parent.marginTop.replace(/px$/, ''))
		// const mb = Number(parent.marginBottom.replace(/px$/, ''))
		// const marginWidth = Math.round(ml + mr)
		// const marginHeight = Math.round(mt + mb)
		// const parentW = Number(parent.width.replace(/px$/, ''))
		// const parentH = Number(parent.height.replace(/px$/, ''))
		// const w = parentW - marginWidth
		// const h = parentH - marginHeight
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}

	onMount(() => {
		thunder = new Audio(thunderAudioURL)
		thunder.load()
		thunder.pause()

		setCanvasSize()
		ctx = canvas.getContext('2d')

		let i = 0
		while (i < canvas.width) {
			clouds.push(new Cloud(i, 0))
			i += Math.floor(Math.random() * 10) + 1
		}

		animate()
	})

	onDestroy(() => {
		if (thunderInterval) clearInterval(thunderInterval)
		thunder?.pause()
		thunder?.load()
	})
</script>

<svelte:window on:resize={resizeCanvas} />
<canvas bind:this={canvas} id="lightningCanvas"></canvas>

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* background-color: transparent; */
		/* color: white; */
		font-family: monospace;
	}
</style>
