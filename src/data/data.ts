import refOne from "../assets/carouselPics/refOne.png"
import refTwo from "../assets/carouselPics/refTwo.png"
import refThree from "../assets/carouselPics/refThree.png"
import love from "../assets/love.svg"
import simple from "../assets/featuresPics/simple.svg"
import fast from "../assets/featuresPics/fast.svg"
import easy from "../assets/featuresPics/easy.svg"


export const timeBlocks = [
    {id: 1, time: "7:00 - 7:30", start: "7:00", end: "7:30"},
    {id: 2, time: "7:30 - 8:00", start: "7:30", end: "8:00" },
    {id: 3, time: "8:00 - 8:30", start: "8:00", end: "8:30" },
    {id: 4, time:  "8:30 - 9:00", start: "8:30", end: "9:00"},
    {id: 5, time: "9:00 - 9:30", start: "9:00", end: "9:30"},
    {id: 6, time:"9:30 - 10:00", start: "9:30", end: "10:00" }, 
    {id: 7, time: "10:00 - 10:30", start: "10:00", end: "10:30"},
    {id: 8, time: "10:30 - 11:00", start: "10:30", end: "11:00"},
    {id: 9, time: "11:00 - 11:30", start: "11:00", end: "11:30"},
    {id: 10, time: "11:30 - 12:00", start: "11:30", end: "12:00"},
    {id: 11, time: "12:00 - 12:30", start: "12:00", end: "12:30"},
    {id: 12, time: "12:30 - 13:00", start: "12:30", end: "13:00"},
    {id: 13, time: "13:00 - 13:30", start: "13:00", end: "13:30"},
    {id: 14, time: "13:30 - 14:00", start: "13:30", end: "14:00"},
    {id: 15, time: "14:00 - 14:30", start: "14:00", end: "14:30"},
    {id: 16, time: "14:30 - 15:00", start: "14:30", end: "15:00"},
    {id: 17, time: "15:00 - 15:30", start: "15:00", end: "15:30"},
    {id: 18, time: "15:30 - 16:00", start: "15:30", end: "16:00"},
    {id: 19, time: "16:00 - 16:30", start: "16:00", end: "16:30"},
    {id: 20, time: "16:30 - 17:00", start: "16:30", end: "17:00"},
    {id: 21, time: "17:00 - 17:30", start: "17:00", end: "17:30"},
    {id: 22, time: "17:30 - 18:00", start: "17:30", end: "18:00"},
    {id: 23, time: "18:00 - 18:30", start: "18:00", end: "18:30"},
    {id: 24, time: "18:30 - 19:00", start: "18:30", end: "19:00"}]


export const roomData= [
    { block: 1, start: "7:00", end: "7:30", reserved: false}, 
    { block: 2, start: "7:30", end: "8:00", reserved: false},
    { block: 3, start: "8:00", end: "8:30", reserved: false},
    { block: 4, start: "8:30", end: "9:00", reserved: false},
    { block: 5, start: "9:00", end: "9:30", reserved: false},
    { block: 6, start: "9:30", end: "10:00", reserved: false},
    { block: 7, start: "10:00", end: "10:30", reserved: false},
    { block: 8, start: "10:30", end: "11:00", reserved: false},
    { block: 9, start: "11:00", end: "11:30", reserved: false},
    { block: 10, start: "11:30", end: "12:00", reserved: false},
    { block: 11, start: "12:00", end: "12:30", reserved: false},
    { block: 12, start: "12:30", end: "13:00", reserved: false},
    { block: 13, start: "13:00", end: "13:30", reserved: false},
    { block: 14, start: "13:30", end: "14:00", reserved: false},
    { block: 15, start: "14:00", end: "14:30", reserved: false},
    { block: 16, start: "14:30", end: "15:00", reserved: false},
    { block: 17, start: "15:00", end: "15:30", reserved: false},
    { block: 18, start: "15:30", end: "16:00", reserved: false},
    { block: 19, start: "16:00", end: "16:30", reserved: false},
    { block: 20, start: "16:30", end: "17:00", reserved: false},
    { block: 21, start: "17:00", end: "17:30", reserved: false},
    { block: 22, start: "17:30", end: "18:00", reserved: false},
    { block: 23, start: "18:00", end: "18:30", reserved: false},
    { block: 24, start: "18:30", end: "19:00", reserved: false},
    ]

    export const carouselSlides = [
        {
          title: "My life started to be much easier, since I am using this app.",
          person: "Will Crates",
          company: "Microhard",
          image: refThree,
        },
        {
          title: "If I could marry this app, I would do it!",
          person: "Albert Zweistein",
          company: "Masaryk University",
          image: refTwo,
        },
        { 
          title: "My husband spends more time home, just to play with this app. Thank you!", 
          person: "Mary the Lunchlady", 
          company: "Wife", 
          image: refOne 
        },
      ];


      export const featureBoxes = [
        {
          name: "Simple",
          text: '"Simplicity is the ultimate sophistication."',
          textAuthor: "Leonardo da Vinci",
          icon: simple,
        },
        {
          name: "Fast",
          text: '"I feel the need... the need for speed."',
          textAuthor: "Tom Cruise",
          icon: fast,
        },
        {
          name: "Easy to use",
          text: '"Everything is hard before it is easy."',
          textAuthor: "Wolfgang Goethe",
          icon: easy,
        },
      ];


    export const stepsButtons = [
        { id: 1, clicked: true, text: "Pick a date",  followingText: "Try" },
        { id: 2, clicked: false, text: "Pick a room",  followingText: "It" },
        { id: 3, clicked: false, text: "Pick a time and book it",  followingText: "On" },
        { id: 4, clicked: false, text: "View created meetings",  followingText: "Your"},
        { id: 5, clicked: false, text: "Edit or delete meeting if needed",  followingText: "Own" },
        { id: 6, clicked: false, text: "Add room or user if you are admin", followingText: love },
      ];
