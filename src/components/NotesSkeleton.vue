<script setup lang="ts"></script>

<template>
  <div class="notes-skeleton"></div>
</template>

<style scoped lang="scss">
.notes-skeleton {
  width: 100%;
  background-color: #b8c6db;
  background: linear-gradient(315deg, #c6cdd9 0%, #e6e9ec 74%);
  animation: colored 2s infinite alternate;
  padding: 3rem;
  border-radius: 10px;
}
</style>
