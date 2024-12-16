<template>
  <div class="d-flex position-relative">
    <v-progress-linear
      class="w-50 text-body-2 my-2 text-small"
      :size="mobile ? 110 : 130"
      height="20"
      max="4"
      reverse
      :model-value="value < 0 ? -value : 0"
      :color="color"
    ></v-progress-linear>
    <v-progress-linear
      class="w-50 text-body-2 my-2 text-small"
      :size="mobile ? 110 : 130"
      height="20"
      max="4"
      :model-value="value > 0 ? value : 0"
      :color="color"
    ></v-progress-linear>
    <v-row
      class="w-100 position-absolute my-1"
      no-gutters
      justify="space-between"
      align="center"
    >
      <v-col cols="3">
        <span class="text-left ml-1 font-weight-bold">-2</span>
      </v-col>
      <v-col cols="5">
        <div class="text-center font-weight-bold">
          {{ label }}: {{ displayValue }}
        </div>
      </v-col>
      <v-col cols="3" class="text-right mr-1 font-weight-bold">+2</v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();

const props = defineProps({
  value: { type: Number, required: true },
  label: { type: String, required: true },
});

const displayValue =
  (props.value > 0 ? "+" : "") + String(props.value.toFixed(2));
const value = props.value;

let color = "rgb(0, 0, 0)";
if (value < 0) {
  color = "#B3261E66";
} else if (value > 0) {
  color = "#00004B66";
}
</script>
