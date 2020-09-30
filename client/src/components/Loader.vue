<template>
  <div class="progress" v-if="showLoader">
    <div class="indeterminate"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    showLoader: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
  .progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #f1f2f6;
  }
  .progress .indeterminate {
    background-color: #1e90ff;
  }
</style>