<script setup lang="ts">
import { ref, watch, computed, toValue } from 'vue'
import NotesSkeleton from '@/components/NotesSkeleton.vue'
import NotesCard from '@/components/NotesCard.vue'
import {type NoteResponse, type Notes} from '@/types'
import { HTTP } from '@/api'

const notesList = ref<Notes[]>([])
const error = ref(null)
const fetchNotes = (): void => {
  HTTP.get<Notes[]>('/quotes/random?limit=10')
    .then((res) => {
      notesList.value = res.data
    })
    .catch((err) => {
      error.value = err
    })
}

const searchByAuthor = (author: string): void => {
  HTTP.get<NoteResponse>(`/quotes?author=${author}`)
    .then((res) => {
      notesList.value = res.data.results
    })
    .catch((err) => {
      error.value = err
    })
}

fetchNotes()
</script>

<template>
  <div class="notes-list">
    <button class="notes-list__update" @click="fetchNotes">Обновить заметки</button>

    <div v-if="notesList.length" class="notes-list__item">
      <NotesCard
        :notesList="notesList"
        :isFavorite="true"
        @search-by-author="searchByAuthor($event)"
      />
    </div>
    <div v-else class="notes-list__item">
      <NotesSkeleton v-for="i in 10" :key="i" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.notes-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__update {
    max-width: 200px;
    border: none;
    background-color: #afc1cb;
    padding: 0.5rem;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
