import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import CATEGORY_BY_ID from '../../graphql/categoryById.graphql'
import { DataList, DataQuery } from '../../typings/type'
const CSS_HANDLES = [
    "selectListLi"
]
interface Props {
    dataSelect: DataList
    onSelect: (data: DataList, href?:string) => void
}
export const ItemSelectGraphql = ({dataSelect, onSelect}:Props) => {
    const handles = useCssHandles(CSS_HANDLES)
    const [dataQuery, setDataQuery] = useState<DataQuery>()
    const { loading, data, error } = useQuery(
        CATEGORY_BY_ID,
        {
            fetchPolicy: "network-only",
            variables: { id: dataSelect.id },
        }
    );
    useEffect(() => {
      if(!loading && data){
        setDataQuery(data.category)
      }
    }, [data, loading, error])
    const setSelectData = () =>{
        if(dataQuery?.name){
            let newData = {
                text: dataSelect.text !== "" ? dataSelect.text : dataQuery?.name,
                id:dataSelect.id
                }
            onSelect(newData, dataQuery?.href)
        }else{
            onSelect(dataSelect, dataQuery?.href)
        }
    }
  return (
    <li className={handles.selectListLi} onClick={setSelectData}>
        {dataSelect.text !== "" ? dataSelect.text : dataQuery?.name}
    </li>
  )
}
