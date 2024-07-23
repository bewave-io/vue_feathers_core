<script setup lang="ts">
import type { AnyData, ServiceInstance } from "feathers-pinia";
import type { Client as ClientType } from "project-template-backend";

import { computed, type Ref, ref } from "vue";

import { useFeathersService } from "@/feathers-client";
import { useClientStore } from "@f/Client/store";

import ClientForm from "@f/Client/components/ClientForm.vue";
import ClientItem from "@f/Client/components/ClientItem.vue";

const clientStore = useClientStore();

const Client = useFeathersService("clients");

const params = computed(() => ({ query: {} }));
const clients$ = Client.useFind(params, { paginateOn: "hybrid" });
const clients = computed((): AnyData => clients$.data);

const showClientForm = ref(false);
const newClient = ref(Client.new());

const addClient = (clientRecord: Ref<ServiceInstance<ClientType>>) => {
  clientRecord.value.save();
  closeClientForm();
  newClient.value = Client.new();
};

function openClientForm() {
  showClientForm.value = true;
}

function closeClientForm() {
  showClientForm.value = false;
}
</script>

<template>
  <q-page
    padding
    class="container q-mx-auto"
  >
    <div class="row">
      <h1 class="text-h3 col">Clients list</h1>
      <div class="flex flex-center">
        <q-btn
          icon-right="add"
          color="primary"
          @click="openClientForm"
        >
          Create
        </q-btn>
      </div>
    </div>

    <div class="flex q-gutter-md">
      <client-item
        v-for="client in clients"
        :key="client._id"
        :client="client"
      />
    </div>

    <div class="row q-mt-xl">
      <h1 class="text-h5 col">Number of clients: {{ clients?.length }}</h1>
      <div class="flex flex-center">
        <q-btn
          icon-right="add"
          color="primary"
          @click="openClientForm"
        >
          Create
        </q-btn>
      </div>
    </div>

    <q-dialog
      v-model="showClientForm"
      persistent
    >
      <q-card class="col col-xs-12 col-sm-6 col-md-4">
        <client-form
          :client="newClient"
          @submit="addClient"
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
  </q-page>
</template>

<style scoped>
.q-dialog .q-card {
  max-width: 100%;
}

.q-card {
  padding: 16px;
}

.q-pa-md {
  padding: 16px;
}

.q-separator {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
