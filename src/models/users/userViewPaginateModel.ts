import { UserViewModel } from "./userViewModel"

export type UserViewPagimateModel = {
    pagesCount: number,
    pageSize: number,
    page: number,
    totalCount: number,
    items: UserViewModel[]
}


