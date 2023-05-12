<template>
	<q-page class="q-pa-xl">
		<section>
			<div class="text-h4">Color</div>
			<q-separator class="q-my-md" />
			<div class="q-gutter-sm">
				<div class="q-pa-xs rounded-borders bg-primary text-yellow-10">
					primary
				</div>
				<div class="q-pa-xs rounded-borders bg-secondary">secondary</div>
				<div class="q-pa-xs rounded-borders bg-accent">accent</div>
				<div class="q-pa-xs rounded-borders bg-dark">dark</div>
				<div class="q-pa-xs rounded-borders bg-positive">positive</div>
				<div class="q-pa-xs rounded-borders bg-negative">negative</div>
				<div class="q-pa-xs rounded-borders bg-info">info</div>
				<div class="q-pa-xs rounded-borders bg-warning">warning</div>
				<div class="q-pa-xs rounded-borders bg-cyan-14">cyan-14</div>
				<p class="bg-error">Variables</p>
			</div>
		</section>
		<section>
			<div class="text-h4">Components</div>
			<q-separator class="q-my-md" />
			<q-btn color="primary" text-color="black" label="버튼이름" />
			<q-btn color="error" text-color="black" label="버튼이름" />
			<div class="q-pa-md q-gutter-sm">
				<q-btn color="white" text-color="black" label="Standard" />
				<q-btn color="primary" label="Primary" />
				<q-btn color="secondary" label="Secondary" />
				<q-btn color="amber" glossy label="Amber" />
				<q-btn color="brown-5" label="Brown 5" />
				<q-btn color="deep-orange" glossy label="Deep Orange" />
				<q-btn color="purple" label="Purple" />
				<q-btn color="error" label="Error" />
			</div>
		</section>
	</q-page>
</template>

<script setup></script>

<style lang="scss" scoped>
p {
	color: $red;
	background-color: $grey-5;
}

.text-error {
	color: $red;
}
.bg-error {
	background-color: $orange;
}
</style>
