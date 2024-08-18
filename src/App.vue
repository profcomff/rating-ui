<script setup lang="ts">
import { useProfileStore } from './store';
import { onMounted } from 'vue';

const profileStore = useProfileStore();

onMounted(() => {
	profileStore.fromUrl();
});
</script>

<template>
	<v-app>
		<main class="main">
			<Suspense>
				<RouterView />
				<template #fallback>Loading...</template>
			</Suspense>
		</main>
	</v-app>
</template>

<style scoped>
.main {
	width: min(900px, 100%);
	margin: 0 auto;
}

.container {
	width: 100%;
	height: 100%;
}

footer {
	position: sticky;
	bottom: 0;
	width: 100%;
	color: gray;
	text-align: center;

	& .logo {
		height: 30px;
		vertical-align: middle;
	}
}
</style>
