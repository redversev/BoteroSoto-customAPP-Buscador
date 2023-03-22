import React from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
    "Button__btn"
  ]
  interface Props {
    text:string
    disable:boolean
    loading:boolean
    onClickBtn:()=> void
  }
export const Button = ({ text, disable, loading, onClickBtn }:Props) => {
const handles = useCssHandles(CSS_HANDLES)
  return (
    <button disabled={disable || loading} className={handles.Button__btn} onClick={()=>onClickBtn()}>
        {loading ? 
        <Spinner color="currentColor" size={20} /> 
        : text }
    </button>
  )
}
