import { useAppSelector } from "../../../hooks";
import CleaningTable from "./CleaningTable";

const CleaningTableContainer = () => {
    const { cleaningSchedule } = useAppSelector(state => state.cleaningReducer);

    return <CleaningTable cleaningSchedule={cleaningSchedule} 
                          weekday={new Date().toLocaleDateString('en-EN', { weekday: 'long' })} />
}

export default CleaningTableContainer;