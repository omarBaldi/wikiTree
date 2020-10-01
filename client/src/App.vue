<template>
  <div id="main">

    <Menu 
      @emitEventLoading="changeLoaderState" 
      @emitEventBuildGraph="buildGraph"
      @emitEventDestroyDOM="destroyDOM"
    />

    <Loader 
      :showLoader="showLoader" 
    />

    <Chart 
      :chartData="ChartData"
      :destroy="destroy"
      @changeDestroyValue="destroyDOM"
    />
    
  </div>
</template>

<script>
import Menu from './components/Menu'
import Loader from './components/Loader'
import Chart from './components/Chart'

export default {
  name: 'App',
  components: {
    Menu,
    Loader,
    Chart
  },
  data() {
    return {
      showLoader: false,
      destroy: false,
      ChartData: null
    }
  },
  methods: {
    changeLoaderState() {
      this.showLoader = !this.showLoader;
    },
    buildGraph(data) {
      this.ChartData = data;
    },
    destroyDOM() {
      this.destroy = !this.destroy;
    }
  }
}
</script>
