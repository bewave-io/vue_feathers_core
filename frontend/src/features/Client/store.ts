import { acceptHMRUpdate, defineStore } from "pinia";
import { computed } from "vue-demi";

export const useClientStore = defineStore("client", () => {
  const clients = [];

  const clientCount = computed(() => {
    return clients.length;
  });

  return {
    clientCount,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot));
}
