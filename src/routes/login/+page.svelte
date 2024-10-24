<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import * as Alert from "$lib/components/ui/alert";
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	let message: string;

	export let form: ActionData;

	$: created = $page.url.searchParams.get("created") ?? "";
	// need logic to set a message if created is true
	$: if (created) {
		message = "Account created successfully. Please login.";
	}
</script>

<div class="flex flex-col justify-center items-center h-screen">
	<h1
		class="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-red-300 to-yellow-200 inline-block text-transparent bg-clip-text"
	>
		WiFind.xyz
	</h1>
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			{#if message}
				<div class="mb-4">
					<Alert.Root class="border-green-800 text-green-800">
						<Alert.Title>Success!</Alert.Title>
						<Alert.Description>{message}</Alert.Description>
					</Alert.Root>
				</div>
			{/if}
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>
				Enter your username below to login to your account.
			</Card.Description>
		</Card.Header>
		<form method="POST" action="?/login" use:enhance>
			{#if form?.error}
				<div class="px-6 mt-5">
					<Alert.Root variant="destructive">
						<Alert.Title>Uh oh!</Alert.Title>
						<Alert.Description>
							{message || form.error}
						</Alert.Description>
					</Alert.Root>
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
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
					/>
				</div>
			</Card.Content>
			<Card.Footer class="flex flex-col items-center">
				<Button type="submit" class="w-full">Sign in</Button>
				<p class="text-sm pt-2">
					Don't have an account? <a href="/signup" class="underline">Sign up</a>
				</p>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
