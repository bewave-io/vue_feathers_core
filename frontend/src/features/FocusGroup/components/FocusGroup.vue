<script setup lang="ts" generic="T">
import { onMounted, ref, VNode } from 'vue';
import { vClickOutside } from '@f/Global/directives/click-outside';

const emit = defineEmits(['save']);
const props = defineProps<{ data: T, isPending: boolean}>();
defineSlots<{
  display: (props: { data: T }) => VNode[];
  edit: (props: { data: T }) => VNode[];
  buttons: () => VNode[];
  overlay: (props: { isPending: boolean }) => VNode[];
}>();

const editMode = ref<boolean>(false);
const formRef = ref<HTMLFormElement>();
const clone = ref<T>();

interface PiniaInstance {
  __isServiceInstance: true;
  clone: () => T;
}

const isPiniaInstance = (instance: T | PiniaInstance): instance is PiniaInstance => {
  return (instance as PiniaInstance)?.__isServiceInstance === true;
}


onMounted(() => {
  if (isPiniaInstance(props.data)) {
    clone.value = props.data.clone();
  } else {
    clone.value = {... props.data};
  }
});

const close = (): void => {
  editMode.value = false;
};

const onFocus = async (event: FocusEvent): Promise<void> => {
  if (!editMode.value && event.target) {
    editMode.value = true;
    event.target?.querySelector('input,select,textarea')?.focus();
  } else {
    event.preventDefault();
  }
};

const onSubmit = (): void => {
  emit('save', clone);
};

const onKeyDownLastButton = (event: KeyboardEvent): void => {
  if (!event.shiftKey && event.key === 'Tab') {
    close();
  }
};

const onKeyDownForm = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    close();
  }
}

defineExpose({ close });
</script>

<template>
  <div tabindex="0" @focus="onFocus" v-click-outside="close" style="position: relative;" :class="isPending ? 'pending' : ''">
    <q-form v-if="editMode" @submit="onSubmit" @keydown="onKeyDownForm" ref="formRef">
      <div class="row flex-center align-middle">
        <div class="col">
          <slot name="edit" :data="data" />
        </div>
        <div class="col-auto q-gutter-sm">
          <slot name="buttons">
            <q-btn type="submit" flat olor="primary" icon="save" padding="0" />
            <q-btn @click="close" flat icon="cancel" @keydown="onKeyDownLastButton" padding="0" />
          </slot>
        </div>
      </div>
      <slot name="overlay" :is-pending="isPending">
        <q-inner-loading
          :showing="isPending"
          size="1em"
          label="Please wait..."
          label-class="text-blue"
          label-style="font-size: 1.1em"
        />
      </slot>
    </q-form>
    <div @click="editMode = true" v-else>
      <slot name="display" :data="clone" tabindex="0" />
    </div>
  </div>
</template>
