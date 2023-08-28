<template>
  <Card style="width: 20rem">
    <template #title> {{ post.title }} </template>
    <template #content>
      <p>
        {{ post.body }}
      </p>
    </template>
    <template #footer v-if="users.length">
      {{ handlePostAuthor }}
    </template>
    <template #footer v-else> Author not found </template>
  </Card>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object
    },
    users: {
      type: Array
    }
  },
  computed: {
    handlePostAuthor() {
      return this.users.find((user) => user.id === this.post.userId).name
    }
  }
}
</script>

<style lang="scss" scoped></style>
