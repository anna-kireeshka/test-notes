<script setup lang="ts">
import { ref } from 'vue'
import IconLikeActive from '@/components/icons/IconLikeActive.vue'
import Favorites from '@/components/Favorites.vue'

const isOpenFavorites = ref<boolean>(false)
</script>

<template>
  <header class="header">
    <div class="header__content">
      <h1>Notes</h1>
      <button
        type="button"
        class="header__favorite-btn"
        @click="isOpenFavorites = !isOpenFavorites"
      >
        <IconLikeActive />
      </button>
      <Favorites v-if="isOpenFavorites" @close-favorites="isOpenFavorites = $event" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &__content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    align-items: center;
    gap: 1rem;

    @media screen and (min-width: 768px) {
      width: 90%;
    }
    @media screen and (min-width: 1400px) {
      width: 1280px;
    }
  }
  &__favorite-btn {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 0.3rem;
    border-radius: 50%;
    cursor: pointer;

    @media screen and (min-width: 768px) {
      padding: 0.5rem;
    }

    svg {
      width: 2rem;
      height: 2rem;
      @media screen and (min-width: 768px) {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    &:hover {
      background-color: #ffe9e9;
    }
  }
}
</style>
