<script setup lang="ts" generic="T extends object">
import { computed, ref, VNode } from 'vue';
import { vClickOutside } from '@f/Global/directives/click-outside';
import { PiniaInstance, isPiniaInstance } from '@/feathers-client';

type ModelData = T | PiniaInstance<T>;

const emit = defineEmits(['save']);
const props = withDefaults(
  defineProps<{ data: ModelData; isPending?: boolean }>(),
  {
    isPending: false,
  },
);

defineSlots<{
  display: (props: { data: ModelData }) => VNode[];
  edit: (props: { data: ModelData }) => VNode[];
  buttons: () => VNode[];
  overlay: (props: { isPending: boolean }) => VNode[];
}>();

const editMode = ref<boolean>(false);
const formRef = ref<HTMLFormElement>();

const modelData = computed((): ModelData => props.data);
const clone = computed((): ModelData => {
  if (isPiniaInstance(props.data)) {
    return props.data.clone();
  }
  return { ...props.data };
});

const close = (): void => {
  editMode.value = false;
};

const onFocus = async (event: FocusEvent): Promise<void> => {
  if (!editMode.value && event.target) {
    editMode.value = true;
    (
      event.target?.querySelector('input,select,textarea') as HTMLInputElement
    )?.focus();
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
};

defineExpose({ close });
</script>

<template>
  <div
    tabindex="0"
    @focus="onFocus"
    v-click-outside="close"
    style="position: relative"
    :class="isPending ? 'pending' : ''"
  >
    <q-form
      v-if="editMode"
      @submit="onSubmit"
      @keydown="onKeyDownForm"
      ref="formRef"
    >
      <div class="row flex-center align-middle">
        <div class="col">
          <slot name="edit" :data="clone" />
        </div>
        <div class="col-auto q-gutter-sm">
          <slot name="buttons">
            <q-btn type="submit" flat olor="primary" icon="save" padding="0" />
            <q-btn
              @click="close"
              flat
              icon="cancel"
              @keydown="onKeyDownLastButton"
              padding="0"
            />
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
      <template v-if="data">
        <slot name="display" :data="modelData" />
      </template>
    </div>
  </div>
</template>
