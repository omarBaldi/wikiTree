<template>
  <nav>
    <div class="nav-wrapper">
      <form @submit="startScraping">
        <div class="input-field">
          <input id="search" type="search" v-model="wordToSearch">
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons" @click="wordToSearch = null">close</i>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Menu',
  data() {
    return {
      wordToSearch: null
    }
  },
  created() {
    console.log(`Working in the ${process.env.NODE_ENV} environment`)
  },
  methods: {
    async startScraping(e) {

      e.preventDefault();

      this.$emit('emitEventDestroyDOM');
      this.$emit('emitEventLoading');

      try {
        const response = await axios.get('/api/links', { params: { word: this.wordToSearch } });
        const { linkDataArray, nodeDataArray } = response.data;
        this.$emit('emitEventBuildGraph', { linkDataArray, nodeDataArray });
        this.$emit('emitEventLoading');

      } catch(err) {
        console.log(`Could not retrieve the wikipedia links - error: ${err}`);
      }
    },
  }
}
</script>

<style scoped>
  nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 70px;
    background-color: #1e90ff;
  }
  .nav-wrapper .input-field input[type=search] {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-left: -55px;
    width: 100vw;
  }
  .material-icons {
    margin-top: 5px;
  }
</style>