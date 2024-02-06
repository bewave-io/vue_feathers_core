<script setup lang="ts">
import type { ServiceInstance } from 'feathers-pinia';
import type { User } from '{{ cookiecutter.project_slug }}-backend';

import { ref } from 'vue';
import { checkEmail, checkRequiredString } from '@f/Global/validation';

const props = defineProps<{ user: ServiceInstance<User> }>();
const emit = defineEmits(['submit']);

const editUser = ref<ServiceInstance<User>>(props.user.clone());
const password = ref<string | undefined>(undefined);
const confirmPassword = ref<string>('');
const isPasswordVisible = ref<boolean>(false);

const checkPasswordConfirmation = (val: string | null) =>
  !password.value || val === password.value || 'Passwords do not match';

const handleSubmit = () => {
  if (!editUser.value._id || password.value) {
    editUser.value.password = password.value;
  }
  emit('submit', editUser);
};
</script>

<template>
  <q-form @submit="handleSubmit" class="q-gutter-md q-pa-md" autocomplete="off">
    <h1 class="text-h4 text-center">Create an account</h1>
    <q-input
      v-model="editUser.firstName"
      label="First Name *"
      lazy-rules
      :rules="[checkRequiredString]"
    />
    <q-input
      v-model="editUser.lastName"
      label="Last Name *"
      lazy-rules
      :rules="[checkRequiredString]"
    />
    <q-input
      v-model="editUser.email"
      label="Email *"
      lazy-rules
      type="email"
      :rules="[checkRequiredString, checkEmail]"
    />
    <q-input
      v-model="password"
      :label="editUser._id ? 'Change Password' : 'Password *'"
      :type="isPasswordVisible ? 'text' : 'password'"
      autocomplete="new-password"
      lazy-rules
      :rules="editUser._id ? [] : [checkRequiredString]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="isPasswordVisible = !isPasswordVisible"
        />
      </template>
    </q-input>
    <q-input
      v-model="confirmPassword"
      label="Confirm Password *"
      :type="isPasswordVisible ? 'text' : 'password'"
      lazy-rules
      :rules="[checkPasswordConfirmation]"
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
