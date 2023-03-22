export interface DepartmentList {
  departmentId: string;
  departmentName: string;
  showBrand: ShowBrand;
  showAttribute: ShowAttribute;
  showType: ShowType;
}

interface ShowType {
  additionalDef: string;
  departmentList?: DepartmentList[];
}

interface DepartmentList {
  departmentId: string;
  departmentName: string;
}

interface ShowAttribute {
  additionalDef: string;
  attributeList?: AttributeList[];
}

interface AttributeList {
  attributeOriginalName: string;
  attributeSpecificationList?: AttributeSpecificationList[];
}

interface AttributeSpecificationList {
  attributeSpecificationOriginalName: string;
}

interface ShowBrand {
  additionalDef: string;
  brandList?: BrandList[];
}

interface BrandList {
  brandOriginalName: string;
}




export interface DataList {
  id:string
  text:string
}