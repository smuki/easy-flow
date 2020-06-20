// 是否具有该线
export function hasLine(data, sourceActivityId, destinationActivityId) {
    for (let i = 0; i < data.connections.length; i++) {
        let line = data.connections[i]
        if (line.sourceActivityId === sourceActivityId && line.destinationActivityId === destinationActivityId) {
            return true
        }
    }
    return false
}

// 是否含有相反的线
export function hashOppositeLine(data, sourceActivityId, destinationActivityId) {
    return hasLine(data, destinationActivityId, sourceActivityId)
}

// 获取连线
export function getConnector(jsp, sourceActivityId, destinationActivityId) {
    let connection = jsp.getConnections({
        source: sourceActivityId,
        target: destinationActivityId
    })[0]
    return connection
}

// 获取唯一标识
export function uuid() {
    return Math.random().toString(36).substr(3, 10)
}
