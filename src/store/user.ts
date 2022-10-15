import { defineStore } from "pinia";
import { userInfo } from "@/typings/types";
const useUserStore = defineStore("user",{
    state: () => ({
        user: {},
        token: ''
    }),
    actions: {
        setUser(data: userInfo) {
            this.user = data
        } 
    }
})

export default useUserStore