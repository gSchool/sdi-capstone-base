import React from "react"
import { Div } from '../_styles/_global'
import Lottie from 'lottie-react'
import loader from '../_assets/lotties/loader.json'

const PageLoader = () => {

  const style = {
    height: 'auto',
    width: '6rem',
  }

  return (
    <div id="page">
      <Div flex column fills centerchildren>
        <Lottie style={style} animationData={loader} loop={true} />
      </Div>
    </div>
  )
}

export default PageLoader