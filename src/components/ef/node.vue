<template>
  <div
    class="ef-node"
    ref="node"
    :style="nodeContainerStyle"
    @click="clickNode"
    @mouseup="changeNodeSite"
    :class="nodeContainerClass"
  >
    <!-- 最左侧的那条竖线 -->
    <div class="ef-node-left flow-node-drag">

    <div class="ef-node-left"></div>

      <!-- 节点类型的图标 -->
    <div class="ef-node-left-ico flow-node-drag">
        <i :class="nodeIcoClass"><a-icon type="link"/></i>
    </div>
    </div>
    <!-- 节点名称 -->
    <div>
      <div class="ef-node-text" :show-overflow-tooltip="true">
        {{ node.title ? node.title : node.type }}
      </div>
      <div class="ef-node-text" :show-overflow-tooltip="true">
        {{ node.description ? node.description :node.name}}
      </div>
    </div>
    
    <!-- 节点状态图标 -->
    <div class="ef-node-right-ico">
      <a-icon type="check" v-show="node.state === 'success'" />
      <a-icon type="close-circle" v-show="node.state === 'error'"/>
      <a-icon type="warning" v-show="node.state === 'warning'"/>
      <a-icon type="sync" spin v-show="node.state === 'running'" />
    </div>
    <div class="ef-node-delete-ico">
      <a-icon type="delete" @click="deleteElement" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object,
    activeElement: Object
  },
  data() {
    return {
    }
  },
  computed: {
    nodeContainerClass() {
      return {
        'ef-node-container': true,
        'ef-node-active': this.activeElement.type == 'node' ? this.activeElement.nodeId === this.node.id : false
      }
    },
    // 节点容器样式
    nodeContainerStyle() {
      return {
        top: this.node.top + 'px',
        left: this.node.left + 'px'
      }
    },
    nodeIcoClass() {
      var nodeIcoClass = {}
      nodeIcoClass[this.node.ico] = true
      // 添加该class可以推拽连线出来
      nodeIcoClass['flow-node-drag'] = true
      return nodeIcoClass
    }
  },
  methods: {
    // 点击节点
    clickNode() {
      this.$emit('clickNode', this.node.id)
    },
    deleteElement() {
      this.$emit('deleteElement',{
        nodeId: this.node.id,
        type: 'node',
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top,
      })
    },
    // 鼠标移动后抬起
    changeNodeSite() {
      // 避免抖动
      if (this.node.left == this.$refs.node.style.left && this.node.top == this.$refs.node.style.top) {
        return;
      }
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top,
      })
    }
  }
}
</script>
