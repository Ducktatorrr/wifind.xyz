<script lang="ts">
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Alert from "$lib/components/ui/alert";
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";

	export let form: ActionData;
</script>

<main class="flex flex-col p-4 md:p-8 items-center h-screen">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			{#if form?.error}
				<div class="mb-4">
					<Alert.Root variant="destructive">
						<Alert.Title>Uh oh!</Alert.Title>
						<Alert.Description>{form.error}</Alert.Description>
					</Alert.Root>
				</div>
			{/if}
			{#if form?.success}
				<div class="mb-4">
					<Alert.Root class="border-green-800 text-green-800">
						<Alert.Title>Success!</Alert.Title>
						<Alert.Description>{form.success}</Alert.Description>
					</Alert.Root>
				</div>
			{/if}
			<Card.Title>Upload</Card.Title>
			<Card.Description>Upload GZipped CSV File</Card.Description>
		</Card.Header>
		<Card.Content class="">
			<form
				method="POST"
				action="?/upload"
				use:enhance
				enctype="multipart/form-data"
			>
				<Label for="csv">CSV File (GZipped or CSV):</Label>
				<Input
					class="mb-4"
					id="csv"
					name="csv"
					type="file"
					accept=".csv,.gz"
					required
				/>
				<Button type="submit">Upload</Button>
			</form>
		</Card.Content>
	</Card.Root>
</main>
