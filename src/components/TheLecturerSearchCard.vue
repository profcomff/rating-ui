<template>
  <v-card
    class="my-2 position-relative"
    height="169"
    variant="elevated"
    rounded
  >
    <template #prepend>
      <div class="d-flex align-start">
        <v-avatar rounded class="mx-2" :image="photo" size="80" />
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
        <v-chip-group v-if="lecturer.subjects && lecturer.subjects.length > 0">
          <v-chip
            v-for="subject in lecturer.subjects.slice(0, 2)"
            :key="subject"
            :text="subject"
            size="small"
          ></v-chip>
          <v-chip
            v-if="lecturer.subjects.length > 2"
            :key="'more'"
            size="small"
          >
            еще {{ lecturer.subjects.length - 2 }}
          </v-chip>
        </v-chip-group>
        <div v-else-if="lecturer.subjects === null"></div>
        <div v-else>Нет предметов</div>
        <div>отзывы: {{ lecturer.comments?.length ?? "—" }}</div>
        <div>
          оценка: {{ lecturer.mark_general > 0 ? "+" : ""
          }}{{ lecturer.mark_general?.toFixed(2) ?? "—" }}
        </div>
      </div>
    </template>
    <template #actions>
      <v-btn
        class="position-absolute bottom-0 right-0 ma-5"
        :prepend-icon="'mdi-plus'"
        variant="elevated"
        base-color="secondary"
        size="small"
        rounded="pill"
        text="отзыв"
        @click.stop="toReviewPage"
      />
    </template>
    <v-spacer />
  </v-card>
</template>

<script setup lang="ts">
import { router } from "@/router";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();

const props = defineProps({
  lecturer: { type: Object, required: true },
  photo: { type: String, required: true },
});

function toReviewPage() {
  router.push({ path: "review", query: { lecturer_id: props.lecturer.id } });
}
</script>
