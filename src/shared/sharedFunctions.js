import axiosClient from "./axiosClient";
import { DBREADINGS, DELETE_ENTRIES, READINGS } from "./endpoints";

// Interogates the DB
export function getReadings(setFunction) {
    axiosClient.get(DBREADINGS).then(res => {
        setFunction(res.data);
    });
  }

// Generate a new reading to be saved in db and then
// interogates the db for that reading
  export function generateNew(setFunction) {
    axiosClient.get(READINGS);
    getReadings(setFunction);
  }

  export async function deleteEntries(setFunction) {
    await axiosClient.delete(DELETE_ENTRIES).then(
      Array(2).fill(0).forEach(() => generateNew(setFunction))
    );
  };

  // export function callDbInterogation(setFunction){
  //   setInterval(() => {getReadings(setFunction)}, 10000)
  // }