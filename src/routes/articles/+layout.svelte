<script>
</script>

<div class="mt-[-6rem] min-h-screen articles-bg">
	<div class="max-w-2xl mx-auto px-6 py-16 text-base">
		<slot />
	</div>
</div>

<style>
	.articles-bg {
		background: linear-gradient(120deg, #fafafa, #f4f4f7, #f7f4f5, #f3f4f8, #fafafa);
		background-size: 300% 300%;
		animation: gradient-shift 12s ease infinite;
	}

	:global(.dark) .articles-bg {
		background: linear-gradient(120deg, #09090b, #0e0e14, #111113, #0c0c11, #09090b);
		background-size: 300% 300%;
		animation: gradient-shift 12s ease infinite;
	}

	@keyframes gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
