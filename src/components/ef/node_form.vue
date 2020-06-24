<template>
  <div class="ef-node-form">
    <div class="ef-node-form-header">属性</div>
    <div class="ef-node-form-body">
      <a-form :model="node" ref="dataForm" label-width="80px" v-show="type === 'node'">
        <a-form-item label="类型">
          <a-input v-model="node.type" :disabled="true"></a-input>
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-model="node.title"></a-input>
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-model="node.description"></a-input>
        </a-form-item>
        <a-form-item label="名称">
          <a-input v-model="node.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button icon="close">重置</a-button>
          <a-button type="primary" icon="check" @click="savechanges">保存</a-button>
        </a-form-item>
      </a-form>

      <a-form :model="line" ref="dataForm" label-width="80px" v-show="type === 'line'">
        <a-form-item label="条件">
          <a-input v-model="line.outcome"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button icon="el-icon-close">重置</a-button>
          <a-button type="primary" icon="el-icon-check" @click="saveLine">保存</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!--            <div class="el-node-form-tag"></div>-->
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      visible: true,
      // node 或 line
      type: "node",
      node: {},
      line: {},
      data: {}
    };
  },
  methods: {
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      this.type = "node";
      this.data = data;
      data.activities.filter(node => {
        if (node.id === id) {
          this.node = cloneDeep(node);
        }
      });
    },
    lineInit(line) {
      this.type = "line";
      this.line = line;
    },
    // 修改连线
    saveLine() {
      this.$emit(
        "setLineLabel",
        this.line.sourceActivityId,
        this.line.destinationActivityId,
        this.line.outcome
      );
    },
    savechanges() {
      this.data.activities.filter(node => {
        if (node.id === this.node.id) {
          console.log(this.node);

          node.description = this.node.description;
          node.title = this.node.title;
          node.name = this.node.name;
          node.left = this.node.left;
          node.top = this.node.top;

          this.$emit("repaintEverything");
        }
      });
    }
  }
};
</script>

<style>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}
</style>
