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

<main>
	<div class="inputs" style="--logo:{logo};">
		<div class="colors">
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
					updateUrl('gorro', detail.value);
				}}
			>
				<div slot="selection" let:selection class="select-item">
					<span class="select-color" style="background-color:{selection.value};" />
					{selection.label}
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
					updateUrl('letras', letras);
				}}
			/>
			<ColorInput
				bind:color={logoColor}
				title="Logo"
				onInput={() => {
					updateUrl('logo', logo);
				}}
			/>
		</div>
		<button>Comparte la cosa 🚀</button>
	</div>
	<Gorro {gorro} {letras} {logo} />
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
