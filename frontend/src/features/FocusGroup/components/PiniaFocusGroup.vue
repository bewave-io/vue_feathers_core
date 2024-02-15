<script setup lang="ts" generic="T extends object">
import FocusGroup from '@f/FocusGroup/components/FocusGroup.vue';
import { ref } from 'vue';
import { PiniaInstance } from '@/feathers-client';
import { sleep } from '@f/Global/helper';

enum State {
  pending = 'pending',
  success = 'success',
  error = 'error',
}

defineProps<{ model: PiniaInstance<T> }>();

const state = ref<State | null>();
const handleSave = async (clone: PiniaInstance<T>) => {
  console.log('Save called', clone);
  state.value = State.pending;
  // clone.value.foo = "bar"
  try {
    await clone.value.save();
    await sleep(1000);
    state.value = State.success;
    await sleep(1000);
    state.value = null;
  } catch (e) {
    state.value = State.error;
    console.error(e);
  }
};
</script>

<template>
  <FocusGroup :data="model" @save="handleSave">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
    <template #overlay>
      <q-inner-loading
        :showing="state === State.pending"
        size="1em"
        label="Please wait..."
        label-class="text-blue"
        label-style="font-size: 1.1em"
      />
      <div
        v-if="state === State.success"
        class="full-width full-height absolute-top-left flex flex-center"
        style="
          background-color: rgba(0, 255, 0, 0.6);
          backdrop-filter: blur(1px);
        "
        @click.prevent.stop="state = null"
      >
        <div class="text-white text-bold">Success</div>
      </div>
      <div
        v-if="state === State.error"
        class="full-width full-height absolute-top-left flex flex-center"
        style="
          background-color: rgba(255, 0, 0, 0.6);
          backdrop-filter: blur(1px);
        "
        @click.prevent.stop="state = null"
      >
        <div class="text-white text-bold">Error saving</div>
      </div>
    </template>
  </FocusGroup>
</template>
