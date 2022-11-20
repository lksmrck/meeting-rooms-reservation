import { timeBlocks } from '../../common/dummyData';
import { Meeting, TimeBlock } from '../../types/types';

export const timeDataCalc = (selectedMeeting: Meeting) => {
    const minBlock = Math.min(...selectedMeeting.blocks)
    const maxBlock = Math.max(...selectedMeeting.blocks)

    const startObj = timeBlocks.find((block: TimeBlock) =>  block.id == minBlock)
    const endObj = timeBlocks.find((block: TimeBlock) =>  block.id == maxBlock   )
       
    const meetingLength = (maxBlock - minBlock) * 0.5 + 0.5

    return {start: startObj?.start, end: endObj?.end , meetingLength}
  
}