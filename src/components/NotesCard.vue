<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue'
import type { PropType } from 'vue'
import IconLikeActive from '@/components/icons/IconLikeActive.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { type Notes, type NotesAction } from '@/types'

const props = defineProps({
  notesList: {
    type: Array as PropType<Notes[] | []>,
    default: () => [] as Notes[],
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['search-by-author', 'delete-note-from-favorite'])

let localFavorites = ref<string>(localStorage.getItem('favorite-list') || '[]')
let favorites = ref<Notes[]>(JSON.parse(localFavorites.value))

const getSavedFavorite = (id: string) => {
  return favorites.value.some((item) => item._id === id)
}

const handleFavoriteList = (item: Notes, action: NotesAction) => {
  const index = favorites.value.length
    ? favorites.value.findIndex((fav) => fav._id === item._id)
    : -1
  if (index === -1) {
    favorites.value.push(item)
  } else if (index !== -1 || action === 'delete') {
    favorites.value.splice(index, 1)
    emit('delete-note-from-favorite', favorites.value)
  }
}

watch(favorites.value, (newValue) => {
  localStorage.setItem('favorite-list', JSON.stringify(newValue))
})
</script>

<template>
  <div class="notes-card" v-for="item in notesList" :key="item._id">
    <div class="notes-card__header header">
      <div class="header__block">
        <button
          type="button"
          class="header-btn"
          @click="handleFavoriteList(item, 'add')"
          v-if="isFavorite"
        >
          <IconLikeActive v-if="getSavedFavorite(item._id)" />
          <IconLike v-else />
        </button>
        <button type="button" class="header-btn" @click="handleFavoriteList(item, 'delete')" v-else>
          <IconDelete />
        </button>
        <p class="header__author" @click="$emit('search-by-author', item.authorSlug)">
          {{ item.author }}
        </p>
      </div>
      <small class="header__date">{{ item.dateAdded }}</small>
    </div>
    <div class="notes-card__body">
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notes-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ccc;

  .header {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;

    @media screen and (min-width: 420px) {
      flex-direction: row;
      align-items: center;
    }

    &__block {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
      padding: 0.3rem;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background-color: #b8c6db;
      }
    }
    &__author {
      display: flex;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 600;
      gap: 0.5rem;
      flex-direction: column;
      &:hover {
        color: #ff7979;
      }
    }
  }

  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }
}
</style>
