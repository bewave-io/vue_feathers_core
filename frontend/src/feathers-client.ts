import { type FeathersService, feathers } from '@feathersjs/feathers';
import authenticationClient from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';
import fixtureSocket from 'can-fixture-socket';
import mocks from '@f/Mocks/service'
import io from 'socket.io-client';
import { createPiniaClient } from 'feathers-pinia';
import { pinia } from './modules/pinia';
import MockFeathersService from '@f/mockFeathersService/mockFeathersService';

const host =
  (import.meta.env.VITE_MY_API_URL as string) || 'http://localhost:3030';


const mockServer = new fixtureSocket.Server(io);

const socket = io(host, { transports: ['websocket'] });

const mocksFeathers = new MockFeathersService(mockServer);

// Tote service
await mocksFeathers.addService('mocks');
await mocksFeathers.addService('users');
await mocksFeathers.addService('authentication');
export const feathersClient = feathers<Record<string, FeathersService>>()
  .configure(socketio(socket))
  .configure(authenticationClient({ storage: window.localStorage }));

export const api = createPiniaClient(feathersClient, {
  pinia,
  idField: '_id',
  // optional
  ssr: false,
  whitelist: [],
  paramsForServer: [],
  syncWithStorage: true,
  skipGetIfExists: true,
  customSiftOperators: {},
  setupInstance(data) {
    return data;
  },
  customizeStore() {
    return {};
  },
  services: {
    mocks
  },
});

export function useFeathers() {
  return { api };
}

export const useFeathersService = (
  servicePath: string,
  clientAlias = 'api',
) => {
  const clients = useFeathers();
  const client = clients[clientAlias as keyof typeof clients];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client.service(servicePath as any);
};
