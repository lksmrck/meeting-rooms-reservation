import { roomData } from '../common/dummyData';

//Funkce na převedení start time a end time na array s bloky (např. 7:30 - 8:30 bude return value [2, 3])
export const timeToBlocks = (time: any) => { //
//Start Time Block
const startBlock = roomData.findIndex((data: any) => data.start == time.start) + 1
//EndTimeBlock
const endBlock = roomData.findIndex((data: any) => data.end == time.end) + 1

let preBlocks = [startBlock, endBlock]
let i = endBlock - startBlock - 1 

for (i; i > 0 ; i--) {
    preBlocks.push(endBlock-i)
}

//To remove duplicities when picking exactly 1 block
const blocks = preBlocks.filter((item, pos)=> {
    return preBlocks.indexOf(item) == pos
})
//Sorting
blocks.sort ((a, b) => {
    return a-b
})
return blocks

}