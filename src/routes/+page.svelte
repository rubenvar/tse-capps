<script lang="ts">
	import '../app.scss';
	import '@fontsource/mclaren';
	import '@fontsource/oxygen';

	import { Color, ColorInput } from 'color-picker-svelte';
	import Gorro from '$lib/Gorro.svelte';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';

	import { browser } from '$app/environment';
	import { createQueryStore } from '$lib/colorsStore';
	// import { onMount } from 'svelte';

	let gorroColor = new Color('#bb1515');
	let letrasColor = new Color('#28235c');
	let logoColor = new Color('#00abaf');

	$: gorro = gorroColor.toHexString();
	$: letras = letrasColor.toHexString();
	$: logo = logoColor.toHexString();

	const gorroStore = createQueryStore('gorro');
	$: console.log($gorroStore);
	const letrasStore = createQueryStore('letras');
	$: console.log($letrasStore);
	const logoStore = createQueryStore('logo');
	$: console.log($logoStore);

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
</script>

<Header titleColor={letras} />

<main>
	<div class="inputs" style="--logo:{logo};">
		<div class="colors">
			<ColorInput bind:color={gorroColor} title="Gorro" />
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
