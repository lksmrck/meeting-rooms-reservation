export type Room = {
    id: number,
    companyID: number,
    companyName: string,
    roomData: {
        room: number,
        block: number,
        time: string,
        reserved: boolean
    }
}

export type User = {
    id: number,
    companyID: number,
    companyName: number,
    rights: "ADMIN" | "USER" | "POWERUSER"
}

export type Reservation = {
    companyID: number,
    companyName: string,
    creatorID: number, //user ID
    creatorName: string,
    attendantsID: number, //ucastnici - muzou se lisit od creatora (schuzku vytvari asistentka), ale budou moct menit schuzku.
    attendantsName: string,
    creationDate: Date,
    roomID: number,
    blocks: number | number[]
}

