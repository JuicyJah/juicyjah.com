<script>
	export let annotations
	export let type
	export let text
	export let plain_text
</script>

<span class:font-bold={annotations?.bold} class:italic={annotations?.italic} class:underline={annotations?.underline} class:strikethrough={annotations?.strikethrough}>{plain_text}</span>
