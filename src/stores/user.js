import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router";
import { useDatabaseStore } from "./database";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.log(error.code);
        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.log(error.code);
        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      const databaseStore = useDatabaseStore();
      databaseStore.$reset();
      try {
        await signOut(auth);
        this.userData = null;
        console.log("User logged out");
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = { email: user.email, uid: user.uid };
            } else {
              this.userData = null;
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsuscribe();
      });
    },
  },
});
