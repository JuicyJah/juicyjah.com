<script>
	import { ROUTES } from '$lib/config.js'
	import { currentUser } from '$lib/stores/user.js'
	import FlyoutMenu from '$lib/components/nav/FlyoutMenu.svelte'

	export let mobile = false

	$: displayName = `${$currentUser?.user_metadata?.first_name ?? ''} ${$currentUser?.user_metadata?.last_name ?? ''}`.trim()

	let menuOpen = false
	const links = []
	// const links = [
	// 	{
	// 		title: 'Log Out',
	// 		href: ROUTES.logout
	// 	}
	// ]

	function toggleMenu() {
		menuOpen = !menuOpen
	}
</script>

<div class="hidden lg:flex lg:flex-1 lg:justify-end">
	{#if $currentUser}
		<button on:click={toggleMenu}>
			{displayName}
		</button>

		<div class="relative">
			{#if menuOpen}
				<FlyoutMenu {links} class="max-w-60" />
			{/if}
		</div>
		<!-- {:else}
		<div class="hidden lg:flex">
			<a class="button" href={ROUTES.login}>Log in</a>
			<a class="button primary" href={ROUTES.signup}>Sign Up</a>
		</div> -->
	{/if}
</div>

{#if mobile}
	<div class="py-6 lg:hidden">
		{#if $currentUser}
			<p class="text-lg">{displayName}</p>
			{#each links as link}
				<a class="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50" data-sveltekit-reload href={link.href}>{link.title}</a>
			{/each}
			<!-- {:else}
			<a class="button" href={ROUTES.login}>Log In</a>
			<a class="button primary" href={ROUTES.signup}>Sign Up</a> -->
		{/if}
	</div>
{/if}
