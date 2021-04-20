import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// createConnection();

export default async (): Promise<Connection> => {
  const defaultConnection = await createConnection();

  return defaultConnection;
}