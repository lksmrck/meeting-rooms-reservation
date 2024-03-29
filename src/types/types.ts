import { ReactNode,  RefObject } from "react"


//roomsMeetingsFetch
export type BlocksBreakdown = {
    room: number | string ,
    block: number
  }
  export type Meeting = {
    id: number,
    name: string,
    room: number | string,
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

export type UserTypeInLS = {uid: string, email:string 
  , company:string, rights:string}

export type UserType = { id?: string, company:string, creationDate: string, email:string, name:string, surname: string,  password: string, rights: string  }

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


export type Feature = {
  name:string; text: string; textAuthor:string, icon: string 
}

export type CarouselSlide = {
title: string,
person: string,
company: string,
image: string
}

export type ContactFormData = {
firstName: string,
lastName: string,
email: string,
message: string

}

export type LandingRefsObject = {
featuresRef: RefObject<HTMLDivElement>
stepsRef: RefObject<HTMLDivElement>
referencesRef: RefObject<HTMLDivElement>
contactRef: RefObject<HTMLDivElement>
  
}

export type FooterLinkObject = {
  name: string, ref: RefObject<HTMLDivElement>
}


