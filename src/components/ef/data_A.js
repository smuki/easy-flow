var data_A = {
    name: '流程A',
    activities: [
        {
            id: 'nodeA',
            name: '流程A-节点A',
            type: 'task',
            left: '26px',
            top: '161px',
            ico: 'el-icon-user-solid'
        },
        {
            id: 'nodeB',
            name: '流程A-节点B',
            type: 'task',
            left: '340px',
            top: '161px',
            ico: 'el-icon-goods'
        },
        {
            id: 'nodeC',
            name: '流程A-节点C',
            type: 'task',
            left: '739px',
            top: '161px',
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
