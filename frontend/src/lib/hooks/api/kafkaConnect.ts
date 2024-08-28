import {
  Connect,
  Connector,
  ConnectorAction,
  FullConnectorInfo,
  ConnectorType,
  ConnectorState,
  NewConnector,
} from 'generated-sources';
import { kafkaConnectApiClient as api } from 'lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClusterName } from 'lib/interfaces/cluster';
import { showSuccessAlert } from 'lib/errorHandling';

interface UseConnectorProps {
  clusterName: ClusterName;
  connectName: Connect['name'];
  connectorName: Connector['name'];
}
interface CreateConnectorProps {
  connectName: Connect['name'];
  newConnector: NewConnector;
}

const connectsKey = (clusterName: ClusterName) => [
  'clusters',
  clusterName,
  'connects',
];
const connectorsKey = (clusterName: ClusterName, search?: string) => {
  const base = ['clusters', clusterName, 'connectors'];
  if (search) {
    return [...base, { search }];
  }
  return base;
};
const connectorKey = (props: UseConnectorProps) => [
  'clusters',
  props.clusterName,
  'connects',
  props.connectName,
  'connectors',
  props.connectorName,
];
const connectorTasksKey = (props: UseConnectorProps) => [
  ...connectorKey(props),
  'tasks',
];

// Simplified Mocked useConnects Hook
export function useMockConnects(clusterName: ClusterName) {
  const mockConnects = [
    { name: 'first', address: 'http://localhost:8083' },
    { name: 'kafka-connect-di.test.env', address: 'http://localhost:8091' },
    { name: 'clusterB', address: 'http://localhost:8084' },
    { name: 'clusterC', address: 'http://localhost:8085' },
    { name: 'clusterD', address: 'http://localhost:8086' },
    { name: 'clusterE', address: 'http://localhost:8087' },
    { name: 'clusterR', address: 'http://localhost:8088' },
    { name: 'clusterQ', address: 'http://localhost:8089' },
    { name: 'clusterQ2', address: 'http://localhost:8090' },
  ];

  // Return an object with the 'data' property
  return { data: mockConnects };
}

export function useConnects(clusterName: ClusterName) {
  return useQuery(connectsKey(clusterName), () =>
    api.getConnects({ clusterName })
  );
}

