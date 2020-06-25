<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0;height:'100%'">
      <a-row>
        <!--顶部工具菜单-->
        <a-col :span="24">
          <div class="ef-tooltar">
            <a-button type="primary" :underline="false">
              {{ data.name }}
            </a-button>
            <a-divider type="vertical"></a-divider>
            <a-button
              type="primary"
              icon="delete"
              @click="deleteElement"
              :disabled="!this.activeElement.type"
            ></a-button>
            <a-divider type="vertical"></a-divider>
            <a-button
              type="primary"
              icon="download"
              @click="downloadData"
            ></a-button>
            <!--  <a-divider type="vertical"></a-divider>-->
            <a-button
              type="text"
              icon="plus"
              size="large"
              @click="zoomAdd"
            ></a-button>
            <!--  <a-divider type="vertical"></a-divider>-->
            <a-button
              type="text"
              icon="minus"
              size="large"
              @click="zoomSub"
            ></a-button>
            <div style="float:right;margin-right:5px">
              <a-button icon="el-icon-document" @click="dataInfo"
                >流程信息</a-button
              >
              <a-button @click="dataReloadA" icon="el-icon-refresh"
                >流程A</a-button
              >
              <a-button @click="dataReloadB" icon="el-icon-refresh"
                >流程B</a-button
              >
              <a-button @click="dataReloadC" icon="el-icon-refresh"
                >流程C</a-button
              >
              <a-button @click="dataReloadD" icon="el-icon-refresh"
                >自定义样式</a-button
              >
              <a-button @click="dataReloadE" icon="el-icon-refresh"
                >流程E</a-button
              >
            </div>
          </div>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content
      :style="{
        background: '#c0c0c0',
        height: '100%'
      }"
    >
      <a-layout v-bind:style="MainBoxHeight" style="padding:0px">
        <a-layout-sider
          width="230"
          :style="{
            background: '#fff',
            overflow: 'auto'
          }"
        >
          <node-menu @addNode="addNode" ref="nodeMenu"></node-menu>
        </a-layout-sider>
        <a-layout-content
          :style="{
            margin: '0',
            padding: '0',
            background: '#fff',
            minHeight: '280px'
          }"
        >
          <a-layout>
            <a-layout-content
              :style="{
                margin: '0',
                padding: '0',
                background: '#fff',
                minHeight: '280px'
              }"
            >
              <div
                style="display:flex;height: calc(100%);"
                v-bind:style="MainHeight"
              >
                <div
                  id="efContainer"
                  ref="efContainer"
                  class="container"
                  v-flowDrag
                >
                  <template v-for="node in data.activities">
                    <flow-node
                      :id="node.id"
                      :key="node.id"
                      :node="node"
                      :activeElement="activeElement"
                      @changeNodeSite="changeNodeSite"
                      @nodeRightMenu="nodeRightMenu"
                      @clickNode="clickNode"
                    ></flow-node>
                  </template>
                  <!-- 给画布一个默认的宽度和高度 -->
                  <div style="position:absolute;top: 2000px;left: 2000px;">
                    &nbsp;
                  </div>
                </div>
              </div>
            </a-layout-content>
            <a-layout-sider
              :reverseArrow="true"
              width="280"
              :style="{
                background: '#fff'
              }"
            >
              <!-- 右侧表单 -->
              <flow-node-form
                ref="nodeForm"
                @setLineLabel="setLineLabel"
                @repaintEverything="repaintEverything"
              ></flow-node-form>

              <!-- 流程数据详情 -->
              <flow-info
                v-if="flowInfoVisible"
                ref="flowInfo"
                :data="data"
              ></flow-info>
            </a-layout-sider>
          </a-layout>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import debounce from "lodash.debounce";
import draggable from "vuedraggable";
// import { jsPlumb } from 'jsplumb'
// 使用修改后的jsplumb
//import "./jsplumb";
//import { JsPlumbUtils } from "./jsplumb-utils";
import { jsPlumb } from "jsplumb";

import { easyFlowMixin } from "@/components/ef/mixins";
import flowNode from "@/components/ef/node";
import nodeMenu from "@/components/ef/node_menu";
import FlowInfo from "@/components/ef/info";
import FlowNodeForm from "./node_form";
import lodash from "lodash";
import { getDataA } from "./data_A";
import { getDataB } from "./data_B";
import { getDataC } from "./data_C";
import { getDataD } from "./data_D";
import { getDataE } from "./data_E";

function getclientPoint() {
  return {
    width: document.documentElement.clientWidth || document.body.clientWidth,
    height: document.documentElement.clientHeight || document.body.clientHeight
  };
}

