<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
</script>

<main class="flex p-4 md:gap-8 md:p-8 h-screen">
	<Card.Root class="flex flex-col w-full h-[calc(100vh-150px)]">
		<Card.Header>
			<Card.Title>Map</Card.Title>
		</Card.Header>
		<Card.Content class="flex-grow relative">
			<iframe
				src="http://154.3.237.106:8081/"
				class="w-full h-full"
				scrolling="no"
				title="Map"
			></iframe>
		</Card.Content>
	</Card.Root>
</main>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>
