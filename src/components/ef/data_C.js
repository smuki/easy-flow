var dataC = {
    name: '流程C',
    activities: [
        {
            id: 'nodeA',
            name: '流程C-节点A',
            type: 'task',
            left: '400',
            top: '15',
            ico: 'el-icon-user-solid'
        },
        {
            id: 'nodeB',
            name: '流程C-节点B',
            type: 'task',
            left: '400',
            top: '200',
            ico: 'el-icon-goods'
        },
        {
            id: 'nodeC',
            name: '流程C-节点C',
            type: 'task',
            left: '400',
            top: '378',
            ico: 'el-icon-present'
        }
    ],
    connections: [
        {
            sourceActivityId: 'nodeA',
            destinationActivityId: 'nodeB'
        }, {
            sourceActivityId: 'nodeB',
            destinationActivityId: 'nodeC'
        }
    ]
}

export function getDataC() {
    return dataC
}
