<template>
  <div class="ui container left aligned">
    <h1 class="ui header">
      <i class="icon language"></i>
      <div class="content">
        Vocabulary App
      </div>
    </h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  .container {
    margin-top: 30px;
  }
</style>
