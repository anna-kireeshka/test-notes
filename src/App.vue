<script setup lang="ts">
import NotesList from '@/components/NotesList.vue'
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <main class="main">
    <NotesList />
  </main>
</template>

<style scoped lang="scss">
.main {
  width: 95%;
  margin: 0 auto;
  padding: 2rem 0;
  font-weight: normal;
  @media screen and (min-width: 768px) {
    width: 90%;
  }
  @media screen and (min-width: 1400px) {
    width: 1280px;
  }
}
</style>