// Mock Data
const mockConnectors: FullConnectorInfo[] = [
  {
    connect: 'kafka-connect-di.test.env',
    name: 'sink.clickhouse.protobuf.b2b.mt5.users.events',
    connectorClass:
      'com.exness.datahub.kafka.connect.clickhouse.protobuf.ClickhouseSinkConnector',
    type: ConnectorType.SINK,
    topics: ['b2b.mt5.users.events.ext_mt5_lp_real1'],
    status: {
      state: ConnectorState.RUNNING,
    },
    tasksCount: 2,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterB',
    name: 'connectorB',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSinkConnector',
    type: ConnectorType.SOURCE,
    topics: ['topic3'],
    status: {
      state: ConnectorState.RUNNING,
    },
    tasksCount: 1,
    failedTasksCount: 1,
  },
  {
    connect: 'clusterC',
    name: 'connectorC',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSourceConnector',
    type: ConnectorType.SINK,
    topics: ['topic4'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterD',
    name: 'connectorD',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSourceConnector',
    type: ConnectorType.SINK,
    topics: ['topic4'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterE',
    name: 'connectorE',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSourceConnector',
    type: ConnectorType.SOURCE,
    topics: ['topic5'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterD',
    name: 'connectorD1',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic9'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterR',
    name: 'connectorR',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic9', 'topic3'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ2',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ3',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ4',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ5',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ6',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ7',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ8',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ9',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ10',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ11',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ12',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ13',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 2,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ14',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RUNNING,
    },
    tasksCount: 3,
    failedTasksCount: 1,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ15',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.RESTARTING,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ16',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.FAILED,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ17',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.UNASSIGNED,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ',
    name: 'connectorQ18',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.STOPPED,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
  {
    connect: 'clusterQ2',
    name: 'connectorQ19',
    connectorClass: 'org.apache.kafka.connect.file.FileStreamSINKConnector',
    type: ConnectorType.SINK,
    topics: ['topic10', 'topic1'],
    status: {
      state: ConnectorState.TASK_FAILED,
    },
    tasksCount: 3,
    failedTasksCount: 0,
  },
];

// Mock API Function
function mockGetAllConnectors({ clusterName, search = '' }) {
  return new Promise<FullConnectorInfo[]>((resolve) => {
    resolve(mockConnectors);
  });
}

// Custom Hook
export function useMockConnectors(clusterName: string, search?: string) {
  return useQuery(
    ['connectors', clusterName, search],
    () => mockGetAllConnectors({ clusterName, search }),
    {
      select: (data) =>
        [...data].sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }),
    }
  );
}


export function useConnectors(clusterName: ClusterName, search?: string) {
  return useQuery(
    connectorsKey(clusterName, search),
    () => api.getAllConnectors({ clusterName, search }),
    {
      select: (data) =>
        [...data].sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }),
    }
  );
}
export function useConnector(props: UseConnectorProps) {
  return useQuery(connectorKey(props), () => api.getConnector(props));
}
export function useConnectorTasks(props: UseConnectorProps) {
  return useQuery(
    connectorTasksKey(props),
    () => api.getConnectorTasks(props),
    {
      select: (data) =>
        [...data].sort((a, b) => {
          const aid = a.status.id;
          const bid = b.status.id;

          if (aid < bid) {
            return -1;
          }

          if (aid > bid) {
            return 1;
          }
          return 0;
        }),
    }
  );
}
export function useUpdateConnectorState(props: UseConnectorProps) {
  const client = useQueryClient();
  return useMutation(
    (action: ConnectorAction) => api.updateConnectorState({ ...props, action }),
    {
      onSuccess: () =>
        client.invalidateQueries(['clusters', props.clusterName, 'connectors']),
    }
  );
}
export function useRestartConnectorTask(props: UseConnectorProps) {
  const client = useQueryClient();
  return useMutation(
    (taskId: number) => api.restartConnectorTask({ ...props, taskId }),
    {
      onSuccess: () => client.invalidateQueries(connectorTasksKey(props)),
    }
  );
}
export function useConnectorConfig(props: UseConnectorProps) {
  return useQuery([...connectorKey(props), 'config'], () =>
    api.getConnectorConfig(props)
  );
}
export function useUpdateConnectorConfig(props: UseConnectorProps) {
  const client = useQueryClient();
  return useMutation(
    (requestBody: Connector['config']) =>
      api.setConnectorConfig({ ...props, requestBody }),
    {
      onSuccess: () => {
        showSuccessAlert({
          message: `Config successfully updated.`,
        });
        client.invalidateQueries(connectorKey(props));
      },
    }
  );
}
function useCreateConnectorMutation(clusterName: ClusterName) {
  const client = useQueryClient();
  return useMutation(
    (props: CreateConnectorProps) =>
      api.createConnector({ ...props, clusterName }),
    {
      onSuccess: () => client.invalidateQueries(connectorsKey(clusterName)),
    }
  );
}

// this will change later when we validate the request before
export function useCreateConnector(clusterName: ClusterName) {
  const mutate = useCreateConnectorMutation(clusterName);

  return {
    createResource: async (param: CreateConnectorProps) => {
      return mutate.mutateAsync(param);
    },
    ...mutate,
  };
}

export function useDeleteConnector(props: UseConnectorProps) {
  const client = useQueryClient();

  return useMutation(() => api.deleteConnector(props), {
    onSuccess: () => client.invalidateQueries(connectorsKey(props.clusterName)),
  });
}
