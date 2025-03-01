import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IndexedDBService from '../../utils/indexedDB/idb.helpers';
import { IDBStores, IDBDatabases } from '../../utils/indexedDB/types/indexedDB.types';
import { MiscImagesIds } from '../types/core.types';

const useIDBImages = (url: string, store: IDBStores, id: number | MiscImagesIds) => {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState<string | undefined>();

  useEffect(() => {
    let isMounted = true;
    let blobUrl: string | undefined;

    const setImageBlob = (blobData: Blob) => {
      blobUrl = URL.createObjectURL(blobData);
      if (isMounted) setImageSrc(blobUrl);
    };

    const handleCachedData = (cachedImage?: Blob) => {
      if (cachedImage) {
        setImageBlob(cachedImage);

        return Promise.resolve(undefined);
      }

      return axios
        .get(url, { responseType: 'blob', withCredentials: true })
        .then(response => response.data)
        .catch(error => {
          console.error(`Error fetching avatar image from url ${error}`);

          return undefined;
        });
    };

    const dbService = new IndexedDBService(IDBDatabases.LANCETECH_DB, store);

    const fetchCachedData = dbService.getData(id).then(data => handleCachedData(data));

    const putDataInDB = fetchCachedData.then(blob => {
      if (blob) return dbService.putData(id, blob).then(() => setImageBlob(blob));

      return undefined;
    });

    putDataInDB.catch(error => {
      console.error(`Error processing image data: ${error}`);
    });

    return () => {
      isMounted = false;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [dispatch, id, store, url]);

  return imageSrc;
};

export default useIDBImages;
