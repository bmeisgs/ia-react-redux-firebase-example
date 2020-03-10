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
