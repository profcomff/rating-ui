<script setup lang="ts">
import { useProfileStore } from '@/store';
import { onMounted } from 'vue';
import { setupAuth } from '@profcomff/api-uilib';
import ToastList from '@/components/ToastList.vue';

const profileStore = useProfileStore();

onMounted(() => {
	profileStore.fromUrl();
	console.log(document.location.toString());
	setupAuth(profileStore.token);
});
</script>

<template>
	<v-app>
		<main class="main">
			<Suspense>
				<RouterView />
				<template #fallback>Loading...</template>
			</Suspense>
			<ToastList />
		</main>
	</v-app>
</template>

<style scoped>
.main {
	width: min(900px, 100%);
	margin: 0 auto;
}
</style>
