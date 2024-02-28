<script>
	import BreadCrumb from '$lib/components/BreadCrumb.svelte'
	import '$lib/../markdown.scss'

	export let data

	const crumbs = [
		{
			text: 'Home',
			icon: 'fa-solid fa-house',
			href: '/'
		},
		{
			text: 'Projects',
			icon: 'fa-solid fa-folder-open',
			href: '/projects'
		},
		{
			text: ''
		}
	]

	const tabs = [
		{
			name: 'About'
		},
		{
			name: 'Readme'
		}
	]

	function tabIsFirst(index) {
		return index == 0
	}

	function tabIsLast(index) {
		return index == tabs.length - 1
	}

	$: ({ project, readme, content } = data)
	$: crumbs[crumbs.length - 1].text = project?.name

	let tabSelection = 'About'
</script>

<div class="container max-w-screen-lg mx-auto">
	<BreadCrumb {crumbs} />

	<div class="font-color-default lg:flex lg:items-center lg:justify-between py-12">
		<div class="min-w-0 flex-1">
			<h1 class="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">{project.name}</h1>
			<p class="text-md leading-7 sm:truncate sm:tracking-tight py-4">{project.description}</p>

			<div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
				{#each project?.tags as tag}
					<div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
						{#if tag.icon}
							<i class="mr-2 {tag.icon}" />
						{/if}
						{tag.text}
					</div>
				{/each}
			</div>
			{#if !!project?.github || !!project?.demo}
				<div class="pt-12">
					{#if !!project?.demo}
						<a
							type="button"
							href={project.demo}
							target="_blank"
							class="text-slate-200 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-indigo-700 me-2 mb-2">
							<i class="mr-2 text-2xl fa-regular fa-circle-play"></i>
							Demo
							<i class="ml-1 fa-solid fa-up-right-from-square"></i>
						</a>
					{/if}

					{#if !!project?.github}
						<a
							type="button"
							href={project.github}
							target="_blank"
							class="font-color-default bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 border border-solid border-gray-300 dark:border-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
							<i class="mr-2 text-2xl fa-brands fa-github"></i>
							Source Code
							<i class="ml-1 fa-solid fa-up-right-from-square"></i>
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="inline-flex rounded-md shadow-sm" role="group">
		{#each tabs as tab, index}
			{#if tab.name != 'Readme' || !!readme}
				{#if tab.name == tabSelection}
					<button
						type="button"
						class="px-4 py-2 text-lg font-medium text-indigo-700 bg-gray-200 border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-indigo-700 dark:bg-gray-700 dark:border-gray-700 dark:text-indigo-400 dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
						class:border={tabIsFirst(index) || tabIsLast(index)}
						class:border-t={!tabIsFirst(index) && !tabIsLast(index)}
						class:rounded-s-lg={tabIsFirst(index)}
						class:rounded-e-lg={tabIsLast(index)}>
						{tab.name}
					</button>
				{:else}
					<button
						type="button"
						on:click={() => (tabSelection = tab.name)}
						class="px-4 py-2 text-lg font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-indigo-400 dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
						class:border={tabIsFirst(index) || tabIsLast(index)}
						class:border-t={!tabIsFirst(index) && !tabIsLast(index)}
						class:rounded-s-lg={tabIsFirst(index)}
						class:rounded-e-lg={tabIsLast(index)}>
						{tab.name}
					</button>
				{/if}
			{/if}
		{/each}
	</div>

	{#if tabSelection == 'About'}
		<div class="markdown">
			<svelte:component this={content} />
		</div>
	{/if}

	{#if tabSelection == 'Readme' && !!readme}
		<div class="markdown github text-[0.9rem]">
			{@html readme}
		</div>
	{/if}
</div>