export default {
  data() {
    return {
      // jsPlumb 实例
      jsPlumb: null,
      // 控制画布销毁
      easyFlowVisible: true,
      // 控制流程数据显示与隐藏
      flowInfoVisible: false,
      // 是否加载完毕标志位
      loadEasyFlowFinish: false,
      // 数据
      data: {},
      // 激活的元素、可能是节点、可能是连线
      activeElement: {
        // 可选值 node 、line
        type: undefined,
        // 节点ID
        nodeId: undefined,
        // 连线ID
        sourceId: undefined,
        targetId: undefined
      },
      nWidth: 500,
      nHeight: 800,
      zoom: 0.5
    };
  },
  // 一些基础配置移动该文件中
  mixins: [easyFlowMixin],
  components: {
    draggable,
    flowNode,
    nodeMenu,
    FlowInfo,
    FlowNodeForm
  },
  directives: {
    flowDrag: {
      bind(el, binding, vnode, oldNode) {
        if (!binding) {
          return;
        }
        el.onmousedown = e => {
          if (e.button == 2) {
            // 右键不管
            return;
          }
          //  鼠标按下，计算当前原始距离可视区的高度
          let disX = e.clientX;
          let disY = e.clientY;
          el.style.cursor = "move";

          document.onmousemove = function(e) {
            // 移动时禁止默认事件
            e.preventDefault();
            const left = e.clientX - disX;
            disX = e.clientX;
            el.scrollLeft += -left;

            const top = e.clientY - disY;
            disY = e.clientY;
            el.scrollTop += -top;
          };

          document.onmouseup = function(e) {
            el.style.cursor = "auto";
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  computed: {
    MainHeight: function() {
      return {
        height: this.nHeight - 20 + "px"
      };
    },
    MainBoxHeight: function() {
      return {
        height: this.nHeight + "px"
      };
    }
  },

  mounted() {
    this.jsPlumb = jsPlumb.getInstance({
      PaintStyle: {
        strokeWidth: 6,
        stroke: "#567567",
        outlineStroke: "black",
        outlineWidth: 1
      },
      Connector: ["Bezier", { curviness: 30 }],
      Endpoint: ["Dot", { radius: 5 }],
      EndpointStyle: { fill: "#567567" },
      Anchor: [0.5, 0.5, 1, 1]
    });
    this.$nextTick(() => {
      // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
      this.dataReload(getDataB());
    });
    var __resizeHanlder = debounce(
      e => {
        //this.$bus.$emit("layout/SIZE_CHANGED", 1);
        that.fnResizeHanlder(e);
      },
      50,
      { leading: true }
    );
    window.addEventListener("resize", __resizeHanlder);
  },
  methods: {
    fnResizeHanlder(e) {
      let point = getclientPoint();
      console.log(e);

      this.nWidth = point.width;
      this.nHeight = point.height - 120;
      if (this.nWidth <= 920) {
        this.nWidth = 920;
      }
      if (e.target) {
        console.log("innerWidth=" + e.target.innerWidth);
        console.log("nWidth=" + this.nWidth);
      }
    },

    // 返回唯一标识
    getUUID() {
      return Math.random()
        .toString(36)
        .substr(3, 10);
    },
    jsPlumbInit() {
      this.jsPlumb.ready(() => {
        // 导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting);
        // 会使整个jsPlumb立即重绘。
        this.jsPlumb.setSuspendDrawing(false, true);
        // 初始化节点
        this.loadEasyFlow();
        // 单点击了连接线, https://www.cnblogs.com/ysx215/p/7615677.html
        this.jsPlumb.bind("click", (conn, originalEvent) => {
          this.activeElement.type = "line";
          this.activeElement.sourceId = conn.sourceId;
          this.activeElement.targetId = conn.targetId;
          this.$refs.nodeForm.lineInit({
            sourceActivityId: conn.sourceId,
            destinationActivityId: conn.targetId,
            outcome: conn.getLabel()
          });
        });
        // 连线
        this.jsPlumb.bind("connection", evt => {
          let sourceActivityId = evt.source.id;
          let destinationActivityId = evt.target.id;
          if (this.loadEasyFlowFinish) {
            this.data.connections.push({
              sourceActivityId: sourceActivityId,
              destinationActivityId: destinationActivityId
            });
          }
        });

        // 删除连线回调
        this.jsPlumb.bind("connectionDetached", evt => {
          this.deleteLine(evt.sourceId, evt.targetId);
        });

        // 改变线的连接节点
        this.jsPlumb.bind("connectionMoved", evt => {
          this.changeLine(evt.originalSourceId, evt.originalTargetId);
        });

        // 连线右击
        this.jsPlumb.bind("contextmenu", evt => {
          console.log("contextmenu", evt);
        });

        // 连线
        this.jsPlumb.bind("beforeDrop", evt => {
          let sourceActivityId = evt.sourceId;
          let destinationActivityId = evt.targetId;
          if (sourceActivityId === destinationActivityId) {
            this.$message.error("节点不支持连接自己");
            return false;
          }
          if (this.hasLine(sourceActivityId, destinationActivityId)) {
            this.$message.error("该关系已存在,不允许重复创建");
            return false;
          }
          if (this.hashOppositeLine(sourceActivityId, destinationActivityId)) {
            this.$message.error("不支持两个节点之间连线回环");
            return false;
          }
          this.$message.success("连接成功");
          return true;
        });

        // beforeDetach
        this.jsPlumb.bind("beforeDetach", evt => {
          console.log("beforeDetach", evt);
        });
        this.jsPlumb.setContainer(this.$refs.efContainer);
      });
    },
    // 加载流程图
    loadEasyFlow() {
      // 初始化节点
      for (var i = 0; i < this.data.activities.length; i++) {
        let node = this.data.activities[i];
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions);
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions);
        this.jsPlumb.draggable(node.id, {
          containment: "parent",
          stop: function(el) {}
        });
      }
      // 初始化连线
      for (var i = 0; i < this.data.connections.length; i++) {
        let line = this.data.connections[i];
        var connParam = {
          source: line.sourceActivityId,
          target: line.destinationActivityId,
          label: line.outcome ? line.outcome : "",
          connector: line.connector ? line.connector : "",
          anchors: line.anchors ? line.anchors : undefined,
          paintStyle: line.paintStyle ? line.paintStyle : undefined
        };
        this.jsPlumb.connect(connParam, this.jsplumbConnectOptions);
      }
      this.$nextTick(function() {
        this.loadEasyFlowFinish = true;
      });
    },
    setLineLabel(sourceActivityId, destinationActivityId, outcome) {
      var conn = this.jsPlumb.getConnections({
        source: sourceActivityId,
        target: destinationActivityId
      })[0];
      if (!outcome || outcome === "") {
        conn.removeClass("flowLabel");
        conn.addClass("emptyFlowLabel");
      } else {
        conn.addClass("flowLabel");
      }
      conn.setLabel({
        label: outcome
      });
      this.data.connections.forEach(function(line) {
        if (
          line.sourceActivityId == sourceActivityId &&
          line.destinationActivityId == destinationActivityId
        ) {
          line.outcome = outcome;
        }
      });
    },
    // 删除激活的元素
    deleteElement() {
      if (this.activeElement.type === "node") {
        this.deleteNode(this.activeElement.nodeId);
      } else if (this.activeElement.type === "line") {
        this.$confirm("确定删除所点击的线吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var conn = this.jsPlumb.getConnections({
              source: this.activeElement.sourceId,
              target: this.activeElement.targetId
            })[0];
            this.jsPlumb.deleteConnection(conn);
          })
          .catch(() => {});
      }
    },
    // 删除线
    deleteLine(sourceActivityId, destinationActivityId) {
      this.data.connections = this.data.connections.filter(function(line) {
        if (
          line.sourceActivityId == sourceActivityId &&
          line.destinationActivityId == destinationActivityId
        ) {
          return false;
        }
        return true;
      });
    },
    // 改变连线
    changeLine(oldsourceActivityId, oldTo) {
      this.deleteLine(oldsourceActivityId, oldTo);
    },
    // 改变节点的位置
    changeNodeSite(data) {
      for (var i = 0; i < this.data.activities.length; i++) {
        let node = this.data.activities[i];
        if (node.id === data.nodeId) {
          node.left = data.left;
          node.top = data.top;
        }
      }
    },
    /**
     * 拖拽结束后添加新的节点
     * @param evt
     * @param nodeMenu 被添加的节点对象
     * @param mousePosition 鼠标拖拽结束的坐标
     */
    addNode(evt, nodeMenu, mousePosition) {
      console.log(nodeMenu);

      var screenX = evt.originalEvent.clientX,
        screenY = evt.originalEvent.clientY;
      let efContainer = this.$refs.efContainer;
      var containerRect = efContainer.getBoundingClientRect();
      var left = screenX,
        top = screenY;
      // 计算是否拖入到容器中
      if (
        left < containerRect.x ||
        left > containerRect.width + containerRect.x ||
        top < containerRect.y ||
        containerRect.y > containerRect.y + containerRect.height
      ) {
        this.$message.error("请把节点拖入到画布中");
        return;
      }
      left = left - containerRect.x + efContainer.scrollLeft;
      top = top - containerRect.y + efContainer.scrollTop;
      // 居中
      left -= 85;
      top -= 16;
      var nodeId = this.getUUID();

      var node = {
        id: nodeId,
        name: nodeMenu.name,
        description: nodeMenu.description,
        type: nodeMenu.type,
        left: left,
        top: top,
        ico: nodeMenu.ico,
        state: "success"
      };
      /**
       * 这里可以进行业务判断、是否能够添加该节点
       */
      this.data.activities.push(node);
      this.$nextTick(function() {
        this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions);
        this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions);
        this.jsPlumb.draggable(nodeId, {
          containment: "parent"
        });
      });
    },
    /**
     * 删除节点
     * @param nodeId 被删除节点的ID
     */
    deleteNode(nodeId) {
      this.$confirm("确定要删除节点" + nodeId + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          /**
           * 这里需要进行业务判断，是否可以删除
           */
          this.data.activities = this.data.activities.filter(function(node) {
            if (node.id === nodeId) {
              // 伪删除，将节点隐藏，否则会导致位置错位
              // node.show = false
              return false;
            }
            return true;
          });
          this.$nextTick(function() {
            this.jsPlumb.removeAllEndpoints(nodeId);
          });
        })
        .catch(() => {});
      return true;
    },
    clickNode(nodeId) {
      this.activeElement.type = "node";
      this.activeElement.nodeId = nodeId;
      this.$refs.nodeForm.nodeInit(this.data, nodeId);
    },
    // 是否具有该线
    hasLine(sourceActivityId, destinationActivityId) {
      for (var i = 0; i < this.data.connections.length; i++) {
        var line = this.data.connections[i];
        if (
          line.sourceActivityId === sourceActivityId &&
          line.destinationActivityId === destinationActivityId
        ) {
          return true;
        }
      }
      return false;
    },
    // 是否含有相反的线
    hashOppositeLine(sourceActivityId, destinationActivityId) {
      return this.hasLine(destinationActivityId, sourceActivityId);
    },
    nodeRightMenu(nodeId, evt) {
      this.menu.show = true;
      this.menu.curNodeId = nodeId;
      this.menu.left = evt.x + "px";
      this.menu.top = evt.y + "px";
    },
    repaintEverything() {
      console.log("重绘");
      this.jsPlumb.repaint();
    },
    // 流程数据信息
    dataInfo() {
      this.flowInfoVisible = true;
      this.$nextTick(function() {
        this.$refs.flowInfo.init();
      });
    },
    // 加载流程图
    dataReload(data) {
      this.jsPlumb.reset();
      this.easyFlowVisible = false;
      this.data.activities = [];
      this.data.connections = [];
      this.$nextTick(() => {
        data = lodash.cloneDeep(data);
        this.easyFlowVisible = true;
        this.data = data;
        this.$nextTick(() => {
          this.jsPlumb = jsPlumb.getInstance();

          this.$nextTick(() => {
            this.jsPlumbInit();
          });
        });
      });
    },
    // 模拟载入数据dataA
    dataReloadA() {
      this.dataReload(getDataA());
    },
    // 模拟载入数据dataB
    dataReloadB() {
      this.dataReload(getDataB());
    },
    // 模拟载入数据dataC
    dataReloadC() {
      this.dataReload(getDataC());
    },
    // 模拟载入数据dataD
    dataReloadD() {
      this.dataReload(getDataD());
    },
    dataReloadE() {
      this.dataReload(getDataE());
    },
    zoomAdd() {
      if (this.zoom >= 1) {
        return;
      }
      this.zoom = this.zoom + 0.1;
      this.$refs.efContainer.style.transform = `scale(${this.zoom})`;
      this.jsPlumb.setZoom(this.zoom);
    },
    zoomSub() {
      if (this.zoom <= 0) {
        return;
      }
      this.zoom = this.zoom - 0.1;
      this.$refs.efContainer.style.transform = `scale(${this.zoom})`;
      this.jsPlumb.setZoom(this.zoom);
    },
    // 下载数据
    downloadData() {
      this.$confirm("确定要下载该流程数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      })
        .then(() => {
          var datastr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(this.data, null, "\t"));
          var downloadAnchorNode = document.createElement("a");
          downloadAnchorNode.setAttribute("href", datastr);
          downloadAnchorNode.setAttribute("download", "data.json");
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
          this.$message.success("正在下载中,请稍后...");
        })
        .catch(() => {});
    }
  }
};
</script>
