<script setup lang="ts" generic="T extends object">
import FocusGroup from '@f/FocusGroup/components/FocusGroup.vue';
import { Ref, ref } from 'vue';
import { PiniaInstance } from '@/feathers-client';
import { sleep } from '@f/Global/helper';

enum State {
  pending = 'pending',
  success = 'success',
  error = 'error',
}

defineProps<{ model: PiniaInstance<T> }>();

const state = ref<State | null>();
const handleSave = async (clone: Ref<PiniaInstance<T>>): void => {
  state.value = State.pending;
  try {
    await clone.value.save();
    await sleep(1000);
    state.value = State.success;
    await sleep(1000);
    state.value = null;
  } catch (e) {
    state.value = State.error;
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
        class="full-width full-height absolute-top-left flex flex-center message-overlay message-overlay-success"
        @click.prevent.stop="state = null"
      >
        <div class="text-white text-bold">Success</div>
      </div>
      <div
        v-if="state === State.error"
        class="full-width full-height absolute-top-left flex flex-center message-overlay message-overlay-error"
        @click.prevent.stop="state = null"
      >
        <div class="text-white text-bold">Error saving</div>
      </div>
    </template>
  </FocusGroup>
</template>

<style lang="scss" scoped>
.message-overlay {
  backdrop-filter: blur(1px);

  &-success {
    background-color: rgba(0, 255, 0, 0.6);
  }
  &-error {
    background-color: rgba(255, 0, 0, 0.6);
  }
}
</style>
