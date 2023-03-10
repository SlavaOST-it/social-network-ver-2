import React from 'react';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {Snackbar, SnackbarCloseReason} from "@material-ui/core";
import {setAppErrorAC} from "../../../bll/reducers/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
};
