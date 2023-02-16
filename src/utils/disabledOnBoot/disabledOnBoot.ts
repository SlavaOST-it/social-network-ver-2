import {AppStatus} from "../../common/types/commonTypes";


export const commonDisabled = (appStatus: string)=>{
   return appStatus === AppStatus.LOADING;
}