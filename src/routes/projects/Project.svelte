<script>
	export let project
</script>

<a href="/projects/{project.id}" class="flex flex-col font-color-default block min-w-0 max-w-sm flex-1 rounded-lg shadow p-4 m-2 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
	<h1 class="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">{project.name}</h1>
	<p class="text-md leading-7 sm:tracking-tight py-4 grow">{project.description}</p>

	<div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
		{#each project?.tags as tag}
			<div class="mt-2 mr-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
				{#if tag.icon}
					<i class="mr-2 {tag.icon}" />
				{/if}
				{tag.text}
			</div>
		{/each}
	</div>
	{#if !!project?.demo}
		<div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
			<i class="mr-2 fa-regular fa-circle-play" />
			Demo Available
		</div>
	{/if}

	{#if !!project?.github}
		<div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
			<i class="mr-2 fa-brands fa-github" />
			Source Code
		</div>
	{/if}
</a>
