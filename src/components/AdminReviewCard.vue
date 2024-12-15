<template>
  <v-card class="my-1 px-0" rounded>
    <template #title>
      <div class="text-h6 font-weight-bold">{{ lecturerName }}</div>
    </template>
    <template #subtitle>
      <div class="text-h7">
        {{ formattedDate }} | {{ "Анонимный отзыв" }}
      </div>
    </template>
    <template #text>
      <p class="text-subtitle-2">{{ comment.raw.text }}</p>
    </template>
    <template #actions>
      <v-btn
        class="font-weight-bold"
        color="primary"
        variant="text"
        @click="approveComment(comment.raw.uuid)"
      >
        Одобрить
      </v-btn>
      <v-btn
        class="font-weight-bold"
        color="#B3261E"
        variant="text"
        @click="dismissComment(comment.raw.uuid)"
      >
        Отклонить
      </v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from "@/api";
import { ToastType } from "@/models";
import { useToastStore } from "@/store/toastStore";
import { format } from 'date-fns';

const props = defineProps({
  comment: { type: Object, required: true },
});

const emit = defineEmits(["decided"]);

const toastStore = useToastStore();
const lecturerName = ref('');
const formattedDate = ref('');

onMounted(async () => {
  lecturerName.value = await getLecturerName(props.comment.raw.lecturer_id);
  formattedDate.value = format(new Date(props.comment.raw.create_ts), 'dd.MM.yyyy HH:mm');
});

async function getLecturerName(lecturerId: string) {
  const { response } = await apiClient.GET(`/lecturers/${lecturerId}`);
  if (response.ok) {
    return response.data.full_name;
  } else {
    toastStore.push({
      title: "Ошибка",
      type: ToastType.Error,
      description: "Не удалось получить имя лектора",
    });
    return 'Неизвестный лектор';
  }
}

async function approveComment(id: string) {
  try {
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
  } catch (error) {
    toastStore.push({
      title: "Ошибка",
      type: ToastType.Error,
      description: "Произошла ошибка при одобрении отзыва",
    });
  }
}

async function dismissComment(id: string) {
  try {
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
  } catch (error) {
    toastStore.push({
      title: "Ошибка",
      type: ToastType.Error,
      description: "Произошла ошибка при отклонении отзыва",
    });
  }
}
</script>
