<script setup lang="ts">
import type { User as UserType } from 'project-template-backend';

import { type Ref, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useFeathersService } from '@/feathers-client';
import { useAuthStore } from '@f/Auth/store';
import { ServiceInstance } from 'feathers-pinia';

import UserAvatar from '@f/Auth/components/UserAvatar.vue';
import UserForm from '@f/Auth/components/UserForm.vue';
import FocusGroup from '@f/FocusGroup/components/FocusGroup.vue';

const props = defineProps<{ user: ServiceInstance<UserType> }>();
const $q = useQuasar();
const auth = useAuthStore();
const User = useFeathersService('users');

const showDeletePrompt = ref<boolean>(false);
const isPending = ref<boolean>(false);
const showEditForm = ref<boolean>(false);

const deleteUser = async () => {
  if (props.user._id === auth.user._id) {
    return false;
  }
  try {
    await User.remove(props.user._id as string);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'check',
      message: `User ${props.user.firstName} was deleted.`,
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'Unable to delete the user',
    });
  }
};
const updateUser = async (userClone: Ref<ServiceInstance<UserType>>) => {
  try {
    isPending.value = true;
    await userClone.value.save();
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'check',
      message: `User ${userClone.value.firstName} was updated.`,
    });
    showEditForm.value = false;
  } catch (error) {
    console.error(error);
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'Unable to update the user',
    });
  }
  isPending.value = false;
};
</script>

<template>
  <q-item>
    <q-item-section avatar>
      <user-avatar :user="user" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="q-mt-sm">
        <focus-group :is-pending="isPending" :data="user" @save="updateUser">
          <template #display="{ data }">
            {{ data.firstName }} {{ data.lastName }}
          </template>
          <template #edit="{ data }">
            <div class="row q-col-gutter-md">
              <q-input v-model="data.firstName" class="col-6" autofocus />
              <q-input v-model="data.lastName" class="col-6" />
            </div>
          </template>
        </focus-group>
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ user.email }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div>
        <q-btn icon="edit" color="green" flat @click="showEditForm = true" />
        <q-btn
          icon="delete"
          color="red"
          flat
          @click="showDeletePrompt = true"
          :disabled="user._id === auth.user._id"
        />
      </div>
    </q-item-section>
  </q-item>
  <q-dialog v-model="showDeletePrompt">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >Are you sure you want to delete "{{ user.fullName }}"?</span
        >
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="remove"
          color="red"
          @click="deleteUser"
          v-close-popup
        />
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showEditForm" persistent>
    <q-card>
      <user-form :user="user" v-if="showEditForm" @submit="updateUser">
        <template #buttons>
          <q-btn v-close-popup class="col-12 col-sm-4 q-ma-sm">Cancel</q-btn>
          <q-btn
            label="Save"
            type="submit"
            color="primary"
            class="col-12 col-sm-4 q-ma-sm"
          />
        </template>
      </user-form>
    </q-card>
  </q-dialog>
</template>
