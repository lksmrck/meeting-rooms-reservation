//Redux action types

//Error, loading
export interface ErrorLoadingActionTypes {
    SET_ERROR: string;
    CLEAR_ERROR: string;
    START_LOADING: string;
    STOP_LOADING: string;
  
  }
  
    export interface SetError {
      type: ErrorLoadingActionTypes["SET_ERROR"];
      payload: string
    }
  
    export interface ClearError {
      type: ErrorLoadingActionTypes["CLEAR_ERROR"];
      payload?: null
    }
  
    export interface StartLoading {
      type: ErrorLoadingActionTypes["START_LOADING"];
      payload?: null
    }
  
    export interface StopLoading {
      type: ErrorLoadingActionTypes["STOP_LOADING"];
      payload?: null
    }


     //Errors
     export type ErrorLoadingActions =
     | SetError
     | ClearError
     | StartLoading
     | StopLoading