<script setup lang="ts">
import type { AnyData, ServiceInstance } from "feathers-pinia";
import type { Client } from "project-template-backend";

import { ref } from "vue";

import { checkEmail, checkRequiredString } from "@f/Global/validation";

const props = defineProps<{ client: AnyData }>();
const emit = defineEmits(["submit"]);

const formData = ref<ServiceInstance<Client>>(props.client.clone());

const rules = {
  name: [checkRequiredString],
  email: [checkRequiredString, checkEmail],
  // Add more rules for phone and address if needed
};

function saveClient() {
  emit("submit", formData);
}
</script>

<template>
  <q-form
    autocomplete="off"
    class="q-gutter-md q-pa-md"
    @submit.prevent="saveClient"
  >
    <h4 class="text-h4">Create or edit Client</h4>
    <q-input
      v-model="formData.name"
      label="Name *"
      lazy-rules
      :rules="rules.name"
    />

    <q-input
      v-model="formData.email"
      label="Email *"
      lazy-rules
      type="email"
      :rules="rules.email"
    />

    <!-- Additional inputs for phone and address -->
    <q-input
      v-model="formData.phone"
      label="Phone"
    />

    <q-input
      v-model="formData.address"
      label="Address"
    />

    <slot />
    <div class="row flex-center q-col-gutter-sm">
      <slot name="buttons">
        <q-btn
          label="Save"
          type="submit"
          color="primary"
          class="col-12 col-sm-4 q-ma-sm"
        />
      </slot>
    </div>
  </q-form>
</template>

<style scoped></style>
