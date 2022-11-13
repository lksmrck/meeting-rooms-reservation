import { timeBlocks } from '../../common/dummyData';

export const timeDataCalc = (selectedMeeting: any) => {
    const minBlock = Math.min(...selectedMeeting.blocks)
    const maxBlock = Math.max(...selectedMeeting.blocks)

    const startObj = timeBlocks.find((block: any) =>  block.id == minBlock)
    const endObj = timeBlocks.find((block: any) =>  block.id == maxBlock   )
       
    const meetingLength = (maxBlock - minBlock) * 0.5 + 0.5

    return {start: startObj?.start, end: endObj?.end , meetingLength}
  
}