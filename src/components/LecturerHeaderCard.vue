<template>
  <v-card class="container" width="100%" variant="elevated">
    <template #prepend>
      <v-avatar :size="mobile ? 80 : 120" rounded="0" :image="photo" />
    </template>
    <template #title>
      <div :class="mobile ? 'text-h6' : 'text-h4'">{{ lastName }}</div>
    </template>
    <template #subtitle>
      <div class="text-body-1">{{ firstName }} {{ middleName }}</div>
      <div class="text-body-2">
        <v-chip-group v-if="subjectsName">
          <v-chip
            v-for="(subject, index) in subjectsName"
            :key="index"
            outlined
            size="small"
          >
            {{ subject }}
          </v-chip>
        </v-chip-group>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();

defineProps({
  photo: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  subjectsName: { type: String, required: true },
});
</script>
