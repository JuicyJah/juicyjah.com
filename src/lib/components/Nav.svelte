<script>
	import CompanyLogo from '$lib/components/CompanyLogo.svelte'
	import MobileNav from '$lib/components/nav/MobileNav.svelte'
	import FlyoutMenu from '$lib/components/nav/FlyoutMenu.svelte'
	import UserControl from '$lib/components/nav/UserControl.svelte'

	let selectedDropdown,
		menuOpen = false
	let items = [
		{
			title: 'Product',
			dropdown: 'product',
			items: [
				{
					title: 'Analytics',
					description: 'Get a better understanding of your traffic',
					href: ''
				},
				{
					title: 'Engagement',
					description: 'Speak directly to your customers',
					href: ''
				},
				{
					title: 'Security',
					description: 'Your customers’ data will be safe and secure',
					href: ''
				},
				{
					title: 'Integrations',
					description: 'Connect with third-party tools',
					href: ''
				},
				{
					title: 'Automations',
					description: 'Build strategic funnels that will convert',
					href: ''
				}
			]
		},
		{
			title: 'Features',
			href: '/features'
		},
		{
			title: 'Marketplace',
			href: '/market'
		},
		{
			title: 'Company',
			href: '/about'
		}
	]

	function select(toSelect) {
		selectedDropdown = selectedDropdown != toSelect ? toSelect : null
	}

	function toggleMenu() {
		menuOpen = !menuOpen
	}
</script>

<header class="bg-white">
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<CompanyLogo class="h-8" clickable={true} />
		</div>
		<div class="flex lg:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
				on:click={toggleMenu}>
				<span class="sr-only">Open main menu</span>
				<i class="fa-solid fa-bars text-xl"></i>
			</button>
		</div>
		<div class="hidden lg:flex lg:gap-x-12">
			{#each items as item}
				{#if item.dropdown}
					<div class="relative">
						<button
							type="button"
							class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
							on:click={() => select(item.dropdown)}
							aria-expanded={selectedDropdown == item.dropdown}>
							{item.title}
							<i class="fa-solid fa-chevron-down text-xs"></i>
						</button>

						{#if selectedDropdown == item.dropdown}
							<FlyoutMenu links={item.items} class="max-w-md" />
						{/if}
					</div>
				{:else if item.href}
					<a href={item.href} class="text-sm font-semibold leading-6 text-gray-900">{item.title}</a>
				{/if}
			{/each}
		</div>
		<UserControl />
	</nav>
	<MobileNav {items} bind:selectedDropdown bind:open={menuOpen} />
</header>
