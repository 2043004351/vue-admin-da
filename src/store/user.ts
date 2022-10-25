import { defineStore } from "pinia";
import { userInfo, userFrom } from "@/typings/types";
import { login, logout } from "@/api/login";
import { setLocalData } from "@/utils/local";
import { resolve } from "path";
import { rejects } from "assert";
const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    permissions: [] as any,
  }),
  actions: {
    setUser(data: userInfo) {
      this.user = data;
    },
    login(params: userFrom) {
      return new Promise<void>((resolve, rejects) => {
        login(params)
          .then((response: any) => {
            if (response.code === 200) {
              setLocalData("token", response.data);
              resolve();
            }
          })
          .catch((e) => {
            rejects(e);
          });
      });
    },
    logout() {
      return new Promise<void>((resolve, rejects) => {
        logout()
          .then((response: any) => {
            if (response.code === 200) {
              this.permissions = [];
              setLocalData("token", "");
              resolve();
            }
          })
          .catch((e) => {
            rejects(e);
          });
      });
    },
  },
});

export default useUserStore;
