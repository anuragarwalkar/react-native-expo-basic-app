import { useEffect, useState } from 'react';
import { init } from '../helpers/database';

const useDatabse = (): [boolean] => {
  const [dbInitialized, serDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(async (res) => {
        serDbInitialized(true);
        console.log('sql-lite:', 'Database Connected');
      })
      .catch((err) => {
        serDbInitialized(true);
        console.log('Err:', err);
      });
  }, [init]);

  return [dbInitialized];
};

export default useDatabse;
