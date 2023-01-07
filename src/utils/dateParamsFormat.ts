//return format DD.MM.YYYY
export const dateFormatter = (date: Date) => {
let day: string | number  = date.getDate()
let month: string | number  = date.getMonth() +1
let year = date.getFullYear()

if(day<10) day="0" + day
if (month<10) month = "0" + month

const modifiedDate = day + "." + month + "." + year

return modifiedDate
}


//return format DDMMYYYY
export const dateToParams = (params:string) => {

const formatedParams = params.replaceAll(".","")

return formatedParams

}

//return format DD.MM.YYYY
export const paramsToDate= (date: string) => {
    const day = date[0] + date[1]
    const month = date[2]+date[3]
    const year = date[4]+date[5]+date[6]+date[7] 

    const formatedDate = `${day}.${month}.${year}`
    return formatedDate
}