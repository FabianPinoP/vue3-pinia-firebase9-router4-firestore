import {
  query,
  collection,
  getDocs,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { db } from "../firebaseConfig.js";
import { auth } from "../firebaseConfig.js";
import { nanoid } from "nanoid";
import router from "../router.js";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDocs: false,
  }),
  actions: {
    async getUrls() {
      if (this.documents.length !== 0) {
        return;
      }
      this.loadingDocs = true;
      try {
        const q = query(
          collection(db, "url"),
          where("user", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log("firestore response", doc.id, doc.data());
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDocs = false;
      }
    },
    async addUrl(name) {
      try {
        const objetcDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "url"), objetcDoc);
        this.documents.push({
          id: docRef.id,
          ...objetcDoc,
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async deleteUrl(id) {
      try {
        const docRef = doc(db, "url", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("No existe el doc");
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("no le pertenece ese documento");
        }
        await deleteDoc(docRef);
        this.documents = this.documents.filter((doc) => doc.id !== id);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async readUrl(id) {
      try {
        const docRef = doc(db, "url", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("No existe el doc");
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("no le pertenece ese documento");
        }

        return docSnap.data().name;
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    },
    async updateUrl(id, name) {
      try {
        const docRef = doc(db, "url", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("No existe el doc");
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("no le pertenece ese documento");
        }
        await updateDoc(docRef, {
          name: name,
        });  
        this.documents = this.documents.map(doc => doc.id === id ? ({...doc, name: name}): doc)
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
});
