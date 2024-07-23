// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Client, ClientData, ClientPatch, ClientsQuery, ClientsService } from './clients.class';

export type { Client, ClientData, ClientPatch, ClientsQuery };

export type ClientsClientService = Pick<
  ClientsService<Params<ClientsQuery>>,
  (typeof clientsMethods)[number]
>;

export const clientsPath = 'clients';

export const clientsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const clientsClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(clientsPath, connection.service(clientsPath), {
    methods: clientsMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [clientsPath]: ClientsClientService;
  }
}
