import { openDatabase, SQLResultSet } from 'expo-sqlite';
import Place from '../models/Place.class';

const databse = openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    databse.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image text NOT NULL, address TEXT NOT NULL, lat REAL, lng REAL)',
        [],
        () => {
          resolve(true);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (
  title: string,
  image: string,
  address: string,
  lat?: number,
  lng?: number
): Promise<SQLResultSet> => {
  return new Promise((resolve, reject) => {
    databse.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, image , address , lat , lng ) VALUES(?, ?, ?, ?, ?)',
        [title, image, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const fetchPlaces = (): Promise<{ rows: Place[]; length: number }> => {
  return new Promise((resolve, reject) => {
    databse.transaction((tx) => {
      tx.executeSql(
        'select * from places',
        [],
        (_, result) => {
          const { rows } = result;
          resolve({ rows: (rows as any)._array, length: rows.length });
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};
