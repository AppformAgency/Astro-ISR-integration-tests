export const ENV = {
  route: process.env.ROUTE,
  params: process.env.PARAMS,
};

export const parseParams = () => JSON.parse(ENV.params!);
