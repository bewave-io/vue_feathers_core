// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { Client, ClientData, ClientPatch, ClientsQuery } from './clients.schema';

export type { Client, ClientData, ClientPatch, ClientsQuery };

export interface ClientsParams extends MongoDBAdapterParams<ClientsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ClientsService<ServiceParams extends Params = ClientsParams> extends MongoDBService<
  Client,
  ClientData,
  ClientsParams,
  ClientPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('clients')),
  };
};
