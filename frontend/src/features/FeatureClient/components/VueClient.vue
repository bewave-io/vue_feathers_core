<script setup lang="ts">
import { reactive } from "vue";

const foo = reactive({
  abc: {
    name: "foo",
  },
  def: {
    name: "bar",
  },
});
</script>

<template>
  <q-page
    padding
    class="flex flex-center text-center"
  >
    <div class="q-pa-md example-row-column-width">
      <div class="row q-col-gutter-md">
        <div
          v-for="(user, key) in foo"
          :key="key"
          class="col"
        >
          <q-card>
            <q-card-section> {{ user.name }}</q-card-section>
            <q-card-actions>
              <q-btn> Action </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
