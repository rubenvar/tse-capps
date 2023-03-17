<script lang="ts">
	import '../app.scss';
	import '@fontsource/mclaren';
	import '@fontsource/oxygen';
	import 'share-api-polyfill';

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
	const gorroInUrl = $page.url.searchParams.get('r'); // goRro
	const letrasInUrl = $page.url.searchParams.get('l'); // Letras
	const logoInUrl = $page.url.searchParams.get('g'); // loGo

	// create color picker colors
	let letrasColor = new Color(letrasInUrl || '#28235c');
	let logoColor = new Color(logoInUrl || '#00abaf');

	// create color variables
	let gorro = gorroInUrl || '#bc4033'; // rojo
	$: letras = letrasColor.toHexString();
	$: logo = logoColor.toHexString();

	// helper function that updates the url search params on color pick
	function updateUrl(name: 'r' | 'l' | 'g', value: string) {
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

<main style="--logo:{logo};">
	<div class="inputs">
		<Select
			bind:justValue={gorro}
			items={gorroColors}
			clearable={false}
			searchable={false}
			value={gorro}
			--padding="0 10px"
			--input-padding="0"
			--value-container-padding="0"
			on:input={({ detail }) => {
				updateUrl('r', detail.value);
			}}
		>
			<div slot="selection" let:selection class="select-item">
				<span class="select-color" style="background-color:{selection.value};" />
				Gorro
			</div>
			<div slot="item" let:item class="select-item">
				<span class="select-color" style="background-color:{item.value};" />
				{item.label}
			</div>
		</Select>
		<ColorInput
			bind:color={letrasColor}
			title="Letras"
			onInput={() => {
				updateUrl('l', letras);
			}}
		/>
		<ColorInput
			bind:color={logoColor}
			title="Logo"
			onInput={() => {
				updateUrl('g', logo);
			}}
		/>
	</div>
	<button
		on:click={() => {
			navigator
				.share(
					{
						url: $page.url.toString(),
						title: 'Diseña el Gorro de la VI Travesía Santa Engracia',
						text: 'Ajusta los colores del gorro y el logo, y comparte tu creación con todo el mundo!'
					},
					{ skype: false }
				)
				.then(() => {
					console.log('sharing');
				})
				.catch((er) => {
					console.error('some error, not working :(', er);
				});
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
	<div class="gorro">
		<Gorro {gorro} {letras} {logo} />
	</div>
</main>

<p class="mas-info" style="--gorro:{gorro};">
	<a href="https://travesiasantaengracia.com" target="_blank">
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
			<path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
			<path d="M10 14l10 -10" />
			<path d="M15 4l5 0l0 5" />
		</svg> Y mira toda la info de la travesía en la web
	</a>
</p>

<Footer />

<style lang="scss">
	main {
		width: 100%;
		max-width: var(--maxWidth);
		margin: 0 auto;
		display: grid;
		grid-template-areas: 'inputs gorro' 'button gorro';
		grid-template-columns: 1fr 1fr;
		gap: 30px;
		/* justify-content: center; */
		@media only screen and (max-width: 512px) {
			grid-template-areas: 'gorro' 'inputs' 'button';
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
	.inputs {
		grid-area: inputs;
		align-self: start;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 24px;
		margin: 24px 0;
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
		@media only screen and (max-width: 512px) {
			margin: 12px 0;
			gap: 12px;
		}
	}
	button {
		grid-area: button;
		background-color: var(--logo);
		font-family: inherit;
		font-size: inherit;
		padding: 12px;
		border: none;
		border-radius: 6px;
		margin: 24px 0;
		@media only screen and (max-width: 512px) {
			margin: 12px 0 24px;
		}
		svg {
			vertical-align: top;
			width: 22px;
			height: 22px;
			margin-right: 6px;
		}
	}
	.gorro {
		justify-self: center;
		grid-area: gorro;
		/* margin: 0 auto; */
	}
	.mas-info {
		font-size: 24px;
		text-align: center;
		a {
			color: var(--gorro);
			svg {
				vertical-align: top;
				width: 28px;
				height: 28px;
			}
		}
	}
</style>
