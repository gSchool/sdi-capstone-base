import React from "react"
import { Fix } from '../_styles/_global'
import Lottie from 'lottie-react'
import loader from '../_assets/lotties/loader.json'

const PageLoader = () => {

  const style = {
    height: 'auto',
    width: '6rem',
  }

  return (
    <Fix offset="4rem" lower right>
      <Lottie style={style} animationData={loader} loop={true} />
    </Fix>
  )
}

export default PageLoader