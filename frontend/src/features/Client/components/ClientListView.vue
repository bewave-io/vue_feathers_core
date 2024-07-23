<script setup lang="ts">
import { QBtn, QCard, QDialog, QSeparator } from "quasar";
import { ref } from "vue";

import ClientForm from "@f/Client/components/ClientForm.vue";
import ClientItem from "@f/Client/components/ClientItem.vue";

const showClientForm = ref(false);

function openClientForm() {
  showClientForm.value = true;
}

function closeClientForm() {
  showClientForm.value = false;
}
</script>

<template>
  <q-page>
    <div class="row">
      <h1 class="text-h3 col">Clients list</h1>
      <div class="flex justify-end">
        <q-btn
          icon-right="add"
          @click="openClientForm"
        >
          Create
        </q-btn>
      </div>
    </div>

    <div class="flex q-gutter-md">
      <client-item
        v-for="i in 10"
        :key="i"
      />
    </div>

    <div class="row">
      <h1 class="text-h3 col">Number of clients: 999</h1>
      <div class="flex justify-end">
        <q-btn
          icon-right="add"
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
          @close="closeClientForm"
          @submit="addClient"
        >
          <template #buttons>
            <div class="q-pa-md flex justify-end">
              <q-btn
                flat
                label="Close"
                color="primary"
                @click="closeClientForm"
              />
              <q-btn
                flat
                label="Save"
                color="primary"
                icon-right="save"
                @click="saveClient"
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
