/**
 * This follows the singleton pattern: if it is not yet initialized, it creates a new firestore connection.
 * Once it's created, it's stored.
 * Any other times (unless newConnection arg is true) it's called it always returns the pre-initialized firestore instance.
 */

let existingInstance = null;

export const getMeADatabase = (firebaseInstance, newConnection = false) => {
  if (existingInstance !== null && !newConnection) {
    return existingInstance;
  }
  const db = firebaseInstance().firestore();
  if (window && window.location.hostname === "localhost") {
    console.log("Localhost detected! Using an emulator.");
    db.settings({
      host: "localhost:20090",
      ssl: false
    });
  }
  existingInstance = db;
  return db;
};
