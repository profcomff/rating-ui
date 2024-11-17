<template>
  <v-text-field
    id="start"
    v-model="searchQuery"
    prepend-inner-icon="mdi-magnify"
    class="mx-2 py-2"
    variant="outlined"
    density="compact"
    placeholder="Поиск преподавателя"
    clearable
    hide-details="auto"
    single-line
    rounded="pill"
    :bg-color="'grey'"
    :base-color="'grey'"
    @update:model-value="emits('find-lecturer')"
  >
    <template #append-inner>
      <v-menu location-strategy="connected" location="start">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            :icon="'mdi-table-of-contents'"
            color="grey"
            variant="flat"
            focused
            density="compact"
          />
        </template>
        <v-card width="200">
          <template #text>
            <v-combobox
              v-model="subject"
              class="text-body-1"
              label="Предмет"
              :items="[''].concat(SUBJECTS)"
              density="compact"
              @click.stop
            />
            <v-select
              v-model="order"
              class="text-body-1"
              label="Сортировка"
              :items="['', 'по общей оценке']"
              density="compact"
              @click.stop
            />
            <v-btn
              v-if="isAdmin"
              class="w-100"
              color="red"
              variant="flat"
              density="compact"
              text="админка"
              @click="$router.push('admin')"
            />
          </template>
        </v-card>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { SUBJECTS } from "@/constants";
defineProps({
  isAdmin: { type: Boolean, required: true },
});

const searchQuery = defineModel("searchQuery", { type: String });
const subject = defineModel("subject", { type: String });
const order = defineModel("order", { type: String });

const emits = defineEmits({
  "find-lecturer": () => {
    return true;
  },
  "to-admin": () => {
    return true;
  },
  "selected-order": (order) => {
    return order;
  },
});
</script>
