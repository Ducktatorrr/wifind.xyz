<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import CircleUser from "lucide-svelte/icons/circle-user";
	import Menu from "lucide-svelte/icons/menu";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { toast } from "svelte-sonner";
	import { Toaster } from "$lib/components/ui/sonner";

	export let data: PageData;

	function copyToken() {
		if (data.user?.token) {
			navigator.clipboard
				.writeText(data.user.token)
				.then(() => {
					toast.success("Token copied to clipboard", {
						description: "You can now use this token for API requests",
					});
				})
				.catch((err) => {
					console.error("Failed to copy token: ", err);
					toast.error("Failed to copy token", {
						description: "Please try again or copy manually",
					});
				});
		} else {
			toast.error("No token available", {
				description: "Please log in to get a token",
			});
		}
	}
</script>

<Toaster />

<div class="flex min-h-screen w-full flex-col">
	{#if $page.url.pathname !== "/login" && $page.url.pathname !== "/signup"}
		<header
			class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6"
		>
			<nav
				class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
			>
				<a
					href="/"
					class="flex items-center gap-2 text-lg font-semibold md:text-base"
				>
					<h1
						class="bg-gradient-to-r from-blue-500 via-red-300 to-yellow-200 inline-block text-transparent bg-clip-text"
					>
						WiFind.xyz
					</h1>
					<span class="sr-only">WiFind.xyz</span>
				</a>
				{#if data.user}
					<a
						href="/"
						class={`text-foreground hover:text-foreground transition-colors ${
							$page.url.pathname === "/"
								? "text-foreground"
								: "text-muted-foreground"
						}`}
					>
						Dashboard
					</a>
					<a
						href="/upload"
						class={`text-foreground hover:text-foreground transition-colors ${
							$page.url.pathname === "/upload"
								? "text-foreground"
								: "text-muted-foreground"
						}`}
					>
						Upload
					</a>
					<a
						href="/leaderboard"
						class={`text-foreground hover:text-foreground transition-colors ${
							$page.url.pathname === "/leaderboard"
								? "text-foreground"
								: "text-muted-foreground"
						}`}
					>
						Leaderboard
					</a>
				{/if}
			</nav>
			{#if data.user}
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button
							variant="outline"
							size="icon"
							class="shrink-0 md:hidden"
							builders={[builder]}
						>
							<Menu class="h-5 w-5" />
							<span class="sr-only">Toggle navigation menu</span>
						</Button>
					</Sheet.Trigger>

					<Sheet.Content side="left">
						<nav class="grid gap-6 text-lg font-medium">
							<a href="/" class="flex items-center gap-2 text-lg font-semibold">
								<h1
									class="bg-gradient-to-r from-blue-500 via-red-300 to-yellow-200 inline-block text-transparent bg-clip-text"
								>
									WiFind.xyz
								</h1>
								<span class="sr-only">WiFind.xyz</span>
							</a>

							<a href="/" class="hover:text-foreground"> Dashboard </a>
							<a
								href="/upload"
								class="text-muted-foreground hover:text-foreground"
							>
								Upload
							</a>
							<a
								href="/leaderboard"
								class="text-muted-foreground hover:text-foreground"
							>
								Leaderboard
							</a>
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			{/if}
			{#if data.user}
				<div
					class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4"
				>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="secondary"
								size="icon"
								class="rounded-full ml-auto"
							>
								<CircleUser class="h-5 w-5" />
								<span class="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Label>{data.user?.username}</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item on:click={copyToken}
								>Copy Token</DropdownMenu.Item
							>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<form action="/logout" method="post">
									<button type="submit">Logout</button>
								</form>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			{/if}
		</header>
	{/if}

	<slot></slot>
</div>
