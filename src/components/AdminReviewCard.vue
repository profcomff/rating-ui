<template>
  <v-card class="my-1 px-0" rounded>
    <template #title>
      <div class="text-h6 font-weight-bold">{{ "Иванов Иван" }}</div>
    </template>
    <template #subtitle>
      <div class="text-h7">
        {{ "31 октября 2018 20:31" }} | {{ "Анонимный отзыв" }}
      </div>
    </template>
    <template #text>
      <p class="text-subtitle-2">{{ comment.raw.text }}</p>
    </template>
    <template #actions>
      <v-btn
        class="font-weight-bold"
        color="primary"
        text="Одобрить"
        variant="text"
        @click="approveComment(comment.raw.uuid)"
      ></v-btn>
      <v-btn
        class="font-weight-bold"
        color="#B3261E"
        text="Отклонить"
        variant="text"
        @click="dismissComment(comment.raw.uuid)"
      ></v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import apiClient from "../api";
import { ToastType } from "../models";
import { useToastStore } from "../store/toastStore";

defineProps({
  comment: { type: Object, required: true },
});

const emit = defineEmits(["decided"]);

const toastStore = useToastStore();

async function approveComment(id: string) {
  const { response } = await apiClient.PATCH("/rating/comment/{uuid}", {
    params: {
      path: { uuid: id },
      query: { review_status: "approved" },
    },
  });
  if (response.ok) {
    toastStore.push({
      title: "Отзыв одобрен",
      type: ToastType.Info,
    });
    emit("decided");
  } else {
    toastStore.push({
      title: "Что-то не так",
      type: ToastType.Error,
      description: response.statusText,
    });
  }
}

async function dismissComment(id: string) {
  const { response } = await apiClient.PATCH("/rating/comment/{uuid}", {
    params: {
      path: { uuid: id },
      query: { review_status: "dismissed" },
    },
  });
  if (response.ok) {
    toastStore.push({
      title: "Отзыв отклонен",
      type: ToastType.Info,
    });
    emit("decided");
  } else {
    toastStore.push({
      title: "Что-то не так",
      type: ToastType.Error,
      description: response.statusText,
    });
  }
}
</script>
