<script setup lang="ts">
import { useFeathersService } from "@/feathers-client";
import { toRefs } from "vue";

const props = defineProps<{ id: string }>();
const emit = defineEmits(["close"]);
const Task = useFeathersService("tasks");
const { data: task, isPending } = toRefs(Task.useGet(props.id));

const onSave = () => {
  task.value?.save();
  emit("close");
};
</script>

<template>
  <div class="flex flex-center q-mt-lg">
    <q-spinner-dots v-if="isPending" />
    <q-card v-else style="max-width: 300px">
      <q-form @submit="onSave" v-if="task">
        <q-card-section>
          <h3 class="text-h6">Editing live from store.</h3>
          <q-input v-model="task.data.comment" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat @click="emit('close')">Close</q-btn>
          <q-btn flat color="primary" type="submit">Save</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
