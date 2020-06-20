var data_B = {
    name: '流程B',
    activities: [
        {
            id: 'nodeA',
            name: '流程B-节点A',
            type: 'task',
            left: '18px',
            top: '223px',
            ico: 'el-icon-user-solid',
            state: 'success'
        },
        {
            id: 'nodeB',
            type: 'task',
            name: '流程B-节点B',
            left: '351px',
            top: '96px',
            ico: 'el-icon-goods',
            state: 'error'
        },
        {
            id: 'nodeC',
            name: '流程B-节点C',
            type: 'task',
            left: '354px',
            top: '351px',
            ico: 'el-icon-present',
            state: 'warning'
        }, {
            id: 'nodeD',
            name: '流程B-节点D',
            type: 'task',
            left: '723px',
            top: '215px',
            ico: 'el-icon-present',
            state: 'running'
        }
    ],
    connections: [{
        sourceActivityId: 'nodeA',
        destinationActivityId: 'nodeB',
        outcome: '条件A'
    }, {
        sourceActivityId: 'nodeA',
        destinationActivityId: 'nodeC',
        outcome: '条件B'
    }, {
        sourceActivityId: 'nodeB',
        destinationActivityId: 'nodeD'
    }, {
        sourceActivityId: 'nodeC',
        destinationActivityId: 'nodeD'
    }
    ]
}

export function getDataB() {
    return data_B
}
