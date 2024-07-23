// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { ObjectIdSchema } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import type { ClientsService } from './clients.class';

// Main data model schema
export const clientSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    email: Type.String(),
    phone: Type.Optional(Type.String()),
    address: Type.Optional(Type.String()),
  },
  { $id: 'Client', additionalProperties: false },
);
export type Client = Static<typeof clientSchema>;
export const clientValidator = getValidator(clientSchema, dataValidator);
export const clientResolver = resolve<Client, HookContext<ClientsService>>({});

export const clientExternalResolver = resolve<Client, HookContext<ClientsService>>({});

// Schema for creating new entries
export const clientDataSchema = Type.Pick(clientSchema, ['name', 'email', 'phone', 'address'], {
  $id: 'ClientsData',
});
export type ClientData = Static<typeof clientDataSchema>;
export const clientDataValidator = getValidator(clientDataSchema, dataValidator);
export const clientDataResolver = resolve<Client, HookContext<ClientsService>>({});

// Schema for updating existing entries
export const clientPatchSchema = Type.Partial(clientSchema, {
  $id: 'ClientPatch',
});
export type ClientPatch = Static<typeof clientPatchSchema>;
export const clientPatchValidator = getValidator(clientPatchSchema, dataValidator);
export const clientPatchResolver = resolve<Client, HookContext<ClientsService>>({});

// Schema for allowed query properties
export const clientQueryProperties = Type.Pick(clientSchema, ['_id', 'name', 'email', 'phone', 'address']);
export const clientQuerySchema = Type.Intersect(
  [
    querySyntax(clientQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type ClientsQuery = Static<typeof clientQuerySchema>;
export const clientQueryValidator = getValidator(clientQuerySchema, queryValidator);
export const clientQueryResolver = resolve<ClientsQuery, HookContext<ClientsService>>({});
