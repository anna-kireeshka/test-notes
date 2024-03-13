<script setup lang="ts">
import { ref, watch } from 'vue'
import NotesCard from '@/components/NotesCard.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { type Notes } from '@/types'

let localFavorites = ref<string>(localStorage.getItem('favorite-list') || '[]')
let favorites = ref<Notes[]>(JSON.parse(localFavorites.value))

const deleteAllFromFavoriteList = () => {
  localStorage.removeItem('favorite-list')
  favorites.value = []
}

</script>

<template>
  <div class="favorites">
    <div class="favorites-body">
      <div class="favorites-header">
        <p class="favorites-header__title">Избранное</p>
        <button
          type="button"
          @click="$emit('close-favorites', false)"
          class="favorites__action favorites__action--close"
        >
          <IconDelete />
        </button>
      </div>

      <div class="favorites-list" v-if="favorites.length">
        <button type="button" class="favorites__action" @click="deleteAllFromFavoriteList">
          Очистить избранное
        </button>
        <div class="favorites-list__item">
          <NotesCard :notesList="favorites" :isFavorite="false" @delete-note-from-favorite="favorites = $event" />
        </div>
      </div>
      <div v-else class="favorites-error">
        <p class="favorites-error__content">Вы ещё ничего не добавили в избранное :(</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.favorites {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;

  &-body {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: auto;
    max-height: 70%;
    background-color: #fff;
    transform: translate(6%, 10%);
    overflow: scroll;
    border-radius: 1rem;
    @media screen and (min-width: 768px) {
      width: 50%;
      gap: 2rem;
      transform: translate(50%, 10%);
    }
  }
  &-header {
    position: sticky;
    top: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 1rem;

    &__title {
      font-size: 1.1rem;
      font-weight: 600;
      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
      }
    }
  }
  &-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;

    &__item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  &__action {
    border: none;
    background-color: #b8c6db;
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 0.3rem;

    &:hover {
      background-color: #b8c6db;
    }

    &--close {
      background-color: transparent;
      border-radius: 50%;
    }
  }
  &-error {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    &__content {
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;

      @media screen and (min-width: 768px) {
        font-size: 2rem;
      }
    }
  }
}
</style>
