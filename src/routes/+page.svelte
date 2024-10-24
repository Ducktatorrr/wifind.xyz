<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import Map from "$lib/Map.svelte";
</script>

<main class="flex md:gap-8 h-screen">
	<Map />
</main>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>
