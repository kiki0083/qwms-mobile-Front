<template>
	<q-page class="q-pa-md q-pa-md-xl">
		<section>
			<div class="text-h4">{{ $route.fullPath }}</div>
			<q-separator class="q-my-md" />
			<div class="target flex flex-center">
				<div class="text-h2">{{ $q.screen.name }}</div>
			</div>
		</section>
		<section>
			<div class="text-h4">$q.screen</div>
			<q-separator class="q-my-md" />
			<div>
				{{ $q.screen }}
			</div>
		</section>
	</q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
const $q = useQuasar();
console.log(JSON.stringify($q.screen, null, '\t'));
//console.log('$q.screen: ', $q.screen);
</script>

<style lang="scss" scoped>
.target {
	height: 200px;
	background-color: $dark;
}

@media (max-width: $breakpoint-xs-max) {
	.target {
		background-color: $red;
	}
}

.target {
	body.screen--sm & {
		background-color: $orange;
	}
}
</style>
