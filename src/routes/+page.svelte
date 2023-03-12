<script lang="ts">
	import '../app.scss';
	import '@fontsource/mclaren';
	import '@fontsource/oxygen';

	import { Color, ColorInput } from 'color-picker-svelte';
	import Select from 'svelte-select';
	import Gorro from '$lib/Gorro.svelte';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';

	import { browser } from '$app/environment';
	import { createQueryStore } from '$lib/colorsStore';
	// import { onMount } from 'svelte';

	let letrasColor = new Color('#28235c');
	let logoColor = new Color('#00abaf');

	let gorro = '#bb1515';
	$: letras = letrasColor.toHexString();
	$: logo = logoColor.toHexString();

	const gorroStore = createQueryStore('gorro');
	const letrasStore = createQueryStore('letras');
	const logoStore = createQueryStore('logo');

	// onMount(() => {
	// 	// set values to url on mount
	// 	// TODO maybe, if url already comes with values, this will break it because it replaces them?
	// 	// should get them and set them to the current page state
	// 	if (browser) {
	// 		gorroStore.set(gorro);
	// 		letrasStore.set(letras);
	// 		logoStore.set(logo);
	// 	}
	// });

	$: if (browser) {
		// on update, set the color to url 👍
		gorroStore.set(gorro);
		letrasStore.set(letras);
		logoStore.set(logo);
	}

	const gorroColors = [
		{ value: '#cfc100', label: 'Amarillo' },
		{ value: '#dedede', label: 'Blanco' },
		{ value: '#cb620f', label: 'Naranja' },
		{ value: '#bc4033', label: 'Rojo' },
		{ value: '#dc4491', label: 'Rosa' },
		{ value: '#8f2b29', label: 'Burdeos' },
		{ value: '#87c6e7', label: 'Celeste' },
		{ value: '#0059c1', label: 'Royal' },
		{ value: '#072e61', label: 'Marino' },
		{ value: '#a0a3a2', label: 'Plata' },
		{ value: '#c6ad69', label: 'Oro' },
		{ value: '#2b2b2b', label: 'Negro' },
		{ value: '#d2e73e', label: 'Flúor' },
		{ value: '#7dc764', label: 'Verde Hierba' },
		{ value: '#329c72', label: 'Verde Metal' },
		{ value: '#3ca642', label: 'Verde Benetton' }
	];
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
				value="#cfc100"
				--padding="0 10px"
				--input-padding="0"
				--value-container-padding="0"
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
			<ColorInput bind:color={letrasColor} title="Letras" />
			<ColorInput bind:color={logoColor} title="Logo" />
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
