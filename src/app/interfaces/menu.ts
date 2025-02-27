export interface IMenuStructure
{
    id: number;
    isDropDownMenu: boolean;
    description: string;
    url: string;
    dropDownTarget: string;
    subMenuList: string[];
}