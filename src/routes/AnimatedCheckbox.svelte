<script>
	export let active = false

	const height = 50
	const width = 50
</script>

<div class="checkbox-wrapper absolute top-0 right-0">
	<div class="checkbox" class:active style="--width: {width}px; --height: {height}px;"></div>
</div>

<style>
	/* Checkmark style starts */
	@-moz-keyframes dothabottomcheck {
		0% {
			height: 0;
		}
		100% {
			height: calc(var(--height) / 2);
		}
	}
	@-webkit-keyframes dothabottomcheck {
		0% {
			height: 0;
		}
		100% {
			height: calc(var(--height) / 2);
		}
	}
	@keyframes dothabottomcheck {
		0% {
			height: 0;
		}
		100% {
			height: calc(var(--height) / 2);
		}
	}
	@keyframes dothatopcheck {
		0% {
			height: 0;
		}
		50% {
			height: 0;
		}
		100% {
			height: calc(var(--height) * 1.2);
		}
	}
	@-webkit-keyframes dothatopcheck {
		0% {
			height: 0;
		}
		50% {
			height: 0;
		}
		100% {
			height: calc(var(--height) * 1.2);
		}
	}
	@-moz-keyframes dothatopcheck {
		0% {
			height: 0;
		}
		50% {
			height: 0;
		}
		100% {
			height: calc(var(--height) * 1.2);
		}
	}

	.checkbox {
		height: var(--height);
		width: var(--width);
		background-color: transparent;
		border: calc(var(--width) / 10) solid black;
		border-radius: calc(var(--width) / 20);
		position: relative;
		display: inline-block;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-moz-transition: border-color ease 0.2s;
		-o-transition: border-color ease 0.2s;
		-webkit-transition: border-color ease 0.2s;
		transition: border-color ease 0.2s;
		cursor: pointer;
	}

	.checkbox::before,
	.checkbox::after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		position: absolute;
		height: 0;
		width: calc(var(--width) / 5);
		background-color: #34b93d;
		display: inline-block;
		-moz-transform-origin: left top;
		-ms-transform-origin: left top;
		-o-transform-origin: left top;
		-webkit-transform-origin: left top;
		transform-origin: left top;
		border-radius: calc(var(--width) / 20);
		content: ' ';
		-webkit-transition: opacity ease 0.5;
		-moz-transition: opacity ease 0.5;
		transition: opacity ease 0.5;
	}

	.checkbox::before {
		top: calc(var(--height) * 0.72);
		left: calc(var(--width) * 0.41);
		-moz-transform: rotate(-135deg);
		-ms-transform: rotate(-135deg);
		-o-transform: rotate(-135deg);
		-webkit-transform: rotate(-135deg);
		transform: rotate(-135deg);
	}

	.checkbox::after {
		top: calc(var(--height) * 0.37);
		left: calc(var(--width) / 20);
		-moz-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}

	.checkbox.active {
		border-color: #34b93d;
	}

	.checkbox.active::after {
		height: calc(var(--height) / 2);
		-moz-animation: dothabottomcheck 0.2s ease 0s forwards;
		-o-animation: dothabottomcheck 0.2s ease 0s forwards;
		-webkit-animation: dothabottomcheck 0.2s ease 0s forwards;
		animation: dothabottomcheck 0.2s ease 0s forwards;
	}

	.checkbox.active::before {
		height: calc(var(--height) * 1.2);
		-moz-animation: dothatopcheck 0.4s ease 0s forwards;
		-o-animation: dothatopcheck 0.4s ease 0s forwards;
		-webkit-animation: dothatopcheck 0.4s ease 0s forwards;
		animation: dothatopcheck 0.4s ease 0s forwards;
	}
</style>
