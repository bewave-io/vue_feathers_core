<script setup lang="ts">
import { reactive, ref } from 'vue';
import FocusGroup from './FocusGroup.vue';
import { sleep } from '@f/Global/helper';

// Test Focus Group 1
const myModel = reactive({
  firstName: 'Jesse',
  lastName: 'Sopel',
  nickname: 'Hello',
});
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
const handleSaveDog = async (clone: typeof dogModel) => {
  console.log('Save called', clone);
  isDogPending.value = true;
  await sleep();
  isDogPending.value = false;
};
</script>

<template>
  <q-page padding class="flex flex-center text-center">
    <div class="col">
      <h1 class="text-h4">Test focus groups</h1>
      <focus-group :data="myModel" class="col" @save="handleSave" :is-pending="isPending">
        <template #display="{ data }">
          <template>
            {{ data.nickname }} {{ data.firstName }} {{ data.lastName }}
          </template>
        </template>
        <template #edit="{ data }">
          <div class="row q-col-gutter-md flex">
            <q-input v-model="data.firstName" class="col-4" autofocus/>
            <q-input v-model="data.lastName" class="col-4" />
            <q-input v-model="data.nickname" class="col-4 order-first"/>
          </div>
        </template>
      </focus-group>
      <q-input v-model="anotherTest" label="Another field" />
      <focus-group :data="dogModel" class="col" @save="handleSaveDog" :is-pending="isDogPending">
        <template #display="{ data }">
          {{ data.nickname }} {{ data.firstName }} {{ data.lastName }}
        </template>
        <template #edit="{ data }">
          <div class="row q-col-gutter-md flex">
            <q-input v-model="data.firstName" class="col-4" autofocus/>
            <q-input v-model="data.lastName" class="col-4" />
            <q-input v-model="data.nickname" class="col-4 order-first"/>
          </div>
        </template>
      </focus-group>
    </div>
  </q-page>
</template>
