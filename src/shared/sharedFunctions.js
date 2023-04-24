import axiosClient from "./axiosClient";
import { DBREADINGS, DELETE_ENTRIES, READINGS } from "./endpoints";

export function getReadings(setFunction) {
    axiosClient.get(DBREADINGS).then(res => {
        setFunction(res.data);
    });
  }

  export function generateNew(setFunction) {
    axiosClient.get(READINGS);
    getReadings(setFunction);
  }

  export async function deleteEntries(setFunction) {
    await axiosClient.delete(DELETE_ENTRIES).then(
      Array(2).fill(0).forEach(() => generateNew(setFunction))
    );
  };