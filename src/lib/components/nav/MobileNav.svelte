<script>
	import CompanyLogo from '$lib/components/CompanyLogo.svelte'
	import UserControl from '$lib/components/nav/UserControl.svelte'

	export let items
	export let selectedDropdown
	export let open = false
	function select(toSelect) {
		selectedDropdown = selectedDropdown != toSelect ? toSelect : null
	}

	function toggleMenu() {
		open = !open
	}
</script>

<!-- Mobile menu, show/hide based on menu open state. -->
{#if open}
	<div class="lg:hidden" role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 z-10"></div>
		<div
			class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
			<div class="flex items-center justify-between">
				<CompanyLogo clickable={true} />
				<button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" on:click={toggleMenu}>
					<span class="sr-only">Close menu</span>
					<i class="fa-solid fa-xmark text-2xl"></i>
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="-my-6 divide-y divide-gray-500/10">
					<div class="space-y-2 py-6">
						{#each items as item}
							{#if item.dropdown}
								<div class="-mx-3">
									<button
										type="button"
										class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										aria-controls="disclosure-1"
										on:click={() => select(item.dropdown)}
										aria-expanded={selectedDropdown == item.dropdown}>
										{item.title}
										<i class="fa-solid fa-chevron-down text-xs"></i>
									</button>
									<!-- 'Product' sub-menu, show/hide based on menu state. -->
									{#if item.dropdown == selectedDropdown}
										<div class="mt-2 space-y-2" id="disclosure-1">
											{#each item.items as link}
												<a
													href={link.href}
													class="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
													>{link.title}</a>
											{/each}
										</div>
									{/if}
								</div>
							{:else if item.href}
								<a
									href={item.href}
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>{item.title}</a>
							{/if}
						{/each}
					</div>
					<UserControl mobile={true} />
				</div>
			</div>
		</div>
	</div>
{/if}
