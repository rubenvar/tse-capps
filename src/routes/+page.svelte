<script lang="ts">
	import '../app.scss';
	import '@fontsource/mclaren';
	import '@fontsource/oxygen';
	import 'share-api-polyfill';

	import ColorPicker from 'svelte-awesome-color-picker';
	import Select from 'svelte-select';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { gorroColors } from '$lib/gorroColors';
	import Gorro from '$lib/Gorro.svelte';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import CustomPickerInput from '$lib/CustomPickerInput.svelte';

	// try to get colors in url on page init, or defaults
	let gorro = $page.url.searchParams.get('r') || '#cfc100'; // goRro
	let letras = $page.url.searchParams.get('l') || '#0c5ba8'; // Letras
	let logo = $page.url.searchParams.get('g') || '#00abaf'; // loGo

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
		<ColorPicker
			bind:hex={letras}
			label="Letras"
			isAlpha={false}
			components={{ input: CustomPickerInput }}
			on:input={({ detail }) => {
				updateUrl('l', detail.hex);
			}}
		/>
		<ColorPicker
			bind:hex={logo}
			label="Logo"
			isAlpha={false}
			components={{ input: CustomPickerInput }}
			on:input={({ detail }) => {
				updateUrl('g', detail.hex);
			}}
		/>
	</div>
	<button
		on:click={() => {
			navigator.share(
				{
					url: $page.url.toString(),
					title: 'Diseña el Gorro de la VI Travesía Santa Engracia',
					text: 'Ajusta los colores del gorro y el logo de la VI Travesía Santa Engracia y comparte tu creación con todo el mundo!'
				},
				// @ts-expect-error using a polyfill that accepts two args
				{ skype: false } // skype sharer gives error because of .parentNode, remove
			);
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
