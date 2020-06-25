<template>
  <div class="flow-menu" ref="tool">
    <div v-for="menu in menuList" :key="menu.id">
      <span class="ef-node-pmenu" @click="menu.open = !menu.open">
        <i
          :class="{
            'el-icon-caret-bottom': menu.open,
            'el-icon-caret-right': !menu.open
          }"
        ></i>
        &nbsp;{{ menu.name }}
      </span>
      <ul v-show="menu.open" class="ant-menu ant-menu-inline ant-menu-sub">
        <draggable
          @end="end"
          @start="move"
          v-model="menu.children"
          :options="draggableOptions"
        >
          <li
            v-for="subMenu in menu.children"
            class="ant-menu-item"
            :key="subMenu.id"
            :type="subMenu.id"
          >
            <i :class="subMenu.ico"></i>
            {{ subMenu.description }}
          </li>
        </draggable>
      </ul>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

var mousePosition = {
  left: -1,
  top: -1
};

export default {
  data() {
    return {
      activeNames: "1",
      // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: "tt",
        // 不使用H5原生的配置
        forceFallback: true
        // 拖拽的时候样式
        // fallbackClass: 'flow-node-draggable'
      },
      // 默认打开的左侧菜单的id
      defaultOpeneds: ["1", "2"],
      menuList: [
        {
          id: "1",
          type: "group",
          name: "Console",
          ico: "el-icon-video-play",
          open: true,
          children: [
            {
              id: "11",
              type: "ReadLine",
              description: "ReadLine",
              ico: "el-icon-time",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "12",
              type: "WriteLine",
              description: "WriteLine",
              ico: "el-icon-odometer",
              // 自定义覆盖样式
              style: {}
            }
          ]
        },
        {
          id: "3",
          type: "group",
          name: "Control Flow",
          ico: "el-icon-video-play",
          open: true,
          children: [
            {
              id: "31",
              type: "ForEach",
              description: "Foreach",
              ico: "el-icon-time",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "32",
              type: "IfElse",
              description: "If/Else",
              ico: "el-icon-odometer",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "33",
              type: "Switch",
              description: "Switch",
              ico: "el-icon-odometer",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "34",
              type: "Fork",
              description: "Fork",
              ico: "el-icon-odometer",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "35",
              type: "Join",
              description: "Join",
              ico: "el-icon-odometer",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "36",
              type: "While",
              description: "While",
              ico: "el-icon-odometer",
              // 自定义覆盖样式
              style: {}
            }
          ]
        },

        {
          id: "4",
          type: "group",
          name: "Workflows",
          ico: "el-icon-video-pause",
          open: true,
          children: [
            {
              id: "41",
              type: "Correlate",
              description: "Correlate",
              ico: "el-icon-caret-right",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "42",
              type: "Signaled",
              description: "Signaled",
              ico: "el-icon-shopping-cart-full",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "43",
              type: "TriggerSignal",
              description: "Trigger Signal",
              ico: "el-icon-shopping-cart-full",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "44",
              type: "Complete",
              description: "Finish",
              ico: "el-icon-shopping-cart-full",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "45",
              type: "Start",
              description: "Start",
              ico: "el-icon-shopping-cart-full",
              // 自定义覆盖样式
              style: {}
            },
            {
              id: "46",
              type: "over",
              description: "Trigger Workflow",
              ico: "el-icon-shopping-cart-full",
              // 自定义覆盖样式
              style: {}
            }
          ]
        },
        {
          id: "5",
          type: "group",
          name: "Primitives",
          ico: "el-icon-video-pause",
          open: true,
          children: [
            {
              id: "51",
              type: "SetVariable",
              description: "Set Variable",
              ico: "el-icon-caret-right",
              // 自定义覆盖样式
              style: {}
            }
          ]
        },
        {
          id: "6",
          type: "group",
          name: "User Task",
          ico: "el-icon-video-pause",
          open: true,
          children: [
            {
              id: "61",
              type: "end",
              description: "User Task",
              ico: "el-icon-caret-right",
              // 自定义覆盖样式
              style: {}
            }
          ]
        }
      ],
      nodeMenu: {}
    };
  },
  components: {
    draggable
  },
  created() {
    /**
     * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
     * @param event
     */
    if (this.isFirefox()) {
      document.body.ondrop = function(event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        //mousePosition.left = event.layerX;
        //mousePosition.top = event.clientY - 50;
        // event.preventDefault();
        // event.stopPropagation();
      };
    }
  },
  methods: {
    // 根据类型获取左侧菜单对象
    getMenuByType(type) {
      for (let i = 0; i < this.menuList.length; i++) {
        let children = this.menuList[i].children;
        for (let j = 0; j < children.length; j++) {
          if (children[j].id === type) {
            return children[j];
          }
        }
      }
    },
    // 拖拽开始时触发
    move(evt, a, b, c) {
      var type = evt.item.attributes.type.nodeValue;
      this.nodeMenu = this.getMenuByType(type);
    },
    // 拖拽结束时触发
    end(evt, e) {
      console.log("---nodeMenu---");
      console.log(this.nodeMenu);

      console.log("---evt---");

      console.log(evt);

      this.$emit("addNode", evt, this.nodeMenu, mousePosition);
    },
    // 是否是火狐浏览器
    isFirefox() {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") > -1) {
        return true;
      }
      return false;
    }
  }
};
</script>
