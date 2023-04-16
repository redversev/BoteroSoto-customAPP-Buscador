export interface DataQuery {
    href:string
    name:string
}
export interface DepartmentList {
  showBrand: ShowBrand;
  showAttribute: ShowAttribute;
  showType: ShowType;
}

export interface ShowType {
  additionalDef?: string;
  departmentList?: DepartmentList[];
}

interface DepartmentList {
  departmentId: string;
  departmentName: string;
}

export interface ShowAttribute {
  additionalDef?: string;
  attributeList?: AttributeList[];
}

interface AttributeList {
  attributeOriginalName: string;
  attributeSpecificationList?: AttributeSpecificationList[];
}

interface AttributeSpecificationList {
  attributeSpecificationOriginalName: string;
}

export interface ShowBrand {
  additionalDef?: string;
  brandList?: BrandList[];
}

interface BrandList {
  brandOriginalName: string;
}




export interface DataList {
  id:string
  text:string
}