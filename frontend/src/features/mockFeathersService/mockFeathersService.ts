// FIXME: This file was created by bulk-decaffeinate
// eslint-disable-next-line
// @ts-nocheck
import { AnyData } from 'feathers-pinia';

export default class MockFeathersService {
  constructor(mockServer) {
    this.servicesDic = {};
    // eslint-disable-next-line no-promise-executor-return
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    mockServer.on('find', async (serviceName: string, query: AnyData, acknowledgementFunction: (arg1: AnyData | null, arg2: AnyData) => void) => {
      if (serviceName in this.servicesDic) {
        console.log(`Simulating find ${serviceName}`, serviceName, query, acknowledgementFunction);
        await sleep(this.servicesDic[serviceName].delay);
        const { dataSet } = this.servicesDic[serviceName];
        console.log('dataSet find', dataSet);
        acknowledgementFunction(null, {
          total: dataSet.length, limit: 9999, skip: 0, data: dataSet.data,
        });
      } else {
        console.error(
          `${serviceName} : failed simulating find for undefined mock service`,
          serviceName,
          query,
          acknowledgementFunction,
        );
      }
    });

    mockServer.on('get', async (serviceName: string, id: string, noUse, acknowledgementFunction: (arg1: AnyData | null, arg2: AnyData) => void) => {
      console.log('serviceName', serviceName, 'id', id, 'noUse', noUse, 'acknowledgementFunction', acknowledgementFunction);
      if (serviceName in this.servicesDic) {
        if (serviceName !== 'health-check') console.log(`Simulating get ${serviceName}`, serviceName, id, noUse, acknowledgementFunction);
        await sleep(this.servicesDic[serviceName].delay);
        const { dataSet } = this.servicesDic[serviceName];
        console.log('dataSet', dataSet.data);
        const record = dataSet.data.find((elt: AnyData) => elt._id === id);
        console.log('record', record);
        if (typeof dataSet.get === 'function') {
          acknowledgementFunction(null, dataSet.get(id));
        } else {
          acknowledgementFunction(null, record);
        }
      } else {
        console.error(
          `${serviceName} : failed simulating get for undefined mock service`,
          serviceName,
          id,
          noUse,
          acknowledgementFunction,
        );
      }
    });

    mockServer.on('create', async (serviceName: string, data: AnyData, noUse, acknowledgementFunction: (arg1: AnyData | null, arg2: AnyData) => void) => {
      if (serviceName in this.servicesDic) {
        console.log(`Simulating create ${serviceName}`, serviceName, data, noUse, acknowledgementFunction);
        await sleep(this.servicesDic[serviceName].delay);
        const { dataSet } = this.servicesDic[serviceName]
        console.log('dataSet', dataSet);
        if (typeof dataSet.create === 'function') {
          acknowledgementFunction(null, dataSet.create(data));
        } else {
          acknowledgementFunction(null, data);
        }
      } else {
        console.error(
          `${serviceName} : failed simulating create for undefined mock service ${serviceName}`,
          serviceName,
          data,
          noUse,
          acknowledgementFunction,
        );
      }
    });

    mockServer.on('patch', async (serviceName: string, id: string, data: AnyData, noUse, acknowledgementFunction: (arg1: AnyData | null, arg2: AnyData) => void) => {
      if (serviceName in this.servicesDic) {
        console.log(`Simulating patch %c${serviceName} :`, 'color: green', serviceName, data, noUse, acknowledgementFunction);
        await sleep(this.servicesDic[serviceName].delay);
        const { dataSet } = this.servicesDic[serviceName];
        if (typeof dataSet.patch === 'function') {
          acknowledgementFunction(null, dataSet.patch(id));
        } else {
          acknowledgementFunction(null, data);
        }
      } else {
        console.error(
          `${serviceName} : failed simulating patch for undefined mock service ${serviceName}`,
          serviceName,
          id,
          data,
          noUse,
          acknowledgementFunction,
        );
      }
    });

    mockServer.on('remove', async (serviceName: string, id: string, noUse, acknowledgementFunction: (arg1: AnyData | null, arg2: AnyData) => void) => {
      if (serviceName in this.servicesDic) {
        console.log(`Simulating remove %c${serviceName} :`, 'color: green', serviceName, id, noUse, acknowledgementFunction);
        await sleep(this.servicesDic[serviceName].delay);
        acknowledgementFunction(null, { id, deleted: true });
      } else {
        console.error(
          `${serviceName} : failed simulating remove for undefined mock service ${serviceName}`,
          serviceName,
          id,
          noUse,
          acknowledgementFunction,
        );
      }
    });
  }
  async addService(mockName: string, importName = mockName, delay = 1000) {
    const dataSetFiles = import.meta.glob(
      '@/features/**/*.mockSet.ts',
      { eager: true },
    );

    let dataSet = { data: [] };

 for (const path of  Object.keys(dataSetFiles)) {
   if (path.includes(`${importName}.mockSet.ts`)) {
     console.log('path', path);
     const data = dataSetFiles[path] as AnyData;
     const dataObject = await data();
     console.log('dataObject', dataObject.default.data);
     dataSet = {
       ...dataSet,
       ...dataObject.default,
       data: [...dataSet.data, ...dataObject.default.data],
     };
     console.log('dataSet', dataSet);
   }
 }
    console.log(`dataSetFiles ${importName} = `, dataSet);
    this.servicesDic[mockName] = { dataSet, delay };
  }
  // async addService(mockName: string, importName = mockName, delay = 1000) {
  //   const dataSetFiles = import.meta.glob(
  //     '@/features/**/*.mockSet.ts',
  //     { eager: true },
  //   );
  //
  //   const setData = await Promise.all(
  //   Object.values(dataSetFiles).map(async (mod) =>{
  //       console.log('mod', mod)
  //       return (await mod()).default
  //     }),
  // );
  //
  //   let dataSet = { data: [] };
  //   Object.values(setData).map((dataObject) => {
  //
  //       dataSet = {
  //         ...dataSet,
  //         ...dataObject,
  //         data: [...dataSet?.data, ...dataObject?.data],
  //       };
  //
  //   });
  //
  //   console.log(`dataSetFiles ${importName} = `, dataSet);
  //   this.servicesDic[mockName] = { dataSet, delay };
  // }
}
