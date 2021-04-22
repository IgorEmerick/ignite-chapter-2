import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// createConnection();

export default async (): Promise<Connection> => {
  const defaultConnection = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultConnection, {
      host: "localhost"
    })
  );
}