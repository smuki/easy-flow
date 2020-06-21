var data_E = {
  name: '流程E',
  activities: [
    {
      id: '70dc3b23-b717-47e0-b8ae-61c05b8734e2',
      type: 'HttpRequestEvent',
      left: 34,
      top: 0,
      state: {
        path: '/documents',
        method: 'POST',
        readContent: true,
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: '4d93f6bc-b9f2-4827-a3e5-29c85dbb6b9e',
      type: 'SetVariable',
      left: 332,
      top: 0,
      state: {
        variableName: 'Document',
        valueExpression: {
          expression: 'lastResult().Content',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: '8034666e-b657-4910-9ce5-4fe1b4ca3032',
      type: 'SendEmail',
      left: 680,
      top: 0,
      state: {
        from: {
          expression: 'approval@acme.com',
          syntax: 'Literal',
        },
        to: {
          expression: 'Document.Author.Email',
          syntax: 'JavaScript',
        },
        subject: {
          expression: 'Document received from',
          syntax: 'JavaScript',
        },
        body: {
          expression: 'Document from ',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: '34ae7e45-affe-47e7-b761-1470193304cd',
      type: 'HttpResponseAction',
      left: 963,
      top: 0,
      state: {
        statusCode: '200',
        content: {
          expression: '<h1>Request for Approval Sent</h1>\r\n<p>Your document has been received and will be reviewed shortly.</p>',
          syntax: 'Literal',
        },
        contentType: 'text/html',
        responseHeaders: {
          expression: 'X-Powered-By=Elsa Workflows',
          syntax: 'Literal',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: 'aec3a175-28f3-45a5-9342-08e3305d4d40',
      type: 'SetVariable',
      left: 1195,
      top: 166,
      state: {
        variableName: 'Approved',
        valueExpression: {
          expression: 'false',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: 'a3840675-7d39-426d-ad62-eb21eebe8071',
      type: 'Fork',
      left: 701,
      top: 152,
      state: {
        branches: [
          'Approve',
          'Reject',
          'Remind',
        ],
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: '5dc9120e-89bc-4093-a157-973a253a29cd',
      type: 'Signaled',
      left: 679,
      top: 386,
      state: {
        signal: {
          expression: 'Approve',
          syntax: 'Literal',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: '8f79d641-59cd-4564-86f9-f9c50b9ff022',
      type: 'Signaled',
      left: 1046,
      top: 389,
      state: {
        signal: {
          expression: 'Reject',
          syntax: 'Literal',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: '7fb8cbfc-c2bb-4414-9eee-efe08fb9a1de',
      type: 'TimerEvent',
      left: 391,
      top: 259,
      state: {
        timeoutExpression: {
          expression: '00:00:10',
          syntax: 'Literal',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: 'c5c5f2ca-4413-46df-9885-fdd782cbfb9b',
      type: 'IfElse',
      left: 37,
      top: 451,
      state: {
        conditionExpression: {
          expression: '!!Approved',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: 'cbea8450-d839-47c7-85bb-ce3d8dba6cfb',
      type: 'SendEmail',
      left: 18,
      top: 163,
      state: {
        from: {
          expression: 'reminder@acme.com',
          syntax: 'Literal',
        },
        to: {
          expression: 'approval@acme.com',
          syntax: 'Literal',
        },
        subject: {
          expression: 'Document.Author.Name is awaiting your review!',
          syntax: 'JavaScript',
        },
        body: {
          expression: 'D',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: 'c39f824c-e6c5-4dd7-95ea-bfa116109356',
      type: 'Join',
      left: 652,
      top: 615,
      state: {
        mode: 'WaitAny',
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: '043f256c-7602-4e57-a629-024b89b786ea',
      type: 'SetVariable',
      left: 271,
      top: 730,
      state: {
        variableName: 'Approved',
        valueExpression: {
          expression: 'input(\'Signal\') === \'Approve\'',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: '357ffe1a-85ec-4646-bd65-444f15c5fc8d',
      type: 'IfElse',
      left: 706,
      top: 823,
      state: {
        conditionExpression: {
          expression: '!!Approved',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: 'c82e8f3e-61a0-447d-91dd-f41eb4002ed3',
      type: 'SendEmail',
      left: 366,
      top: 961,
      state: {
        from: {
          expression: 'approval@acme.com',
          syntax: 'Literal',
        },
        to: {
          expression: 'Document.Author.Email',
          syntax: 'JavaScript',
        },
        subject: {
          expression: 'Document Document.Id} approved!',
          syntax: 'JavaScript',
        },
        body: {
          expression: 'Great job Document.Author.Name}, that document is perfect! Keep it up.',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: 'f204069c-1bba-4ed8-9b3b-96e1bf8a39d6',
      type: 'SendEmail',
      left: 1069,
      top: 963,
      state: {
        from: {
          expression: 'approval@acme.com',
          syntax: 'Literal',
        },
        to: {
          expression: 'Document.Author.Email',
          syntax: 'JavaScript',
        },
        subject: {
          expression: 'Document Document.Id} rejected',
          syntax: 'JavaScript',
        },
        body: {
          expression: 'Sorry Document.Author.Name}, that document isn\'t good enough. Please try again.',
          syntax: 'JavaScript',
        },
      },
      blocking: false,
      executed: false,
      faulted: false,
    },
    {
      id: 'b8949e11-a3aa-4aa4-8ddc-000461291bfd',
      type: 'Finish',
      left: 656,
      top: 1162,
      state: {},
      blocking: false,
      executed: false,
      faulted: false,
    },
  ],
  connections: [
    {
      sourceActivityId: '70dc3b23-b717-47e0-b8ae-61c05b8734e2',
      destinationActivityId: '4d93f6bc-b9f2-4827-a3e5-29c85dbb6b9e',
      outcome: 'Done',
    },
    {
      sourceActivityId: '4d93f6bc-b9f2-4827-a3e5-29c85dbb6b9e',
      destinationActivityId: '8034666e-b657-4910-9ce5-4fe1b4ca3032',
      outcome: 'Done',
    },
    {
      sourceActivityId: '8034666e-b657-4910-9ce5-4fe1b4ca3032',
      destinationActivityId: '34ae7e45-affe-47e7-b761-1470193304cd',
      outcome: 'Done',
    },
    {
      sourceActivityId: '34ae7e45-affe-47e7-b761-1470193304cd',
      destinationActivityId: 'aec3a175-28f3-45a5-9342-08e3305d4d40',
      outcome: 'Done',
    },
    {
      sourceActivityId: 'aec3a175-28f3-45a5-9342-08e3305d4d40',
      destinationActivityId: 'a3840675-7d39-426d-ad62-eb21eebe8071',
      outcome: 'Done',
    },
    {
      sourceActivityId: 'a3840675-7d39-426d-ad62-eb21eebe8071',
      destinationActivityId: '5dc9120e-89bc-4093-a157-973a253a29cd',
      outcome: 'Approve',
    },
    {
      sourceActivityId: 'a3840675-7d39-426d-ad62-eb21eebe8071',
      destinationActivityId: '7fb8cbfc-c2bb-4414-9eee-efe08fb9a1de',
      outcome: 'Remind',
    },
    {
      sourceActivityId: 'a3840675-7d39-426d-ad62-eb21eebe8071',
      destinationActivityId: '8f79d641-59cd-4564-86f9-f9c50b9ff022',
      outcome: 'Reject',
    },
    {
      sourceActivityId: '7fb8cbfc-c2bb-4414-9eee-efe08fb9a1de',
      destinationActivityId: 'c5c5f2ca-4413-46df-9885-fdd782cbfb9b',
      outcome: 'Done',
    },
    {
      sourceActivityId: 'c5c5f2ca-4413-46df-9885-fdd782cbfb9b',
      destinationActivityId: 'cbea8450-d839-47c7-85bb-ce3d8dba6cfb',
      outcome: 'False',
    },
    {
      sourceActivityId: 'cbea8450-d839-47c7-85bb-ce3d8dba6cfb',
      destinationActivityId: '7fb8cbfc-c2bb-4414-9eee-efe08fb9a1de',
      outcome: 'Done',
    },
    {
      sourceActivityId: '5dc9120e-89bc-4093-a157-973a253a29cd',
      destinationActivityId: 'c39f824c-e6c5-4dd7-95ea-bfa116109356',
      outcome: 'Done',
    },
    {
      sourceActivityId: '8f79d641-59cd-4564-86f9-f9c50b9ff022',
      destinationActivityId: 'c39f824c-e6c5-4dd7-95ea-bfa116109356',
      outcome: 'Done',
    },
    {
      sourceActivityId: 'c39f824c-e6c5-4dd7-95ea-bfa116109356',
      destinationActivityId: '043f256c-7602-4e57-a629-024b89b786ea',
      outcome: 'Done',
    },
    {
      sourceActivityId: '043f256c-7602-4e57-a629-024b89b786ea',
      destinationActivityId: '357ffe1a-85ec-4646-bd65-444f15c5fc8d',
      outcome: 'Done',
    },
    {
      sourceActivityId: '357ffe1a-85ec-4646-bd65-444f15c5fc8d',
      destinationActivityId: 'c82e8f3e-61a0-447d-91dd-f41eb4002ed3',
      outcome: 'True',
    },
    {
      sourceActivityId: '357ffe1a-85ec-4646-bd65-444f15c5fc8d',
      destinationActivityId: 'f204069c-1bba-4ed8-9b3b-96e1bf8a39d6',
      outcome: 'False',
    },
    {
      sourceActivityId: 'c82e8f3e-61a0-447d-91dd-f41eb4002ed3',
      destinationActivityId: 'b8949e11-a3aa-4aa4-8ddc-000461291bfd',
      outcome: 'Done',
    },
    {
      sourceActivityId: 'f204069c-1bba-4ed8-9b3b-96e1bf8a39d6',
      destinationActivityId: 'b8949e11-a3aa-4aa4-8ddc-000461291bfd',
      outcome: 'Done',
    },
  ],
}

export function getDataE() {
    return data_E
}
