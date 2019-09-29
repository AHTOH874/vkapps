import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';

import { Map as YMap, Placemark, ObjectManager, GeolocationControl, withYMaps, GeoObject } from 'react-yandex-maps';
import VKConnect from '@vkontakte/vk-connect'
const bakAdres = ["Казань, Вишневского, 49А ", "Казань, Вишневского, 55 ", "Казань, Вишневского, 57 ", "Казань, Вишневского, 59 ", "Казань, Дачная, 1 ", "Казань, Дачная, 9 ", "Казань, Достоевского, 73 ", "Казань, Достоевского, 74 ", "Казань, Достоевского, 79А ", "Казань, Заслонова, 26 ", "Казань, Масгута Латыпова, 62 ", "Казань, Маршальская, 25 ", "Казань, Моторная, 49 ", "Казань, Пугачева, 45 ", "Казань, Рабочей Молодежи, 9 ", "Казань, Товарищеская, 21 ", "Казань, Товарищеская, 28/70 ", "Казань, Товарищеская, 29 ", "Казань, Товарищеская, 33 ", "Казань, Шмидта, 33 ", "Казань, Шмидта, 46 ", "Казань, Баумана 22 ", "Казань, Баумана 76 ", "Казань, Островского 1/6 ", "Казань, Островского 9 ", "Казань, Пр.-Булачная 37 ", "Казань, Университетская 4/34 ", "Казань, Пушкина 5 ", "Казань, Чернышевского 17/38 ", "Казань, Приволжский РАЙОН ", "Казань, АВАНГАРДНАЯ д. 163 ", "Казань, АВАНГАРДНАЯ д. 54 ", "Казань, АВАНГАРДНАЯ д. 167а ", "Казань, АВАНГАРДНАЯ д. 171а ", "Казань, АВАНГАРДНАЯ д. 88 ", "Казань, АВАНГАРДНАЯ д. 90/48 ", "Казань, АВАНГАРДНАЯ д. 171 ", "Казань, АВАНГАРДНАЯ д. 87 ", "Казань, АВАНГАРДНАЯ д. 187 ", "Казань, АВАНГАРДНАЯ д. 147б ", "Казань, АВАНГАРДНАЯ д. 89 ", "Казань, 33-ВОЕННЫЙ ГОРОДОК д. 2 ", "Казань, ГЛАЗУНОВА д. 8к.1 ", "Казань, КУЛАГИНА ВЛАДИМИРА д. 5 ", "Казань, КУЛАГИНА ВЛАДИМИРА д. 6 ", "Казань, ДОРОЖНАЯ (ПОС.ОТАРЫ) д. 26 ", "Казань, ТЕХНИЧЕСКАЯ д. 35 ", "Казань, МАГИСТРАЛЬНАЯ д.4а ", "Казань, МАГИСТРАЛЬНАЯ д.34 к.1 ", "Казань, МАГИСТРАЛЬНАЯ д.34 ", "Казань, МАГИСТРАЛЬНАЯ д.4 ", "Казань, МАГИСТРАЛЬНАЯ д.22а ", "Казань, АКТАЙСКАЯ д.11 ", "Казань, 10 ЛЕТ ОКТЯБРЯ д.9 ", "Казань, ЮЖНОПРОМЫШЛЕННАЯ д.1\\\\77б ", "Казань, ЮЖНО- ПРОМЫШЛЕННАЯ д.6 ", "Казань, РЫБАЦКАЯ д.6 ", "Казань, ФЕРМА-2 д.75 ", "Казань, ФЕРМА-2 д.81 ", "Казань, 2-ВОЕННЫЙ ГОРОДОК д. 117 ", "Казань, Р.ГАРЕЕВА д.2 ", "Казань, Р.ГАРЕЕВА д.4 ", "Казань, 2-ВОЕННЫЙ ГОРОДОК д. 118 ", "Казань, АК. ПАРИНА д.6 ", "Казань, АК. ПАРИНА д.20 ", "Казань, Х.МАВЛЮТОВА д.40 ", "Казань, АК. ПАРИНА д.18 ", "Казань, ГАРИФЬЯНОВА д.2 ", "Казань, Х. МАВЛЮТОВА д.23 ", "Казань, Х. МАВЛЮТОВА д.21 ", "Казань, Х. МАВЛЮТОВА д.29 ", "Казань, Х. МАВЛЮТОВА д.35 ", "Казань, Х. МАВЛЮТОВА д.41 ", "Казань, АК. ПАРИНА д.2 ", "Казань, ПР. ПОБЕДЫ д.17 ", "Казань, ГАРИФЬЯНОВА д.24 ", "Казань, ГАРИФЬЯНОВА д.26 ", "Казань, ГАРИФЬЯНОВА д.28 ", "Казань, ГАРИФЬЯНОВА д.34 ", "Казань, ГАРИФЬЯНОВА д.10 ", "Казань, СЫРТЛАНОВОЙ д.15 ", "Казань, СЫРТЛАНОВОЙ д.19 ", "Казань, СЫРТЛАНОВОЙ д.25 ", "Казань, СЫРТЛАНОВОЙ д.27 ", "Казань, ГАРИФЬЯНОВА д.9а ", "Казань, Р.ЗОРГЕ д.42 ", "Казань, Р.ЗОРГЕ д.32к.1 ", "Казань, Р.ЗОРГЕ д.60А ", "Казань, Р.ЗОРГЕ д.24 ", "Казань, ПР. КАМАЯ д.3 ", "Казань, ПР. КАМАЯ д.7 ", "Казань, ПР. КАМАЯ д.15а ", "Казань, КАРБЫШЕВА д.35 ", "Казань, КАРБЫШЕВА д.37 ", "Казань, КАРБЫШЕВА д.43 ", "Казань, КАРБЫШЕВА д.60 ", "Казань, БР.КАСИМОВЫХ д.8 ", "Казань, БР.КАСИМОВЫХ д.22/7 ", "Казань, БР.КАСИМОВЫХ д.30 ", "Казань, СЫРТЛАНОВОЙ д.1 ", "Казань, Х.МАВЛЮТОВА д.24 ", "Казань, Х.МАВЛЮТОВА д.30 ", "Казань, ПР. УНИВЕРСИАДЫ д.16 ", "Казань, Р.ЗОРГЕ д.50 ", "Казань, Р.ЗОРГЕ д.60 ", "Казань, ПР. КАМАЯ д.5 ", "Казань, КАРБЫШЕВА д.33 ", "Казань, КАРБЫШЕВА д.47/1 ", "Казань, БР.КАСИМОВЫХ д.36 ", "Казань, БР.КАСИМОВЫХ д.28 ", "Казань, СЫРТЛАНОВОЙ д.5 ", "Казань, СЫРТЛАНОВОЙ д.7 ", "Казань, СЫРТЛАНОВОЙ д.11 ", "Казань, Х.МАВЛЮТОВА д.9 ", "Казань, Х.МАВЛЮТОВА д.17 ", "Казань, Х.МАВЛЮТОВА д.8/20 ", "Казань, ПР.ПОБЕДЫ д.19 ", "Казань, ГАРИФЬЯНОВА д.42 ", "Казань, СЫРТЛАНОВОЙ д.4 ", "Казань, Х.МАВЛЮТОВА д.17а ", "Казань, Х.МАВЛЮТОВА д.17б ", "Казань, Х.МАВЛЮТОВА д.19 ", "Казань, КАРБЫШЕВА д.61 ", "Казань, АГРОНОМИЧЕСКАЯ д.80 ", "Казань, АГРОНОМИЧЕСКАЯ д.16 ", "Казань, БОТАНИЧЕСКАЯ д.9 ", "Казань, БОТАНИЧЕСКАЯ д.10A ", "Казань, БОТАНИЧЕСКАЯ д.14 ", "Казань, БОТАНИЧЕСКАЯ д.23/31 к.1 ", "Казань, БРАТЬЕВ КАСИМОВЫХ д.82а ", "Казань, ВАТУТИНА д.1 ", "Казань, ГАЗОВАЯ д.7А ", "Казань, ЗОРГЕ РИХАРДА д.33 ", "Казань, ЗОРГЕ РИХАРДА д.37 ", "Казань, ЗОРГЕ РИХАРДА д.39 ", "Казань, ЗОРГЕ РИХАРДА д.50 ", "Казань, ИППОДРОМНАЯ д.13/99 ", "Казань, ИППОДРОМНАЯ д.23/78 ", "Казань, КАМАЛА ШАРИФА д.59 ", "Казань, КАЧАЛОВА д.84 ", "Казань, КАЧАЛОВА д.103 ", "Казань, КАЧАЛОВА д.77 ", "Казань, КАЧАЛОВА д.78 ", "Казань, КАЧАЛОВА д.95 ", "Казань, МАВЛЮТОВА ХУСАИНА д.46 ", "Казань, НУРСУЛТАНА НАЗАРБАЕВА д.21/64 ", "Казань, НУРСУЛТАНА НАЗАРБАЕВА д.35 к.1 ", "Казань, НУРСУЛТАНА НАЗАРБАЕВА д.41 ", "Казань, НУРСУЛТАНА НАЗАРБАЕВА д.9/2 ", "Казань, ПАВЛЮХИНА д.102 ", "Казань, ПАВЛЮХИНА д. 103 ", "Казань, ПАВЛЮХИНА д.110А ", "Казань, ПАВЛЮХИНА д. 116 ", "Казань, ПАВЛЮХИНА д.85 ", "Казань, ПАВЛЮХИНА д.89 ", "Казань, ПАВЛЮХИНА д.99 ", "Казань, ПОБЕДЫ ПРОСПЕКТ д.41 ", "Казань, ПОБЕДЫ ПРОСПЕКТ д.62 к.4 ", "Казань, РОТОРНАЯ д.9 ", "Казань, САЛИХА САЙДАШЕВА д.15 ", "Казань, САЛИХА САЙДАШЕВА д.19 ", "Казань, САФИУЛЛИНА д. 12 ", "Казань, САФИУЛЛИНА д.16 ", "Казань, САФИУЛЛИНА д.20 к.4 ", "Казань, САФИУЛЛИНА д.6 к.1 ", "Казань, СПАРТАКОВСКАЯ д. 123 ", "Казань, СПАРТАКОВСКАЯ д. 125 ", "Казань, ХАДИ ТАКТАША д. 127 ", "Казань, ХАДИ ТАКТАША д.115 ", "Казань, ШАЛЯПИНА д.41 ", "Казань, ШАЛЯПИНА д.25 ", "Казань, ШАЛЯПИНА д.41А ", "Казань, ЗОРГЕ РИХАРДА, 101 ", "Казань, ЗОРГЕ РИХАРДА, 121 ", "Казань, ДУБРАВНАЯ, 43б ", "Казань, ЗОРГЕ РИХАРДА, 100 ", "Казань, ФУЧИКА ЮЛИУСА, ЕЕ ", "Казань, ФУЧИКА ЮЛИУСА, ЕЕ ", "Казань, ФУЧИКА ЮЛИУСА, ЕЕ ", "Казань, ФУЧИКА ЮЛИУСА, ЕЕ ", "Казань, ЗОРГЕ РИХАРДА, 96а ", "Казань, ДУБРАВНАЯ, 17 ", "Казань, ФУЧИКА ЮЛИУСА, ЕЕ ", "Казань, 33-ВОЕННЫЙ ГОРОДОК д. 4 ", "Казань, ПРОМЫСЛОВАЯ д.5 ", "Казань, ЯШЬ КОЧ д.1а ", "Казань, 2ая- ГАРАЖНАЯ д.4 ", "Казань, ТЕХНИЧЕСКАЯ д.39б ", "Казань, ТЕХНИЧЕСКАЯ д.43 ", "Казань, МОДЕЛЬНАЯ д. 1/48 ", "Казань, ОРЕНБУРСКИЙ ТРАКТ д.132 ", "Казань, ОРЕНБУРСКИЙ ТРАКТ д.2 ", "Казань, ДУРСКАЯ д.16а ", "Казань, ОРЕНБУРСКИЙ ТРАКТ д.138б ", "Казань, ОРЕНБУРСКИЙ ТРАКТ д.138в ", "Казань, АК.ПАРИНА д.16 ", "Казань, Х.МАВЛЮТОВА д.26 ", "Казань, Х.ТАКТАШ д.123 ", "Казань, АК. ПАРИНА д.22 ", "Казань, ул. Авангардная,62/1 ", "Казань, ул. Авангардная,62/2"]
const mapStyle = {
    zIndex: 1000,
    transition: 'all 0.3s',
    top: '43px'
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

// const Route = ({ ymaps, points = [
//   'Москва, улица Крылатские холмы',
//   {
//     point: 'Москва, метро Молодежная',
//     type: 'viaPoint',
//   },
//   [55.731272, 37.447198],
//   'Москва, метро Пионерская',
// ], params, map}) => {
//     ymaps.route(points, params).then(function (route) {
//       route.getPaths().options.set({
//         // в балуне выводим только информацию о времени движения с учетом пробок
//         balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
//         // можно выставить настройки графики маршруту
//         strokeColor: '0000ffff',
//         opacity: 0.9
//       });
//       console.log(route);
      
//       map.geoObjects.add(route);
//     });
//     return null
// }
// const Bac = withYMaps(Route, true, ['route'])


const Map = ({ymaps, ...props}) => {
  // console.log(props);
  
  const [map, setMap] = useState(null)

  useEffect(()=>{

    if (map){
      const bakCollection = new ymaps.GeoObjectCollection();
      ymaps.route(bakAdres.slice(-140), {
        mapStateAutoApply: true
      })
        .then(function (route) {
          console.log(route.getPaths())
            
            // .options.set({
            //   // В балуне выводим только информацию о времени движения с учетом пробок.
            //   balloonContentLayout: ymaps.templateLayoutFactory
            //     .createClass('{{ properties.humanJamsTime }}'),
            //   // Можно выставить настройки графики маршруту.
            //   strokeColor: '0000ffff',
            //   opacity: 0.9
            // });
          // Добавляем маршрут на карту.
          map.geoObjects.add(route);
        })

      

      fetch('https://bitbothacktoon.firebaseio.com/zavodi.json').then(v => v.json()).then((v) => {
        var ZavodsCollection = new ymaps.GeoObjectCollection();
        console.log(v);
        
      v.filter(Boolean).forEach(V => {
        ZavodsCollection.add(new ymaps.Placemark([V.lat.toFixed(2), V.long.toFixed(2)], {
            balloonContent:'Работает с 6:00 до 18:00',
            preset:'islands#icon',
            iconColor:'black'
          }));

        });
        ZavodsCollection.events.add('click', ()=>
          console.log('Нажал')
        )
        ZavodsCollection.events
        .add("mouseenter", function () {
          ZavodsCollection.options.set("iconColor", "white");
        })
        .add("mouseleave", function () {
          ZavodsCollection.options.unset("iconColor");
        });

      // // Добавляем коллекцию на карту.
        map.geoObjects.add(ZavodsCollection);
      // map.setBounds(myCollection.getBounds());
      map.events.add('click', function (e) {
        map.geoObjects.add(new ymaps.Placemark(e.get('coords'), {
    balloonContent: '<img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" />',
    iconContent: "Азербайджан"
}, {
    preset: "islands#yellowStretchyIcon",
    // Отключаем кнопку закрытия балуна.
    balloonCloseButton: false,
    // Балун будем открывать и закрывать кликом по иконке метки.
    hideIconOnBalloonOpen: false
}))
      });

      })
      // // При наведении на одну из меток подсвечиваем коллекцию целиком.

      // // Устанавливаем карте центр и масштаб так, чтобы охватить коллекцию целиком.
      // map.setBounds(myCollection.getBounds());
      // ymaps.route([
      //   'Москва, улица Крылатские холмы',
      //   {
      //     point: 'Москва, метро Молодежная',
      //     type: 'viaPoint',
      //   },
      //   [55.731272, 37.447198],
      //   'Москва, метро Пионерская',
      // ], { mapStateAutoApply: true }).then((route) => {
      //   console.log(route);

      //   route.getPaths().options.set({
      //     // в балуне выводим только информацию о времени движения с учетом пробок
      //     // balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
      //     // можно выставить настройки графики маршруту
      //     strokeColor: '0000ffff',
      //     opacity: 0.9
      //   });
      //   console.log(route);

      //   map.geoObjects.add(route);
    // })
  }
  })

  const [places, setPlaces] = useState([])
  const [myCoords, setCoords] = useState([55.75, 37.57])
  
  useEffect(()=> {
    VKConnect.sendPromise('VKWebAppGetGeodata').then((data)=> { 
      if (data.available) {
        setCoords([data.lat, data.long])
        if (map)
          map.penTo(myCoords)
          map.geoObjects.add(new ymaps.Circle(myCoords, 10000))

      }
    }).catch(console.error)

    //   console.log(v);
    //   setPlaces(v);
      // const withOutName = v.filter(Boolean).map(({ lat, long }, i) => ({ lat, long, id: i }))
      // const markInRad = myFilter(myCoords[0], myCoords[1], withOutName, 4000)

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
    // }).catch(console.error)
    
  }, [])
  
  return (
          <YMap instanceRef={ref => setMap(ref)} height='calc(100vh - 93px)' width='100%' state={{ center: myCoords, zoom: 9 }}>
            
{/*                 
                <ObjectManager
                  options={{
                    clusterize: true,
                    gridSize: 32,
                  }}
                  objects={{
                    openBalloonOnClick: true,
                    preset: 'islands#greenDotIcon',
                  }}
                  clusters={{
                    preset: 'islands#redClusterIcons',
                  }}
                  filter={object => object.id % 2 === 0}
                  defaultFeatures={{
                    type: "FeatureCollection",
                    features: places.filter(Boolean).map((v, i) => ({
                      id: i,
                      properties: {
                        baloonContent: 'baloon',
                        clusterCaption: 'metka',
                        hintContent: 'подсказка'
                      },
                      geometry: {
                        type: 'Point',
                        coordinates: [v.lat, v.long]
                      }
                    }))
                  }}
                  modules={[
                    'objectManager.addon.objectsBalloon',
                    'objectManager.addon.objectsHint',
                  ]}
                /> */}
                {/* <Placemark geometry={myCoords}/> */}
              </YMap>

)
}

export default withYMaps(Map, true, ['Circle', 'GeoObjectCollection','Placemark','route']);
