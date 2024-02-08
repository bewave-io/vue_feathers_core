<script setup lang="ts">
import type { Task } from "polymorphic-tasks-backend";
import type { ModelInstance } from "feathers-pinia";
import { computed } from "vue";
import IncidentTask from "@f/Tasks/components/data/IncidentTask.vue";
import OtherTask from "@f/Tasks/components/data/OtherTask.vue";

const props = defineProps<{ task: ModelInstance<Task> }>();

const taskType = computed(
  (): "incident" | "other" | undefined => props.task?.data?.type,
);

const components = { incident: IncidentTask, other: OtherTask };
</script>

<template>
  <h2 class="text-h4">{{ task.name }}</h2>
  <p>This is a task of type "{{ taskType }}"</p>
  <component
    :is="components[taskType]"
    v-if="taskType"
    v-bind="{ [taskType]: task.data, id: task._id }"
  />
</template>
