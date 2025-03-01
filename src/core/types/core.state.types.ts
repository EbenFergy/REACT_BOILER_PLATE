
export interface User{
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    rank:string;
    isActive?:boolean;
    createdAt: Date;
    updatedAt: Date;
    authorities: string[]
}
  

export interface CoreStateType{
    previousPage:string;
    isAuthenticated?:boolean;
    user?:User;
    snackbar?:{type:"error"|"success", message:string}
}


export interface UIInitialStateType {
    scrollIcon: boolean;
    openMenu: boolean;
    hasNavbar: boolean;
    hasFooter: boolean;
    navFixed: boolean;
    navbarColor?: string;
  }