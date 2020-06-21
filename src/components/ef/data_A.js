var data_A = {
    name: '流程A',
    activities: [
        {
            id: 'nodeA',
            description: '流程A-节点A',
            type: 'task',
            left: '26',
            top: '161',
            ico: 'el-icon-user-solid'
        },
        {
            id: 'nodeB',
            description: '流程A-节点B',
            type: 'task',
            left: '340',
            top: '161',
            ico: 'el-icon-goods'
        },
        {
            id: 'nodeC',
            description: '流程A-节点C',
            type: 'task',
            left: '739',
            top: '161',
            ico: 'el-icon-present'
        }
    ],
    connections: [{
        sourceActivityId: 'nodeA',
        destinationActivityId: 'nodeB'
    }, {
        sourceActivityId: 'nodeB',
        destinationActivityId: 'nodeC'
    }]
}

export function getDataA() {
    return data_A
}
