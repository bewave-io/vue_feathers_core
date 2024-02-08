<script setup lang="ts">
import { useFeathersService } from "@/feathers-client";
import { computed } from "vue";
import TaskItem from "@f/Tasks/components/TaskItem.vue";

const Task = useFeathersService("tasks");
const params = computed(() => ({ query: {} }));
const tasks$ = Task.useFind(params, { paginateOn: "hybrid" });
const tasks = computed(() => tasks$.data);
</script>

<template>
  <q-page padding class="flex flex-center text-center">
    <p v-if="tasks$.isPending">Loading</p>
    <div v-else class="col">
      <task-item v-for="task in tasks" :key="task._id" :task="task" />
    </div>
  </q-page>
</template>
