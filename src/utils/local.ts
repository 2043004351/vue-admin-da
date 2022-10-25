export const getLocalData: any = (key: string | null) => {
    if(key) {
        return window.localStorage.getItem(key)
    }
    return ""
}
export const setLocalData = (key: string, data: any) => {
    window.localStorage.setItem(key, data)
}