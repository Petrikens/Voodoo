<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText v-model="postSearch" placeholder="Filter by author..." />
  </span>
</template>

<script>
import { mapActions } from 'pinia'
import { useUsersStore } from '../stores/usersStore'
export default {
  name: 'PostsFilter',
  props: {
    posts: {
      type: Array
    }
  },

  data() {
    return {
      postSearch: '',
      debouncedSearch: null
    }
  },

  methods: {
    ...mapActions(useUsersStore, ['filteredUsers'])
  },

  watch: {
    postSearch() {
      if (this.debouncedSearch) {
        clearTimeout(this.debouncedSearch)
      }
      this.debouncedSearch = setTimeout(() => {
        this.filteredUsers(this.postSearch)
      }, 1000)
    }
  },

  beforeDestroy() {
    if (this.debouncedSearch) {
      clearTimeout(this.debouncedSearch)
    }
  }
}
</script>

<style lang="scss" scoped></style>
