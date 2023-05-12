<template>
	<q-page class="q-pa-md q-pa-md-xl">
		<section>
			<div class="text-h4">{{ $route.fullPath }}</div>
			<q-separator class="q-my-md" />
			<div class="q-gutter-y-lg">
				<div class="shadow-1 q-pa-sm">Shadow 1</div>
				<div class="shadow-7 q-pa-sm">Shadow 7</div>
				<div class="shadow-24 q-pa-sm">Shadow 24</div>
			</div>
		</section>
		<section>
			<div class="text-h4">Visibility</div>
			<q-separator class="q-my-md" />
			<div class="ellipsis-3-lines cursor-not-allowed">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
				dignissimos exercitationem inventore distinctio autem expedita rem
				omnis, accusamus fugit labore alias tempore consectetur hic
				necessitatibus. Aut cum minus adipisci a!
			</div>
		</section>
	</q-page>
</template>

<script setup></script>

<style lang="scss" scoped></style>
