<script setup lang="ts">
import type { Client as ClientType } from "project-template-backend";

import { ServiceInstance } from "feathers-pinia";
import { useQuasar } from "quasar";
import { Ref, ref } from "vue";

import { useFeathersService } from "@/feathers-client";

import ClientForm from "@f/Client/components/ClientForm.vue";

const $q = useQuasar();
const props = defineProps<{ client: ServiceInstance<ClientType> }>();
const Client = useFeathersService("clients");

const showDeletePrompt = ref<boolean>(false);
const showEditForm = ref<boolean>(false);

const deleteClient = async () => {
  try {
    await Client.remove(props.client._id as string);
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "check",
      message: `Client ${props.client.name} was deleted.`,
    });
  } catch (error) {
    $q.notify({
      color: "red-4",
      textColor: "white",
      icon: "error",
      message: "Unable to delete the client",
    });
  }
};

const updateClient = (clientRecord: Ref<ServiceInstance<ClientType>>) => {
  try {
    clientRecord.value.save();
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "check",
      message: `Client ${clientRecord.value.name} was updated.`,
    });
    showEditForm.value = false;
  } catch (error) {
    $q.notify({
      color: "red-4",
      textColor: "white",
      icon: "error",
      message: "Unable to update the client",
    });
  }
};
</script>

<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ client.name }}</div>
    </q-card-section>

    <q-separator class="q-mt-lg q-mb-md" />

    <q-card-actions align="right">
      <q-btn
        square
        color="primary"
        icon="edit"
        @click="showEditForm = true"
      />
      <q-btn
        square
        color="purple"
        icon="delete"
        @click="showDeletePrompt = true"
      />
    </q-card-actions>
  </q-card>
  <q-dialog v-model="showDeletePrompt">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          icon="person"
          color="primary"
          text-color="white"
        />
        <span class="q-ml-sm">Are you sure you want to delete "{{ client.name }}"?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          label="remove"
          color="red"
          @click="deleteClient"
        />
        <q-btn
          v-close-popup
          flat
          label="Cancel"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="showEditForm"
    persistent
  >
    <q-card>
      <client-form
        v-if="showEditForm"
        :client="client"
        @submit="updateClient"
      >
        <template #buttons>
          <div class="q-pa-md flex justify-end">
            <q-btn
              v-close-popup
              flat
              label="Close"
              color="primary"
            />
            <q-btn
              flat
              label="Save"
              type="submit"
              color="primary"
              icon-right="save"
            />
          </div>
        </template>
      </client-form>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
