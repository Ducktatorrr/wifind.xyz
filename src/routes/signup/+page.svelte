<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Alert, AlertDescription } from "$lib/components/ui/alert";
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	let message: string;

	export let form: ActionData;

	$: message = $page.url.searchParams.get("message") ?? "";
</script>

<div class="flex flex-col justify-center items-center h-screen">
	<h1
		class="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-red-300 to-yellow-200 inline-block text-transparent bg-clip-text"
	>
		WiFind.xyz
	</h1>
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Sign up</Card.Title>
			<Card.Description>
				Enter a username and password to create an account.
			</Card.Description>
		</Card.Header>
		<form method="POST" action="?/signup" use:enhance>
			{#if form?.error}
				<div class="px-6 mt-5">
					<Alert variant="destructive">
						<AlertDescription>
							{form.error}
						</AlertDescription>
					</Alert>
				</div>
			{/if}
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						type="text"
						placeholder="gristleking"
						autocomplete="username"
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						autocomplete="new-password"
						required
					/>
				</div>
			</Card.Content>
			<Card.Footer class="flex flex-col items-center">
				<Button type="submit" class="w-full">Create account</Button>
				<p class="text-sm pt-2">
					Already have an account? <a href="/login" class="underline">Login</a>
				</p>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
