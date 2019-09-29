import React from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import ReactSVG from 'react-svg';

import PaperSVG from '../../icons/Paper.svg'
import PaperSVG_act from '../../icons/Paper_act.svg'
import EatSVG from '../../icons/Eat.svg'
import EatSVG_act from '../../icons/Eat_act.svg'
import PlasticSVG from '../../icons/Plastic.svg'
import PlasticSVG_act from '../../icons/Plastic_act.svg'
import ElectroSVG from '../../icons/Electro.svg'
import ElectroSVG_act from '../../icons/Electro_act.svg'
import LampsSVG from '../../icons/Lamps.svg'
import LampsSVG_act from '../../icons/Lamps_act.svg'
import BatterySVG from '../../icons/Battery.svg'
import BatterySVG_act from '../../icons/Battery_act.svg'
import Nonferrous_metalSVG from '../../icons/Nonferrous_metal.svg'
import Nonferrous_metalSVG_act from '../../icons/Nonferrous_metal_act.svg'
import Ferrous_metalSVG from '../../icons/Ferrous_metal.svg'
import Ferrous_metalSVG_act from '../../icons/Ferrous_metal_act.svg'
import GlassSVG from '../../icons/Glass.svg'
import GlassSVG_act from '../../icons/Glass_act.svg'
import Household_chemicalsSVG from '../../icons/Household_chemicals.svg'
import Household_chemicalsSVG_act from '../../icons/Household_chemicals_act.svg'
import DevicesSVG from '../../icons/Devices.svg'
import DevicesSVG_act from '../../icons/Devices_act.svg'
import TextileSVG from '../../icons/Textile.svg'
import TextileSVG_act from '../../icons/Textile_act.svg'

import './Mycor.css'
import { Button, Group } from '@vkontakte/vkui';


// const typeIcon = { textAlign:'center', width:' 50%' }
// const center = { textAlign: 'center', display:'Block' }

 
const TypeIcon = ({svg, svgActive, active, name, ...props})=> (
  <div className="type-ico" {...props}>
    <ReactSVG src={svg} style={{ textAlign: 'center', margin: 'auto' }}></ReactSVG>
    <p>{name}</p>
  </div>
)


const Mycor = ({ id, go, selectElem, selectedElem}) => {


  const changeEl = (e) =>{
    console.log(e.currentTarget.dataset.id);
    let b = [...selectedElem]
    if (selectedElem[e.currentTarget.dataset.id]) 
      b[e.currentTarget.dataset.id]=0
    else
      b[e.currentTarget.dataset.id]=1

    selectElem(b)
  } 
  const da = [[PaperSVG_act, PaperSVG, "Макулатура"], 
    [EatSVG_act, EatSVG, "Пищевые отходы"], 
    [PlasticSVG_act, PlasticSVG, "Пластиковые изделия"], 
    [ElectroSVG_act, ElectroSVG, "Бытовая техника"], 
    [LampsSVG_act, LampsSVG, "Лампы"], 
    [BatterySVG_act, BatterySVG, "Элементы питания"], 
    [Nonferrous_metalSVG_act, Nonferrous_metalSVG, "Цветные металлы"], 
    [Ferrous_metalSVG_act, Ferrous_metalSVG, "Чёрные металлы"], 
    [GlassSVG_act, GlassSVG, "Стекло"], 
    [Household_chemicalsSVG_act, Household_chemicalsSVG, "Бытовая химия и яды"], 
    [DevicesSVG_act, DevicesSVG, "Мобильные устройства"], 
    [TextileSVG_act, TextileSVG, "Текстиль"]
  ]

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home"/>}>Отходы</PanelHeader>
      <Group title="Выберите категорию отходов">
        {/* <h3 style={center}>Выберите категорию отходов</h3> */}
        <div className="flex-container" style={{display:'flex', flexWrap:'wrap', padding: '2%', justifyContent:'center'}}>
          {
            selectedElem.map((v, i) => <TypeIcon onClick={changeEl} data-id={i} key={i} svg={v?da[i][0]:da[i][1]} name={da[i][2]}/>) }
        </div>
        <Div style={{ display: 'flex' }}>
          <Button size="l" onClick={() => selectElem([1,1,1,1,1,1,1,1,1,1,1,1])} stretched level="secondary" style={{ marginRight: 8 }}>Выбрать всё</Button>
          <Button size="l" onClick={go} data-to="map" stretched >Показать на карте</Button>
        </Div>
        
      </Group>
    </Panel>
  )
}

export default Mycor