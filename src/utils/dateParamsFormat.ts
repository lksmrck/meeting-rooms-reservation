
export const dateToParams = (params:string) => {
const formatedParams = params.replaceAll(".","")

return formatedParams

}
export const paramsToDate= (date: any) => {
    const day = date[0] + date[1]
    const month = date[2]+date[3]
    const year = date[4]+date[5]+date[6]+date[7] 

    const formatedDate = `${day}.${month}.${year}`
    return formatedDate
}