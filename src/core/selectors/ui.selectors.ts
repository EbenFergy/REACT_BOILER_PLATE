import { RootState } from "../../store";

export const selectHasNavBar = (state:RootState) => state.uIReducer.hasNavbar;
export const selectFixedNavbar = (state:RootState) => state.uIReducer.navFixed;
export const selectHasFooter = (state:RootState) => state.uIReducer.hasFooter;
export const selectNavbarColor = (state:RootState) => state.uIReducer.navbarColor;