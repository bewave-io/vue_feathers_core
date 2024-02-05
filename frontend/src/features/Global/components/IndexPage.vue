<script setup lang="ts">
import bewaveLogoUrl from '@/assets/images/logos/bewave.svg';
import { useAuthStore } from '@f/Auth/store';

const auth = useAuthStore();
</script>

<template>
  <q-page padding class="flex flex-center row">
    <div class="q-pa-md flex flex-center">
      <div class="container text-center">
        <h1 class="text-h4">
          Welcome to the project template for
          <q-img :src="bewaveLogoUrl" height="2em" fit="contain" alt="Bewave" />
        </h1>
        <div class="row flex-center">
          <p v-if="auth.isAuthenticated">Welcome {{ auth.user.fullName }}</p>
          <p v-else>
            You are not logged in. You may do so here:
            <router-link :to="{ name: 'auth-login' }">Login</router-link>
            /
            <router-link :to="{ name: 'auth-signup' }">Signup</router-link>
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>
