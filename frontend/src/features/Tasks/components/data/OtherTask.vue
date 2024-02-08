<script setup lang="ts">
import type { OtherData } from "polymorphic-tasks-backend";
import { ref } from "vue";
import EditOtherTask from "./EditOtherTask.vue";

defineProps<{ id: string; other: OtherData }>();

const showForm = ref<boolean>(false);
</script>

<template>
  <p>This is another kind of task. It has a comment: "{{ other.comment }}"</p>
  <q-btn icon="edit" @click="showForm = true">Edit</q-btn>
  <edit-other-task :id="id" v-if="showForm" @close="showForm = false" />
</template>
