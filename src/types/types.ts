//roomsMeetingsFetch
export type BlocksBreakdown = {
    room: number,
    block: number
  }
  export type Meeting = {
    id: number,
    name: string,
    room: number,
    type: string,
  creator: string,
  date: string,
  guests: string[] | []
  blocks: number[]
  }
  
  export type CompanyRoom = {
    id: number,
    name: string
  }

export type User = {
    id: number,
    companyID: number,
    companyName: number,
    rights: "ADMIN" | "USER" | "POWERUSER"
}

export type RoomData = {
    block: number,
    start: string,
    end: string,
    reserved: boolean,
    selected?: boolean
    meetingBlocks?: number[]
}

export type Room = {
id: number,
name: string,
roomData: RoomData[]
}

export type Error = {
  error: boolean,
  message: string
}

export type TimeBlock = {
  id: number,
  time: string,
  start: string,
  end: string
}

export type MeetingCategory = {
  id: number,
  name: string
}