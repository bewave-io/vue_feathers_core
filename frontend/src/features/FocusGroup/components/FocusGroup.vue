<script setup lang="ts" generic="T extends PiniaModel | object, E extends object">
import type { PiniaModel } from '@f/FocusGroup/types';
import { computed, onMounted, Ref, ref } from 'vue';
import { vClickOutside } from '@f/Global/directives/click-outside';

const model = defineModel<{modelValue: Ref<T>}>();
const emit = defineEmits(['save']);
const props = defineProps<{ errors: Ref<E>, isPending: boolean}>();

const editMode = ref(false);
const clone = ref<T>();
const hasErrors = computed(() => props.errors && Object.values(props.errors).some((v) => !!v));

onMounted(() => {
  if (model.value?.__isServiceInstance) {
    clone.value = model.value.clone();
  } else {
    clone.value = {... model.value};
  }
});

const close = () => {
  editMode.value = false;
};

const onSubmit = (): void => {
  emit('save', clone);
};

const overlayClass = computed(() => {
  if (props.isPending) {
    return 'pending';
  }
  return '';
});

const handleKeyUp = (event: KeyboardEvent) => {
  if (!event.shiftKey && event.key === 'Tab') {
    close();
  }
};
</script>

<template>
  <div tabindex="0" @focus="editMode = true" v-click-outside="close" style="position: relative;" :class="overlayClass">
    <q-form v-if="editMode" @submit="onSubmit">
      <div class="row">
        <div class="col">
          <slot name="edit" :model="model" />
        </div>
        <div class="col-auto q-gutter-sm">
          <slot name="buttons">
            <q-btn type="submit" flat olor="primary" icon="save" />
            <q-btn @click="close" flat icon="cancel" @keydown="handleKeyUp" />
          </slot>
        </div>
      </div>
      <ul v-if="hasErrors" class="errors">
        <li v-for="[field, error] in Object.entries(errors)" :key="`${field}-error`">
          {{ field }}: {{ error }}
        </li>
      </ul>
      <q-inner-loading
        :showing="isPending"
        size="1em"
        label="Please wait..."
        label-class="text-blue"
        label-style="font-size: 1.1em"
      />
    </q-form>
    <div @click="editMode = true" v-else>
      <slot name="display" :model="model" tabindex="0" />
    </div>
  </div>
</template>

<style lang="scss">
.error {
  border: 2px solid rgba(255, 0, 0, 0.83);
  .q-inner-loading {
    background: rgba(255, 0, 0, 0.6);
  }
}
.pending {
  border: 2px solid #6bfcfc;
  .q-inner-loading {
    background: rgba(107, 252, 252, 0.6);
  }
}
.success {
  border: 2px solid #82ff00;
  .q-inner-loading {
    background: rgba(130, 255, 0, 0.6);
  }
}

ul.errors {
  color: red;
}
</style>
