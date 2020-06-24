<template>
  <a-modal
    title="流程数据信息"
    :visible.sync="dialogVisible"
    width="70%"
    style="max-height:500px,overflow:auto;"
  >
    {{ flowJsonData }}
    <template slot="footer">
      <a-button key="back" @click="dialogVisible = false">
        Close
      </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      dialogVisible: false,
      flowJsonData: {},
      options: {
        mode: { name: "javascript", json: true },
        lineNumbers: true
      }
    };
  },
  methods: {
    init() {
      this.dialogVisible = true;
      this.flowJsonData = JSON.stringify(this.data, null, 4).toString();
    }
  }
};
</script>
