import { EditableState } from "../types/state.types";

export const initEditableState = <T, P>(object:Record<string, T>):EditableState<T, P>=>({
    currentState: object,
    editedState: {},
    payloadState: {}
})