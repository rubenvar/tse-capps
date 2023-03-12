<script lang="ts">
	export let titleColor: string;
</script>

<header style="--titleColor:{titleColor};">
	<h1>Diseña el gorro de la VI Travesía Santa Engracia!</h1>
</header>

<style lang="scss">
	header {
		margin-top: 40px;
		width: 100%;
		max-width: var(--maxWidth);
		@media only screen and (max-width: 512px) {
			margin-top: 12px;
		}
	}
	h1 {
		font-family: 'McLaren', system-ui, -apple-system, Oxygen, Ubuntu, 'Open Sans', sans-serif;
		font-size: 46px;
		color: var(--titleColor);
		@media only screen and (max-width: 768px) {
			font-size: 32px;
		}
		@media only screen and (max-width: 512px) {
			font-size: 25px;
		}
	}
</style>
