<script>
	let clazz
	export { clazz as class }
	export let clickable = false
</script>

{#if clickable}
	<a href="/" class="-m-1.5 p-1.5">
		<span class="sr-only">Task Co. Logo</span>
		<img
			class="mx-auto h-8 w-auto {clazz}"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Task Co. Logo" />
	</a>
{:else}
	<img
		class="mx-auto h-8 w-auto {clazz}"
		src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
		alt="Task Co. Logo" />
{/if}
