import {ResultCode} from "../../common/types/commonTypes";
import {useAppDispatch} from "../hooks/hooks";


export const errorUtilsSocialNetwork = (responseCode: ResultCode) => {

    if (responseCode === 0) {
        return true
    }

}