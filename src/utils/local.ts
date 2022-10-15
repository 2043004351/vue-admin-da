export const getLocalData: any = (key: string | null) => {
    if(key) {
        return localStorage.getItem(key)
    }
    return ""
}
export const setLocalData = (key: string, data: any) => {
    localStorage.setItem("key", JSON.stringify(data))
}