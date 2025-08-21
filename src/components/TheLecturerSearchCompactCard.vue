<template>
    <v-data-table :headers="headers" :items="[processedLecturer]" :search="search" :items-per-page="itemsPerPage"
        item-value="id" density="compact" hide-default-header hide-default-footer>

        <template #item.rating="{ item }">
            <v-chip size="small">
                {{ item.rating }}
            </v-chip>
        </template>

        <template #item.name="{ item }">
            <div>
                <div class="text-h6">{{ item.last_name }}</div>
                <div class="text-caption">
                    {{ item.first_name }} {{ item.middle_name }}
                </div>
            </div>
        </template>

        <template #item.subjects="{ item }">
            <v-chip-group>
                <v-chip v-for="subject in item.subjectsToShow.slice(0, 2)" :key="subject" size="small"
                    variant="outlined">
                    {{ subject }}
                </v-chip>
                <v-chip v-if="item.subjectsToShow.length > 2" size="small" variant="tonal">
                    ещё +{{ item.subjectsToShow.length - 2 }}
                </v-chip>
            </v-chip-group>
        </template>

        <template #item.comments="{ item }">
            {{ item.comments?.length || '—' }}
        </template>

        <template #item.mark_general="{ item }">
            <v-rating :model-value="item.mark_general" half-increments readonly size="small" density="compact" />
            <div class="text-caption">
                {{ item.mark_general > 0 ? '+' : '' }}{{ item.mark_general?.toFixed(2) || '—' }}
            </div>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const props = defineProps({
    lecturer: { type: Object, required: true },
    photo: { type: String, required: true },
    rating: { type: Number, required: true },
})

const search = ref('')
const itemsPerPage = ref(10)

// Автоматическое определение количества элементов на странице
const updateItemsPerPage = () => {
    if (mobile.value) {
        itemsPerPage.value = 5
    } else {
        // Рассчитываем, сколько элементов помещается на экране
        const rowHeight = 60; // Предполагаемая высота строки
        const tableHeaderHeight = 120; // Высота заголовка и поиска
        const paginationHeight = 50; // Высота пагинации
        const availableHeight = window.innerHeight - tableHeaderHeight - paginationHeight;
        itemsPerPage.value = Math.max(1, Math.floor(availableHeight / rowHeight));
    }
}

onMounted(() => {
    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateItemsPerPage)
})

const headers = [
    { title: 'Рейтинг', key: 'rating', width: '100px' },
    { title: 'ФИО', key: 'name', sortable: true },
    { title: 'Предметы', key: 'subjects' },
    { title: 'Отзывы', key: 'comments', align: 'end', width: '100px' },
    { title: 'Оценка', key: 'mark_general', align: 'end', width: '130px' }
]

const processedLecturer = computed(() => {
    return {
        ...props.lecturer,
        rating: props.rating,
        subjectsToShow: props.lecturer.subjects?.filter(item => item !== null) || []
    }
})
</script>