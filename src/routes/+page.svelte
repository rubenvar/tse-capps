<script lang="ts">
	import '../app.scss';
	import { Color, ColorInput } from 'color-picker-svelte';
	import Gorro from '$lib/Gorro.svelte';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';

	let gorroColor = new Color('#bb1515');
	let letrasColor = new Color('#28235c');
	let logoColor = new Color('#00abaf');

	$: gorro = gorroColor.toHexString();
	$: letras = letrasColor.toHexString();
	$: logo = logoColor.toHexString();
</script>

<Header />

<main>
	<div class="inputs">
		<div class="colors">
			<ColorInput bind:color={gorroColor} title="Gorro" />
			<ColorInput bind:color={letrasColor} title="Letras" />
			<ColorInput bind:color={logoColor} title="Logo" />
		</div>
		<button>Comparte la cosa 🚀</button>
	</div>
	<Gorro {gorro} {letras} {logo} />
</main>

<p class="mas-info">
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
	}
</style>
