import { defineStore } from "pinia";

const useSettingStore = defineStore("setting", {
    state: () => ({
        siderBarOpen: false
    }),
    actions: {
        onClickChangeIcon() {
            this.siderBarOpen = !this.siderBarOpen
        }
    }
})

export default useSettingStore