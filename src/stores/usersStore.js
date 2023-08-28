import { defineStore } from 'pinia'
import * as getUsers from '../api/getUsers'
import { usePostsStore } from './postsStore'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    usersList: null
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await getUsers.fetchUsers()
        this.usersList = response.data
      } catch (error) {
        throw new Error(error)
      }
    },
    filteredUsers(search) {
      const postsStore = usePostsStore()
      const filteredUsers = this.usersList.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
      const filteredUsersId = filteredUsers.map((userId) => userId.id)
      postsStore.handleSearchQuery(search)
      postsStore.fetchFilteredPosts(filteredUsersId)
    }
  }
})
