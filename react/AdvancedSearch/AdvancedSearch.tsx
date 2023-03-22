import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import {useRuntime} from 'vtex.render-runtime'
import { DataList, DepartmentList } from '../typings/type'
import { Button } from './atom/Button'
import { Select } from './atom/Select'

const CSS_HANDLES = [
  "AdvancedSearch__content"
]
interface Props {
  departmentList?: DepartmentList[]
}
const initial = {
  id: "0",
  text: "Selecione una opcion"
}

const removeSpecialCharacter = (str:string) => {
	const accents:any = {
    'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U',
    'à':'a','è':'e','ì':'i','ò':'o','ù':'u','À':'A','È':'E','Ì':'I','Ò':'O','Ù':'U',
    'ä':'a','ë':'e','ï':'i','ö':'o','ü':'u','Ä':'A','Ë':'E','Ï':'I','Ö':'O','Ü':'U',
    '/':'-','!':'-','\\':'-','#':'-','{':'-','}':'-','(':'-',')':'-','[':'-',']':'-',
    '$':'-','?':'-','¿':'-',' ':'-',',':'','ñ':'n','Ñ':'n'
  };
	return str.split('').map( letter => accents[letter] || letter).join('').toString().toLowerCase();	
}
export const AdvancedSearch 
= ({departmentList}:Props) => {
  const { navigate } = useRuntime();
  const handles = useCssHandles(CSS_HANDLES)
  const [departmentData, setDepartmentData] = useState<DataList[]>([])
  const [departmentSelect, setDepartmentSelect] = useState<DataList>()
  const [departmentSelectDisabled, setDepartmentSelectDisabled] = useState(true)
  const [selectTwo, setSelectTwo] = useState<DataList[]>([])
  const [selectTwoSelect, setSelectTwoSelect] = useState<DataList>()
  const [selectTwoDisabled, setSelectTwoDisabled] = useState(true)
  const [selectThree, setSelectThree] = useState<DataList[]>([])
  const [selectThreeSelect, setSelectThreeSelect] = useState<DataList>()
  const [selectThreeDisabled, setSelectThreeDisabled] = useState(true)
  const [selectThreeCategory, setSelectThreeCategory] = useState(false)
  const [urlToGo, setUrlToGo] = useState("")
  const [urlDepartmentSelect, setUrlDepartmentSelect] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  useEffect(() => {
    const data:DataList[] = departmentList ? departmentList?.map((department)=>{
      return {
        id: department.departmentId,
        text: department.departmentName
      }
    }) : []
    data.unshift(initial)
    setDepartmentData(data)
    setDepartmentSelect(initial)
    setDepartmentSelectDisabled(false)
    setSelectTwoDisabled(true)
    setSelectThreeDisabled(true)
    setBtnDisabled(true)
    setBtnLoading(false)
  }, [departmentList])
  const selectDepartmentData = (departmentSelect: DataList, href?:string)=>{
    if(href){
      setUrlDepartmentSelect(href)
    }
    if(departmentSelect.id!=="0"){
      const departmentFind = departmentList?.find((department)=>department.departmentId===departmentSelect.id)
      const selectTwo:DataList[] = [initial]
      if(departmentFind?.showBrand.additionalDef==="si"){
        selectTwo.push({
          id:"brand",
          text:"Marca"
        })
      }
      if(departmentFind?.showType.additionalDef==="si"){
        selectTwo.push({
          id:"type",
          text:"Tipo"
        })
      }
      if(departmentFind?.showAttribute.additionalDef==="si"){
        departmentFind?.showAttribute.attributeList?.map((attribute)=>{
          selectTwo.push({
            id: attribute.attributeOriginalName,
            text: attribute.attributeOriginalName
          })
        })
      }
      setDepartmentSelect(departmentSelect)
      setSelectTwo(selectTwo)
      setSelectTwoSelect(initial)
      setSelectTwoDisabled(false)
      setSelectThreeDisabled(true)
    }else{
      setSelectTwoDisabled(true)
      setSelectThreeDisabled(true)
    }
    setBtnDisabled(true)
  }
  const selectSelectTwo = (selectTwoSelect: DataList) =>{
    if(selectTwoSelect.id!=="0"){
      let data:DataList[] = []
      if(selectTwoSelect.id==="type"){
        const departmentFind = departmentList?.find((department)=>department.departmentId===departmentSelect?.id)
        data = departmentFind?.showType?.departmentList ? departmentFind?.showType?.departmentList?.map((department)=>{
            return {
              id: department.departmentId,
              text: department.departmentName
            }
          }) : []
        data.unshift(initial)
        setSelectThreeCategory(true)
      }else if(selectTwoSelect.id==="brand"){
        const departmentFind = departmentList?.find((department)=>department.departmentId===departmentSelect?.id)
        data = departmentFind?.showBrand?.brandList ? departmentFind?.showBrand?.brandList?.map((brand)=>{
            return {
              id: brand.brandOriginalName,
              text: brand.brandOriginalName
            }
          }) : []
        data.unshift(initial)
        setSelectThreeCategory(false)
      }else{
        const departmentFind = departmentList?.find((department)=>department.departmentId===departmentSelect?.id)
        const attributeSelect =departmentFind?.showAttribute.attributeList?.find((attribute)=>attribute.attributeOriginalName===selectTwoSelect.id)
        data = attributeSelect?.attributeSpecificationList ? attributeSelect?.attributeSpecificationList?.map((attributeSpecification)=>{
          return {
            id: attributeSpecification.attributeSpecificationOriginalName,
            text: attributeSpecification.attributeSpecificationOriginalName
          }
          }) : []
        data.unshift(initial)
        setSelectThreeCategory(false)
      }
      setSelectThree(data)
      setSelectTwoSelect(selectTwoSelect)
      setSelectThreeSelect(initial)
      setSelectThreeDisabled(false)
    }else{
      setSelectThreeDisabled(true)
      setSelectThreeCategory(false)
    }
    setBtnDisabled(true)
  }
  const onSelectThree = (selectThreeSelect: DataList, href?:string) =>{
    if(selectThreeSelect.id!=="0"){
      setSelectThreeSelect(selectThreeSelect)
      if(href){
        setUrlToGo(href)
        setBtnDisabled(false)
      }else{
        const urlSelect = removeSpecialCharacter(selectThreeSelect.id);
        const urlSelect2 = selectTwoSelect?.id ? removeSpecialCharacter(selectTwoSelect.id) : "";
        setUrlToGo(`${urlDepartmentSelect}/${urlSelect}?initialMap=c,c&initialQuery=${urlDepartmentSelect}&map=category-1,category-2,${
            selectTwoSelect?.id==="brand" ? selectTwoSelect?.id : urlSelect2}`)
        setBtnDisabled(false)
      }
    }else{
      setBtnDisabled(true)
    }
  }
  const clickGoToUrl = () =>{
    setBtnLoading(true)
    navigate({to: urlToGo});
  }
  return (
    <div className={handles.AdvancedSearch__content}>
      <Select dataList={departmentData} onSelectItem={selectDepartmentData} isCategory itemSelect={departmentSelect} disabled={departmentSelectDisabled} />
      <Select dataList={selectTwo} onSelectItem={selectSelectTwo} itemSelect={selectTwoSelect} disabled={selectTwoDisabled}/>
      <Select dataList={selectThree} onSelectItem={onSelectThree} itemSelect={selectThreeSelect} isCategory={selectThreeCategory} disabled={selectThreeDisabled}/>
      <Button disable={btnDisabled} loading={btnLoading} text={"Buscar"} onClickBtn={clickGoToUrl}/>
    </div>
  )
}
AdvancedSearch.schema = {
  title: 'Advanced Search',
  description: 'Advanced Search',
  type: 'object',
  properties: {
    departmentList: {
      title: "lista de departamentos",
      type: "array",
      items: {
          title: "departamento",
          type: "object",
          properties: {
            departmentId: {
                  title: "Id del departamento",
                  description:
                      "Escriba el id del departamento ejemplo: 9296",
                  type: "string",
                  default: "9296",
                },
                departmentName: {
                  title: "Escriba el nombre a mostrar",
                  description:
                      "Puede escribir el nombre que se va a mostrar o dejarlo en blanco y se mostrara el nombre que trae el departamiento",
                  type: "string",
                  default: "",
              },
            showBrand: {
                title: "",
                type: "object",
                properties: {
                    additionalDef: {
                        title: "Mostrar en selector marca",
                        enum: ["si", "no"],
                        type: "string",
                        default: "no"
                    },
                },
                dependencies: {
                  additionalDef: {
                      oneOf: [
                          {
                              properties: {
                                  additionalDef: {
                                      enum: [
                                          "si"
                                      ]
                                  },
                                  brandList: {
                                    title: "lista de marca",
                                    type: "array",
                                    items: {
                                        title: "atributo",
                                        type: "object",
                                        properties: {
                                          brandOriginalName: {
                                                title: "nombre del marca",
                                                description:
                                                    "Escriba el nombre de la marca tal como se ve en el admin ejemplo: Donaldson",
                                                type: "string",
                                                default: "Donaldson",
                                              },
                                          }
                                        },
                                        default: [],
                                    }
                              }
                          },
                          {
                            properties: {
                                additionalDef: {
                                    enum: [
                                        "no"
                                    ]
                                },
                            }
                        }
                        ]
                        }
                      }
              },
            showAttribute: {
                title: "",
                type: "object",
                properties: {
                    additionalDef: {
                        title: "Mostrar atributo",
                        enum: ["si", "no"],
                        type: "string",
                        default: "no"
                    },
                },
                dependencies: {
                  additionalDef: {
                      oneOf: [
                          {
                              properties: {
                                  additionalDef: {
                                      enum: [
                                          "si"
                                      ]
                                  },
                                  attributeList: {
                                    title: "lista de atributos",
                                    type: "array",
                                    items: {
                                        title: "atributo",
                                        type: "object",
                                        properties: {
                                          attributeOriginalName: {
                                                title: "nombre del atributo",
                                                description:
                                                    "Escriba el atributo tal como se ve en el admin ejemplo: INDICE DE CARGA",
                                                type: "string",
                                                default: "INDICE DE CARGA",
                                              },
                                            attributeSpecificationList: {
                                              title: "lista de atributos especificos",
                                              type: "array",
                                              items: {
                                                  title: "atributo",
                                                  type: "object",
                                                  properties: {
                                                    attributeSpecificationOriginalName: {
                                                          title: "nombre del atributo especifico",
                                                          description:
                                                              "Escriba el atributo tal como se ve en el admin ejemplo: 152/149",
                                                          type: "string",
                                                          default: "152/149",
                                                        },
                                                    }
                                                  },
                                                  default: [],
                                              }
                                          }
                                        },
                                        default: [],
                                    }
                              }
                          },
                          {
                            properties: {
                                additionalDef: {
                                    enum: [
                                        "no"
                                    ]
                                },
                            }
                        }
                        ]
                        }
                      }
              },
              showType: {
                title: "",
                type: "object",
                properties: {
                    additionalDef: {
                        title: "Mostrar tipo",
                        enum: ["si", "no"],
                        type: "string",
                        default: "no"
                    },
                },
                dependencies: {
                  additionalDef: {
                      oneOf: [
                          {
                              properties: {
                                  additionalDef: {
                                      enum: [
                                          "si"
                                      ]
                                  },
                                  departmentList: {
                                    title: "lista de departamentos",
                                    type: "array",
                                    items: {
                                        title: "departamento",
                                        type: "object",
                                        properties: {
                                          departmentId: {
                                                title: "Id del departamento",
                                                description:
                                                    "Escriba el id del departamento ejemplo: 9296",
                                                type: "string",
                                                default: "9296",
                                              },
                                              departmentName: {
                                                title: "Escriba el nombre a mostrar",
                                                description:
                                                    "Puede escribir el nombre que se va a mostrar o dejarlo en blanco y se mostrara el nombre que trae el departamiento",
                                                type: "string",
                                                default: "",
                                            },
                                          }
                                        },
                                        default: [],
                                    }
                              }
                          },
                          {
                            properties: {
                                additionalDef: {
                                    enum: [
                                        "no"
                                    ]
                                },
                            }
                        }
                        ]
                        }
                      }
              }
          },
      },
      default: [],
    }
  }
}
