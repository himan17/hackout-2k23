import { addDoc, getDoc, doc, collection } from "firebase/firestore/lite";
import { db } from "../../../firebase/firebase";

export async function createProjectInFB(projectDetails) {
  try {
    const docRef = await addDoc(collection(db, "projects"), projectDetails);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (er) {
    console.log("Error creating project in firebase: ", er);
  }
}

export async function getProjectFromFB(id) {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return {id: id, ...docSnap.data()};
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
  } catch (er) {
    console.log("Error getting project from firebase: ", er);
  }
}
