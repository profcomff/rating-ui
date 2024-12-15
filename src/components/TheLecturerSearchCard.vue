<template>
  <v-card
    class="my-4 position-relative"
    :height="height"
    variant="elevated"
    rounded="xl"
  >
    <template #prepend>
      <div class="position-relative">
        <div class="d-flex align-start position-relative">
          <v-avatar rounded class="mx-2 my-2" :image="photo" size="80" />
        </div>
        <div
          class="position-absolute top-0 left-0 text-caption font-weight-bold bg-white rounded-xl border-sm px-1"
        >
          1234
        </div>
      </div>
    </template>
    <template #title>
      <div :class="mobile ? 'text-h7' : 'text-h5'">
        {{ lecturer.last_name }}
      </div>
    </template>
    <template #subtitle>
      <div :class="mobile ? 'text-body-2' : 'text-body-1'">
        {{ lecturer.first_name }} {{ lecturer.middle_name }}
      </div>
      <div class="text-body-2">
        <v-chip-group v-if="displaySubjects">
          <v-chip
            v-for="subject in lecturer.subjects.slice(0, 2)"
            :key="subject"
            :text="subject"
            size="small"
            readonly
            :ripple="false"
          />
          <v-chip
            v-if="lecturer.subjects.length > 2"
            :key="'more'"
            size="small"
            readonly
          >
            еще {{ lecturer.subjects.length - 2 }}
          </v-chip>
        </v-chip-group>
        <div v-else-if="lecturer.subjects === null" class="mt-2"></div>
        <!-- <div v-else class="text-caption-2">Нет предметов</div> -->
        <div>отзывы: {{ lecturer.comments?.length ?? "—" }}</div>
        <div>
          оценка: {{ lecturer.mark_general > 0 ? "+" : ""
          }}{{ lecturer.mark_general?.toFixed(2) ?? "—" }}
        </div>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const props = defineProps({
  lecturer: { type: Object, required: true },
  photo: { type: String, required: true },
});

const displaySubjects = ref(false);
displaySubjects.value =
  props.lecturer.subjects &&
  props.lecturer.subjects.length > 0 &&
  props.lecturer.subjects[0] !== null;

const height = ref(120);
height.value = displaySubjects.value ? 160 : 120;
</script>
