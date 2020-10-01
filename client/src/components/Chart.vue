<template>
  <div id="wikipediaChart"></div> 
</template>

<script>
import go from 'gojs'

export default {
  name: 'Chart',
  props: {
    chartData: {
      type: Object
    },
    destroy: {
      type: Boolean
    }
  },
  watch: {
    chartData() {
      this.createGraphContainer();
      this.createGraph();
      this.$emit('changeDestroyValue');
    },
    destroy(value) {
      if (value) this.destroyGraphContainer();
    }
  },
  methods: {
    destroyGraphContainer() {
      const chart = document.getElementById('wikipediaChart');
      chart.remove();
    },
    createGraphContainer() {
      const main = document.getElementById('main');
      const newChart = document.createElement('div');
      newChart.setAttribute('id', 'wikipediaChart');
      main.appendChild(newChart);
    },
    createGraph() {

      function DemoForceDirectedLayout() {
        go.ForceDirectedLayout.call(this);
      }
      go.Diagram.inherit(DemoForceDirectedLayout, go.ForceDirectedLayout);

      DemoForceDirectedLayout.prototype.makeNetwork = function(coll) {
        let net = go.ForceDirectedLayout.prototype.makeNetwork.call(this, coll);
        net.vertexes.each(function(vertex) {
          const node = vertex.node;
          if (node !== null) vertex.isFixed = node.isSelected;
        });
        return net;
      };

      /* ------------------------------------------------------------ */

      const $ = go.GraphObject.make;

      const myDiagram =
        $(go.Diagram, "wikipediaChart",
          {
            initialAutoScale: go.Diagram.Uniform,
            contentAlignment: go.Spot.Center,
            layout: new DemoForceDirectedLayout(),
            "draggingTool.dragsTree": true,
          }
        );

      //Define Node template
      myDiagram.nodeTemplate =
        $(go.Node, "Spot", 
          { locationSpot: go.Spot.Center }, new go.Binding("text", "text"),
          $(go.Shape, "Ellipse", { fill: "lightgray", stroke: null, desiredSize: new go.Size(30, 30)}, new go.Binding("fill", "fill")),
          $(go.TextBlock, new go.Binding("text", "text"))
        );

      //Define Link template
      myDiagram.linkTemplate =
        $(go.Link,
          { selectable: false },
          $(go.Shape,{ strokeWidth: 3, stroke: "#333" })
        );

      myDiagram.model = new go.GraphLinksModel(
        this.chartData.nodeDataArray, 
        this.chartData.linkDataArray
      );

    }
  }
}
</script>

<style>
  #wikipediaChart {
    height: 100vh;
    width: 100vw;
  }
</style>