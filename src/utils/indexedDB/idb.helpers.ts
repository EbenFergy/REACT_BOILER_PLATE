import { type IDBPDatabase, openDB, deleteDB } from 'idb';
import { IDBDatabases, IDBStores, IDBStoresArray } from './types/indexedDB.types';

/**
 * open DB and upgrade if version number increases
 * NOTE: DB_VERSION number cannot be a float hence no decimal version numbers.
 * NOTE: DB_VERSION has to be incremented if changes are made like adding a new store,
 * deleting a store etc.
 * @returns
 */
class IndexedDBService {
  private dbVersion: number = 1;

  private dbName: string;

  private storeName: string;

  private db: Promise<void | IDBPDatabase<unknown>>;

  constructor(dbName: IDBDatabases, storeName: IDBStores) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = this.initDB();
  }

  /**
   * Initialize the IndexedDB and upgrade if version number increments
   * @returns db
   */
  private initDB = async (): Promise<void | IDBPDatabase<unknown>> => {
    try {
      const database = await openDB(this.dbName, this.dbVersion, {
        upgrade(db) {
          IDBStoresArray.forEach((store) => {
            if (!db.objectStoreNames.contains(store)) {
              db.createObjectStore(store);
            }
          });
        },
      });

      return database;
    } catch (error) {
      return console.error(`Oops! error while accessing the DB ${error}`);
    }
  };

  /**
   * Check if data exists in the store
   * @param id
   * @returns
   */
  public checkData = async (id: number | string): Promise<boolean> => {
    try {
      const db = await this.db;
      const data = await db?.get(this.storeName, id);

      return data !== undefined;
    } catch (error) {
      console.error(`Oops! error while accessing data ${error}`);

      return false;
    }
  };

  /**
   * enforce put. Overrides data if it exists
   * @param id
   * @param value
   * @returns
   */
  public overrideData = async (id: number | string, value: unknown) => {
    try {
      const db = await this.db;

      await db?.put(this.storeName, value, id);

      return value;
    } catch (error) {
      return console.error(`Oops! error while putting data: ${error}`);
    }
  };

  /**
   * Put data in the store if it doesn't exist
   * @param id
   * @param value
   * @returns
   */
  public putData = async <T>(
    id: number | string,
    value: T,
  ): Promise<T | void> => {
    try {
      const dataExists = await this.checkData(id);

      if (!dataExists) {
        const db = await this.db;

        await db?.put(this.storeName, value, id);
      }

      return value;
    } catch (error) {
      return console.error(`Oops! error while putting data: ${error}`);
    }
  };

  /**
   * Retrieve data from the store
   * @param id
   * @returns
   */
  public getData = async (id: number | string) => {
    try {
      const db = await this.db;
      const dataExists = await this.checkData(id);

      if (dataExists) {
        const data = await db?.get(this.storeName, id);

        return data;
      }

      return undefined;
    } catch (error) {
      return console.error(`Oops! error while fetching data: ${error}`);
    }
  };

  /**
   * check and delete database if cookie does not exist
   * @param database
   */
  public static readonly checkAndDeleteDB = async (database: IDBDatabases) => {
    await deleteDB(database);
  };
}

export default IndexedDBService;
