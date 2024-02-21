<script>
	import '../app.scss'
	import { settings } from '$lib/stores/settings.js'
</script>

<div class:dark={$settings.darkMode}>
	<slot />
</div>
