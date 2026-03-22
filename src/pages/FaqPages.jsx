import React, { useEffect } from 'react'

import { getFaq } from '../Redux/ActionCreators/FaqActionCreator'
import { useDispatch, useSelector } from 'react-redux'
export default function FaqPages() {

  let FaqStateData = useSelector(state => state.FaqStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => dispatch(getFaq()))()
  }, [FaqStateData.length])



  return (
    <>
    <div className="container-fluid">
      <div classNAme="container my-5">
          <div class="accordion" id="accordionExample">
       {
        FaqStateData.filter(x=>x.status).map((item,index)=>{
          return  <div class="accordion-item" key={item.id}>
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="true" aria-controls="collapseOne">
           {item.question}
            </button>
          </h2>
          <div id={`collapse${item.id}`}class={`accordion-collapse collapse ${index===0?'show':''}`} data-bs-parent="#accordionExample">
            <div class="accordion-body">
             {item.answer}
            </div>
          </div>
        </div>
        })
       }
        
      </div>
      </div>
    </div>
    </>
  )
}
