import React, { useState, useEffect, useRef } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { DataList } from '../../typings/type'
import { ItemSelectGraphql } from './ItemSelectGraphql'

export const useOutsideClick = (
  ref: React.MutableRefObject<HTMLDivElement>,
  callback: Function
) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

  useEffect(() => {
    //@ts-ignore
    document.addEventListener('click', handleClick)
    return () => {
      //@ts-ignore
      document.removeEventListener('click', handleClick)
    }
  })
}
const ImgArrowSelectDown = () =>(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="15"
    height="10"
  >
    <path color='currentColor' xmlns="http://www.w3.org/2000/svg" d="M259.54,385l251-251A5,5,0,0,0,507,125.5H5A5,5,0,0,0,1.46,134l251,251A5,5,0,0,0,259.54,385Z"/>
  </svg>
  )

const CSS_HANDLES = [
  "selectContent",
  "selectBtn",
  "selectContentList",
  "selectListUl",
  "selectListLi"
]
interface Props{
  dataList: DataList[]
  onSelectItem: (data: DataList, href?:string) => void
  itemSelect: DataList | undefined
  isCategory?:boolean
  disabled?:boolean
}

export const Select = ({dataList, onSelectItem, itemSelect, isCategory, disabled}:Props) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [show, setShow] = useState(false)
  const refOutside: React.MutableRefObject<HTMLDivElement> = useRef(
    {} as HTMLDivElement
  )
  useOutsideClick(refOutside, () => {
    setShow(false)
  })
  const onSelect = (data: DataList, href?:string) => {
    onSelectItem(data, href)
    setShow(false)
  }
  return (
    <div ref={refOutside} className={handles.selectContent}>
      <button className={handles.selectBtn} onClick={() => setShow(!show)} disabled={disabled}>
      {disabled ? <div></div> :itemSelect?.text} <ImgArrowSelectDown />
      </button>
      <div
        className={applyModifiers(
          handles.selectContentList,
          show ? 'show' : ''
        )}
      >
        <ul className={handles.selectListUl}>
          {dataList.map((dataSelect)=>{
            return isCategory?
                    <ItemSelectGraphql dataSelect={dataSelect} onSelect={onSelect}/>
                  : <li key={dataSelect.id} className={handles.selectListLi} onClick={() => onSelect(dataSelect)}>
                      {dataSelect.text}
                    </li>
          })}
        </ul>
      </div>
    </div>
  )
}
