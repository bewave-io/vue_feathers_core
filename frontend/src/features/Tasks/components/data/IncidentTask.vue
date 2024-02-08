<script setup lang="ts">
import type { IncidentData } from "polymorphic-tasks-backend";

defineProps<{ id: string; incident: IncidentData }>();
</script>

<template>
  <p>There was an incident on: {{ incident.incidentDate }}</p>
</template>
