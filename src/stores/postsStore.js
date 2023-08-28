import { defineStore } from 'pinia'
import * as getPosts from '../api/getPosts'
import { handleError } from 'vue'

export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    postsList: [],
    isLoading: false,
    limit: 9,
    page: 1,
    totalPages: 0,
    userIds: [],
    searchQuery: ''
  }),

  actions: {
    async fetchPosts() {
      try {
        const data = {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        }

        const response = await getPosts.fetchPosts(data)

        this.postsList = response.data

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (error) {
        throw new Error(error)
      }
    },

    async fetchFilteredPosts(userIds) {
      this.page = 1
      this.userIds = userIds
      try {
        if (this.searchQuery && !this.userIds.length) {
          this.postsList = []
        }
        if (this.userIds.length) {
          const data = {
            params: {
              _limit: this.limit,
              _page: this.page,
              userId: this.userIds
            }
          }

          const response = await getPosts.fetchFilteredPosts(data)

          this.postsList = response.data

          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async loadMorePosts() {
      if (this.page < this.totalPages) {
        try {
          if (this.searchQuery && !this.userIds.length) {
            return
          }
          if (this.userIds.length) {
            this.page += 1

            const data = {
              params: {
                _limit: this.limit,
                _page: this.page,
                userId: this.userIds
              }
            }

            const response = await getPosts.fetchPosts(data)

            this.postsList = [...this.postsList, ...response.data]
          }
        } catch (error) {
          throw new Error(error)
        }
      }
    },

    handleSearchQuery(search) {
      this.searchQuery = search
    }
  }
})
