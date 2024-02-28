<script>
	export let crumbs = [
		{
			text: 'Home',
			icon: 'fa-solid fa-house',
			href: '/'
		}
	]
</script>

<nav class="flex py-4 text-md font-medium" aria-label="Breadcrumb">
	<ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-gray-500 dark:text-gray-400">
		{#each crumbs as crumb, index}
			{#if index == 0}
				<li class="inline-flex items-center">
					<a href={crumb.href} class="inline-flex items-center text-[inherit] hover:text-indigo-700 dark:hover:text-white">
						{#if crumb.icon}
							<i class="mr-2 {crumb.icon}" />
						{/if}
						{crumb.text}
					</a>
				</li>
			{:else if index < crumbs.length - 1}
				<li>
					<div class="flex items-center">
						<i class="mr-2 fa-solid fa-chevron-right"></i>
						<!-- <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</a> -->
						<a href={crumb.href} class="text-gray-700 dark:text-gray-400 text-[inherit] hover:text-indigo-700 dark:hover:text-white">
							{#if crumb.icon}
								<i class="mr-2 {crumb.icon}" />
							{/if}
							{crumb.text}
						</a>
					</div>
				</li>
			{:else if index >= crumbs.length - 1}
				<li aria-current="page">
					<div class="flex items-center">
						<i class="fa-solid fa-chevron-right"></i>
						<span class="ms-1 text-[inherit] md:ms-2">{crumb.text}</span>
					</div>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
