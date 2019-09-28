import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import { YMaps, Map as YMap, Placemark, ObjectManager } from 'react-yandex-maps';
import VKConnect from '@vkontakte/vk-connect-promise'
import { PanelHeaderBack } from '@vkontakte/vkui';
const mapStyle = {
  zIndex: 1000,
  transition: 'all 0.3s',
  top: '43px',
  height: '600px',
  
}



function myFilter(mylon = 51.5289156201, mylat = 46.0209384922, coords, dist = 20) {
  const lon1 = mylon - dist / Math.abs(Math.cos(degrees_to_radians(mylat)) * 111.0),// # 1 градус широты = 111 км
    lon2 = mylon + dist / Math.abs(Math.cos(degrees_to_radians(mylat)) * 111.0),//
    lat1 = mylat - (dist / 111.0),
    lat2 = mylat + (dist / 111.0)
  return coords.filter(({ lat, long }) => (lat >= lat1 || lat <= lat2) && (long >= lon1 || long >= lon2))
}

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}


const MapHere = ({ id, go, fetchedUser }) => {
  const [places, setPlaces] = useState([])
  const [myCoords, setCoords] = useState([55.75, 37.57])
  const reff = React.createRef()
  useEffect(() => {
    VKConnect.send('VKWebAppGetGeodata').then((data) => data.aviable && setCoords([data.lat, data.long])).catch(console.error())

    fetch('https://bitbothacktoon.firebaseio.com/zavodi.json').then(v => v.json()).then((v) => {
      console.log(v);
      setPlaces(v);
      const withOutName = v.filter(Boolean).map(({ lat, long }, i) => ({ lat, long, id: i }))
      const markInRad = myFilter(myCoords[0], myCoords[1], withOutName, 4000)

      //     console.log(markInRad.map(async ({ lat, long, id }) => {
      //       let res;
      //       try {
      //         res = await fetch(`https://route.api.here.com/routing/7.2/calculateroute.json?app_id=MTaymmknkmV55afL7DS2
      // &app_code=JGbJHggGDb1KTHPVxXaGpQ&waypoint0=geo!${myCoords[0]},${myCoords[1]}&waypoint1=geo!${lat},${long}
      // &mode=fastest;bicycle`)
      //       } catch (er) {
      //         alert('Произошла ошибка')
      //         console.error(er)
      //       }
      //       res = res.json()
      //       console.log(res);

      //       return { lat, long, id, }

      //     }))
    }).catch(console.error)
    // eslint-disable-next-line no-undef
    var platform = new H.service.Platform({
      'apikey': 'ESU6InU1lFzkpCHoS8_AuD7UUACCf1_x06z0GeEdWzs'
    });
    var defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    // eslint-disable-next-line no-undef
    var map = new H.Map(
      reff.current,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: myCoords[0], lng: myCoords[1] }
      });

  }, [])


  return (
    <Panel id={id} style={{height: '100%', width: '100%'}} >
      <PanelHeader
        left={<PanelHeaderBack onClick={go} data-to="home" />}
      >Карта</PanelHeader>
      <div style={mapStyle} id="map" ref={reff}/>
    </Panel>
  )
}

export default MapHere;
