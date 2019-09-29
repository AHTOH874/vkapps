import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import { YMaps} from 'react-yandex-maps';

import { PanelHeaderBack } from '@vkontakte/vkui';
import { TabsItem, Tabs, FixedLayout } from '@vkontakte/vkui';
import Map from './Map'

const mapStyle = {
  zIndex: 1000,
  transition: 'all 0.3s',
  top: '43px'
}


// const Route = ({ ymaps, points = [
//   'Москва, улица Крылатские холмы',
//   {
//     point: 'Москва, метро Молодежная',
//     type: 'viaPoint',
//   },
//   [55.731272, 37.447198],
//   'Москва, метро Пионерская',
// ], params, map }) => {
//   ymaps.route(points, params).then(function (route) {
//     route.getPaths().options.set({
//       // в балуне выводим только информацию о времени движения с учетом пробок
//       balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
//       // можно выставить настройки графики маршруту
//       strokeColor: '0000ffff',
//       opacity: 0.9
//     });
//     console.log(route);

//     map.geoObjects.add(route);
//   });
//   return null
// }
// const Bac = withYMaps(Route, true, ['route'])


const MapWrapper = ({ id, go, selectedElem }) => {
  const [map, setMap] = useState(null)
  const [places, setPlaces] = useState([])
  const [myCoords, setCoords] = useState([55.75, 37.57])
    const [activeTab, setAciveTab] = useState('placemarks')
  return (
    <Panel id={id} >
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>Карта</PanelHeader>
      <div style={mapStyle}>
        <YMaps query={{ apikey: 'c382875c-7dad-4323-95f9-afe52aae411e' }}>
          <Map/>
        </YMaps>
      </div>
      <FixedLayout vertical="bottom">
        <Tabs>
          <TabsItem
            onClick={() => setAciveTab('placemarks')}
            selected={activeTab === 'placemarks'}
          >Точки сбора</TabsItem>
          <TabsItem
            onClick={() => setAciveTab('routes')}
            selected={activeTab === 'routes'}
          >Маршруты</TabsItem>
        </Tabs>
      </FixedLayout>
    </Panel>
  )
}

MapWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default MapWrapper;