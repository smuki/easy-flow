var data_B = {
    name: '流程B',
    activities: [
        {
            id: 'nodeA',
            name: '流程B-节点A',
            type: 'task',
            left: '18',
            top: '223',
            ico: 'el-icon-user-solid',
            state: 'success'
        },
        {
            id: 'nodeB',
            type: 'task',
            name: '流程B-节点B',
            left: '351',
            top: '96',
            ico: 'el-icon-goods',
            state: 'error'
        },
        {
            id: 'nodeC',
            name: '流程B-节点C',
            type: 'task',
            left: '354',
            top: '351',
            ico: 'el-icon-present',
            state: 'warning'
        }, {
            id: 'nodeD',
            name: '流程B-节点D',
            type: 'task',
            left: '723',
            top: '215',
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
