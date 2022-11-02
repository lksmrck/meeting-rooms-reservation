// Funkce na vytáhnutí dat z LS přizpůsobená Typescriptu
export const getLocalStorage = (key: string) => {
    const lsData = localStorage.getItem(key)
    let lsDataParsed 
    if (lsData !== null) {
        lsDataParsed = JSON.parse(lsData)
        return lsDataParsed
     } else {
        return null
     }
}