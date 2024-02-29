<script>
	import BreadCrumb from '$lib/components/BreadCrumb.svelte'
	import Project from './Project.svelte'

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
		}
	]

	export let data
	$: ({ projects } = data)
</script>

<div class="container max-w-screen-lg mx-auto">
	<BreadCrumb {crumbs} />

	<div class="flex flex-wrap justify-around">
		{#each projects as project}
			<Project {project} />
		{/each}
	</div>
</div>
