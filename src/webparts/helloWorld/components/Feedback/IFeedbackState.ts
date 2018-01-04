// import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface IFeedbackSates {
    categories: Categories
    // subcategories:IOption[];
  }
export interface Categories {
    value : IOption[]
  }
  export interface IOption{
    Title:string;
    Id:string;
  }
  