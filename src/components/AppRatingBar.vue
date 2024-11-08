<template>
  <v-progress-linear
    class="rating-bar text-body-2 my-2 text-small"
    :size="smAndDown ? 110 : 130"
    height="20"
    max="4"
    :model-value="value + 2"
    :color="color"
  >
    <v-row no-gutters justify="space-between">
      <v-col cols="4">-2</v-col>
      <v-col>
        <div class="text-black text-center">
          {{ label }}: {{ displayValue }}
        </div>
      </v-col>
      <v-col class="text-right">+2</v-col>
    </v-row>
  </v-progress-linear>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const props = defineProps({
  value: { type: Number, required: true },
  label: { type: String, required: true },
});

const displayValue =
  (props.value > 0 ? "+" : "") + String(props.value.toFixed(2));
const value = props.value;

let color = "rgb(0, 0, 0)";
if (value < -0.67) {
  color = "rgb(255, 153, 0)";
} else if (value < 0.66) {
  color = "rgb(255, 204, 0)";
} else {
  color = "rgb(0, 255, 0)";
}
</script>
