
/**
 * T, is core type
 * p, payload type
 */
export interface EditableState <T, P>{
  currentState:Record<string, T>;
  editedState:Record<string, Partial<T>>;
  payloadState:Partial<P>;
}
  
/**
 * T, is core type
 * p, payload type
 */
export interface InitialStateManagement<T, P>{
  management:EditableState<T, P>;
  loading:boolean;
}