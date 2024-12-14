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
            :icon="'mdi-filter-variant'"
            color="grey"
            variant="flat"
            focused
            density="compact"
          />
        </template>
        <v-card width="400">
          <template #text>
            <v-combobox
              v-model="subject"
              class="text-body-1 mb-2"
              label="Предмет"
              :items="[''].concat(SUBJECTS)"
              density="compact"
              hide-details="auto"
              @click.stop
            />
            <v-row class="w-100" no-gutters>
              <v-select
                v-model="order"
                class="text-body-1"
                label="Сортировка"
                :items="orderTypes"
                density="compact"
                hide-details="auto"
                @click.stop
              />
              <v-btn
                :icon="iconAscDesc"
                density="comfortable"
                variant="flat"
                @click.stop="changeAscDesc"
              ></v-btn>
            </v-row>
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
import { ref } from "vue";

defineProps({
  isAdmin: { type: Boolean, required: true },
});

const searchQuery = defineModel("searchQuery", { type: String });
const subject = defineModel("subject", { type: String });
const order = defineModel("order", { type: String });
const orderTypes = [
  "по общей оценке",
  "по доброте",
  "по халявности",
  "по понятности",
  "по фамилии",
];
const iconAscDesc = ref<string>("mdi-sort-alphabetical-ascending");

const emits = defineEmits({
  "find-lecturer": () => {
    return true;
  },
  "changed-asc-desc": () => {
    return true;
  },
});

function changeAscDesc() {
  iconAscDesc.value =
    iconAscDesc.value === "mdi-sort-alphabetical-ascending"
      ? "mdi-sort-alphabetical-descending"
      : "mdi-sort-alphabetical-ascending";
  emits("changed-asc-desc");
}
</script>
