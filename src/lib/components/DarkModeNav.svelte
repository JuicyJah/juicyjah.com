<script>
	import { settings } from '$lib/stores/settings.js'

	function toggleDarkMode() {
		settings.toggleDarkMode()
	}
</script>

<div class="w-full p-8 flex items-center justify-between">
	<a href="/" class="text-base font-medium text-slate-600 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">JuicyJah</a>
	<button class="text-3xl dark:text-slate-200 z-10" on:click={toggleDarkMode}>
		{#if $settings.darkMode}
			<i class="fa-regular fa-lightbulb"></i>
		{:else}
			<i class="fa-regular fa-moon"></i>
		{/if}
	</button>
</div>
