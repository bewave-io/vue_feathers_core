// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  clientDataValidator,
  clientPatchValidator,
  clientQueryValidator,
  clientResolver,
  clientExternalResolver,
  clientDataResolver,
  clientPatchResolver,
  clientQueryResolver,
} from './clients.schema';

import type { Application } from '../../declarations';
import { ClientsService, getOptions } from './clients.class';
import { clientsPath, clientsMethods } from './clients.shared';

export * from './clients.class';
export * from './clients.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const clients = (app: Application) => {
  // Register our service on the Feathers application
  app.use(clientsPath, new ClientsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: clientsMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(clientsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(clientExternalResolver),
        schemaHooks.resolveResult(clientResolver),
      ],
    },
    before: {
      all: [schemaHooks.validateQuery(clientQueryValidator), schemaHooks.resolveQuery(clientQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(clientDataValidator), schemaHooks.resolveData(clientDataResolver)],
      patch: [schemaHooks.validateData(clientPatchValidator), schemaHooks.resolveData(clientPatchResolver)],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [clientsPath]: ClientsService;
  }
}
