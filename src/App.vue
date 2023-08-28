<template>
  <div class="container">
    <div class="filter__block">
      <PostsFilter :posts="postsList" />
    </div>
    <TransitionGroup
      appear
      name="post-list"
      tag="ul"
      class="posts__list"
      v-if="postsList.length && !isLoading"
    >
      <li class="posts__item" v-for="post in postsList" :key="post.userId + post.id">
        <PostCard :post="post" :users="usersList" />
      </li>
    </TransitionGroup>
    <div v-if="!postsList.length && !isLoading" style="display: flex; justify-content: center">
      No posts found
    </div>
    <div v-if="isLoading" class="card flex justify-content-center">
      <ProgressSpinner
        class="spinner"
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
  </div>
  <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script>
import PostsFilter from './components/PostsFilter.vue'
import PostCard from './components/PostCard.vue'
import { mapActions, mapState } from 'pinia'
import { usePostsStore } from './stores/postsStore'
import { useUsersStore } from './stores/usersStore'
export default {
  name: 'App',

  components: {
    PostsFilter,
    PostCard
  },

  data() {
    return {
      isLoading: false
    }
  },

  async mounted() {
    this.isLoading = true
    try {
      await this.fetchPosts()
      await this.fetchUsers()
    } catch (error) {
      console.log(error)
    } finally {
      this.isLoading = false
    }
  },

  computed: {
    ...mapState(usePostsStore, ['postsList']),
    ...mapState(useUsersStore, ['usersList'])
  },

  methods: {
    ...mapActions(usePostsStore, ['fetchPosts', 'loadMorePosts']),
    ...mapActions(useUsersStore, ['fetchUsers'])
  }
}
</script>

<style scoped lang="scss">
.filter {
  &__block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2rem;
  }
}
.posts {
  &__list {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }
  &__item {
    width: 20rem;
  }
}
.spinner {
  width: 50px;
  height: 50px;
  position: fixed;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 1s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
