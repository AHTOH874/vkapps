import React, { useState} from 'react'
import { Panel, Gallery, Button } from '@vkontakte/vkui';
import ReactSVG from 'react-svg';
import ic1 from '../../icons/19_ico_LOAD-1.svg'
import ic2 from '../../icons/19_ico_LOAD-2.svg'
import ic3 from '../../icons/19_ico_LOAD-3.svg'

import './FirstRun.css'

const FirstRun = ({id, setActivePanel}) => {
  const [activeId, setActiveId ] = useState(0)
  
  if(localStorage.getItem('firstRun')){

    setActivePanel('home')
    return <Panel id={id} >{null}</Panel>
  }
  else
    return <Panel id={id} >
      <Gallery
        slideWidth="100%"
        align="center"
        slideIndex={activeId}
        onEnd={({targetIndex})=> setActiveId(targetIndex) }
        style={{ height: '70vh' }}
      >
        <div >
          <div style={{ height: '100%', width: 'auto', textAlign:'center', backgroundColor: 'rgb(247, 247, 247)' }}>

          <ReactSVG beforeInjection={svg => {
            svg.setAttribute('style', 'height: 80%;width: auto')
            }} src={ic1} wrapper="span"></ReactSVG>
            <div style={{ fontSize: '24px', margin: '25px 0px 10px'}}>Утилизируйте ваши отходы раздельно...</div>
          </div>

        </div>
        <div>
          <div style={{ height: '100%', width: 'auto', textAlign: 'center', backgroundColor: 'rgb(247, 247, 247)' }}>
            <ReactSVG beforeInjection={svg => {
              svg.setAttribute('style', 'height: 80%;width: auto')
            }} src={ic2} wrapper="span"></ReactSVG>
            <div style={{ fontSize: '24px', margin: '25px 0px 10px' }}>Копите баллы...</div>
          </div>

        </div>
        <div>
          <div style={{ height: '100%', width: 'auto', textAlign: 'center', backgroundColor: 'rgb(247, 247, 247)' }}>
            <ReactSVG beforeInjection={svg => {
              svg.setAttribute('style', 'height: 80%;width: auto')
            }} src={ic3} wrapper="span"></ReactSVG>
            <div style={{ fontSize: '24px', margin: '25px 0px 10px' }}>Покупайте ваши любимые товары выгодно...</div>
          </div>

        </div>
      </Gallery>
      <div style={{position:'absolute', bottom:'0', width:'100%',margin:'20px 0'}}>
        <Button size="xl" style={{ backgroundColor:'#1c7859', maxWidth:'70%', margin:'0 auto'}} onClick={() => {
          setActivePanel('home')
          localStorage.setItem('firstRun', true)
        }}>Понял</Button>

        <Dots index={activeId}/>
      <div>

      </div>
      </div>
    </Panel> 
}

const Dots = ({index})=>(
  <div className="dots">
    <div className={index === 0? 'actived': 'not-active'}></div>
    <div className={index === 1 ? 'actived' : 'not-active'}></div>
    <div className={index === 2 ? 'actived' : 'not-active'}></div>

  </div>
)
export default FirstRun