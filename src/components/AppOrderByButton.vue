<template>
	<v-btn class="ma-1 text-body-2" rounded :variant="selected ? 'elevated' : 'tonal'" density="compact"></v-btn>
</template>

<script setup lang="ts">
defineProps({
	selected: { type: Boolean, required: true },
});
</script>
