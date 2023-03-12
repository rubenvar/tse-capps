<script lang="ts">
	import '../app.scss';
	import '@fontsource/mclaren';
	import '@fontsource/oxygen';

	import { Color, ColorInput } from 'color-picker-svelte';
	import Select from 'svelte-select';
	// import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { gorroColors } from '$lib/gorroColors';
	import Gorro from '$lib/Gorro.svelte';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';

	// try to get colors in url on page init
	const gorroInUrl = $page.url.searchParams.get('gorro');
	const letrasInUrl = $page.url.searchParams.get('letras');
	const logoInUrl = $page.url.searchParams.get('logo');

	// create color picker colors
	let letrasColor = new Color(letrasInUrl || '#28235c');
	let logoColor = new Color(logoInUrl || '#00abaf');

	// create color variables
	let gorro = gorroInUrl || '#bc4033'; // rojo
	$: letras = letrasColor.toHexString();
	$: logo = logoColor.toHexString();

	// helper function that updates the url search params on color pick
	function updateUrl(name: 'gorro' | 'letras' | 'logo', value: string) {
		if (!browser) return;

		const urlSearchParams = new URLSearchParams($page.url.searchParams);
		// set the color to url 👍
		urlSearchParams.set(name, value);

		goto(`?${urlSearchParams.toString()}`, {
			keepFocus: true,
			replaceState: true,
			noScroll: true
		});
	}
</script>

<Header titleColor={letras} />

	<button
		on:click={() => {
			navigator.share({ url: $page.url.toString() });
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
			<path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
			<path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
			<path d="M8.7 10.7l6.6 -3.4" />
			<path d="M8.7 13.3l6.6 3.4" />
		</svg>
		Comparte tu diseño con el mundo
	</button>
</main>

<p class="mas-info" style="--gorro:{gorro};">
	<a href="https://travesiasantaengracia.com" target="_blank">
		Toda la info de la travesía en la web!
	</a>
</p>

<Footer />

<style lang="scss">
	main {
		width: 100%;
		max-width: var(--maxWidth);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
		@media only screen and (max-width: 512px) {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
	.inputs {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 24px;
		padding: 24px 0;
		.select-item {
			display: flex;
			align-items: center;
			.select-color {
				width: 38px;
				height: 20px;
				display: inline-block;
				margin: 8px 11px 8px 0;
				/* border: 1px solid #777; */
				border-radius: 4px;
				box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
			}
		}
		button {
			background-color: var(--logo);
		}
		@media only screen and (max-width: 512px) {
			/* padding: 0; */
			gap: 12px;
			button {
				display: none;
			}
		}
	}
	.colors {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.mas-info {
		font-size: 24px;
		a {
			color: var(--gorro);
		}
	}
</style>
