<script setup lang="ts">
import { reactive, ref } from 'vue';
import FocusGroup from "./FocusGroup.vue";
import { sleep } from "@f/Global/helper";

// Test Focus Group 1
const myModel = reactive({
  firstName: 'Jesse',
  lastName: 'Sopel',
  nickname: 'Hello',
});
const errors = reactive({});
const isPending = ref(false);
const handleSave = (clone: typeof myModel) => {
  console.log('Save called', clone);
  isPending.value = true
  setTimeout(() => isPending.value = false, 1000);
};

// Test Focus group 2
const dogModel = reactive({
  firstName: 'Floof',
  lastName: 'Guimauve',
  nickname: 'Test',
});
const anotherTest = ref('');
const isDogPending = ref(false);
const dogErrors = reactive({firstName: ''});
const handleSaveDog = async (clone: typeof dogModel) => {
  console.log('Save called', clone);
  isDogPending.value = true;
  await sleep();
  dogErrors.firstName = 'First Name is invalid.';
  isDogPending.value = false;
};
</script>

<template>
  <q-page padding class="flex flex-center text-center">
    <div class="col">
      <h1 class="text-h4">Test focus groups</h1>
      <focus-group v-model="myModel" class="col" :errors="errors" @save="handleSave" :is-pending="isPending">
        <template #display="{ model }">
         {{ model.nickname }} {{ model.firstName }} {{ model.lastName }}
        </template>
        <template #edit="{ model }">
          <div class="row q-col-gutter-md flex">
            <q-input v-model="model.firstName" class="col-4" autofocus/>
            <q-input v-model="model.lastName" class="col-4" />
            <q-input v-model="model.nickname" class="col-4 order-first"/>
          </div>
        </template>
      </focus-group>
      <q-input v-model="anotherTest" label="Another field" />
      <focus-group v-model="dogModel" class="col" :errors="dogErrors" @save="handleSaveDog" :is-pending="isDogPending">
        <template #display="{ model }">
          {{ model.nickname }} {{ model.firstName }} {{ model.lastName }}
        </template>
        <template #edit="{ model }">
          <div class="row q-col-gutter-md flex">
            <q-input v-model="model.firstName" class="col-4" autofocus/>
            <q-input v-model="model.lastName" class="col-4" />
            <q-input v-model="model.nickname" class="col-4 order-first"/>
          </div>
        </template>
      </focus-group>
    </div>
  </q-page>
</template>
