import {AppDispatchType, RootState} from "../../bll/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector