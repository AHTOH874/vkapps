import React, { useState, useEffect } from 'react';

import { Map as YMap, withYMaps } from 'react-yandex-maps';
import VKConnect from '@vkontakte/vk-connect'
const bakAdres = [{ "address": "Казань, Большая Красная, 36А", "lat": "55.797402", "long": "49.123545", "type": 6 }, { "address": "Казань, Большая Красная, 54", "lat": "55.796542", "long": "49.132357", "type": 8 }, { "address": "Казань, Большая Красная, 57 Б", "lat": "55.797766", "long": "49.138457", "type": 7 }, { "address": "Казань, Б.Красная, 58", "lat": "55.796375", "long": "49.134298", "type": 7 }, { "address": "Казань, Галактионова, 3А", "lat": "55.793515", "long": "49.12615", "type": 1 }, { "address": "Казань, Гоголя,18А", "lat": "55.797979", "long": "49.133992", "type": 7 }, { "address": "Казань, Гоголя, 23", "lat": "55.798298", "long": "49.132034", "type": 2 }, { "address": "Казань, Горького, 7", "lat": "55.794507", "long": "49.128207", "type": 0 }, { "address": "Казань, Горького, 21/27", "lat": "55.794204", "long": "49.134495", "type": 5 }, { "address": "Казань, Горького, 21А", "lat": "55.794239", "long": "49.133875", "type": 9 }, { "address": "Казань, Дзержинского,3", "lat": "55.796395", "long": "49.112882", "type": 3 }, { "address": "Казань, Дзержинского,16", "lat": "55.794366", "long": "49.116915", "type": 9 }, { "address": "Казань, Дзержинского, 22", "lat": "55.793773", "long": "49.120311", "type": 9 }, { "address": "Казань, Жуковского, 2/11", "lat": "55.794361", "long": "49.129411", "type": 7 }, { "address": "Казань, Жуковского, 7", "lat": "55.794963", "long": "49.12898", "type": 1 }, { "address": "Казань, Жуковского, 21", "lat": "55.797442", "long": "49.129815", "type": 10 }, { "address": "Казань, Карла Маркса, 23/6", "lat": "55.796952", "long": "49.120616", "type": 2 }, { "address": "Казань, Карла Маркса, 39", "lat": "55.796041", "long": "49.128899", "type": 9 }, { "address": "Казань, Карла Маркса, 40/60", "lat": "55.795904", "long": "49.126024", "type": 6 }, { "address": "Казань, Карла Маркса, 44", "lat": "55.795747", "long": "49.127479", "type": 3 }, { "address": "Казань, Карла Маркса, 46 корп.2", "lat": "55.795732", "long": "49.128126", "type": 6 }, { "address": "Казань, Карла Маркса, 47", "lat": "55.796117", "long": "49.131531", "type": 2 }, { "address": "Казань, Карла Маркса, 48", "lat": "55.795656", "long": "49.129141", "type": 9 }, { "address": "Казань, Карла Маркса, 54", "lat": "55.795418", "long": "49.132124", "type": 3 }, { "address": "Казань, Карла Маркса, 59", "lat": "55.795418", "long": "49.13675", "type": 4 }, { "address": "Казань, Карла Маркса, 69", "lat": "55.794614", "long": "49.14444", "type": 3 }, { "address": "Казань, Карла Фукса, 4", "lat": "55.796203", "long": "49.11944", "type": 6 }, { "address": "Казань, Кремлевская, 2А", "lat": "55.794922", "long": "49.111723", "type": 0 }, { "address": "Казань, Кремлевская, 23", "lat": "55.793333", "long": "49.117481", "type": 10 }, { "address": "Казань, Муштари, 30", "lat": "55.794517", "long": "49.135573", "type": 3 }, { "address": "Казань, Нагорная, 35", "lat": "55.874041", "long": "49.255022", "type": 0 }, { "address": "Казань, Пушкина, 58", "lat": "55.795545", "long": "49.1258", "type": 3 }, { "address": "Казань, Театральная, 1/29", "lat": "55.795327", "long": "49.122754", "type": 5 }, { "address": "Казань, Театральная, 5", "lat": "55.795909", "long": "49.123751", "type": 6 }, { "address": "Казань, Толстого, 14", "lat": "55.796031", "long": "49.141655", "type": 9 }, { "address": "Казань, Толстого, 16", "lat": "55.799689", "long": "49.140712", "type": 9 }, { "address": "Казань, Университетская, 12/23", "lat": "55.78856", "long": "49.122377", "type": 6 }, { "address": "Казань, Япеева, 8/2", "lat": "55.798799", "long": "49.116286", "type": 8 }, { "address": "Казань, Япеева, 13А", "lat": "55.800286", "long": "49.115864", "type": 7 }, { "address": "Казань, Абжалилова, 1/82", "lat": "55.78646", "long": "49.160717", "type": 8 }, { "address": "Казань, Абжалилова, 3", "lat": "55.787751", "long": "49.16087", "type": 1 }, { "address": "Казань, Абжалилова, 21", "lat": "55.792038", "long": "49.164697", "type": 0 }, { "address": "Казань, Амирхана Еники, 2/53", "lat": "55.783342", "long": "49.151617", "type": 9 }, { "address": "Казань, Бойничная, 3", "lat": "55.778801", "long": "49.1485", "type": 5 }, { "address": "Казань, Вишневского, 49А", "lat": "55.785286", "long": "49.152066", "type": 0 }]

// function myFilter(mylon = 51.5289156201, mylat = 46.0209384922, coords, dist = 20) {
//   const lon1 = mylon - dist / Math.abs(Math.cos(degrees_to_radians(mylat)) * 111.0),// # 1 градус широты = 111 км
//     lon2 = mylon + dist / Math.abs(Math.cos(degrees_to_radians(mylat)) * 111.0),//
//     lat1 = mylat - (dist / 111.0),
//     lat2 = mylat + (dist / 111.0)
//   return coords.filter(({ lat, long }) => (lat >= lat1 || lat <= lat2) && (long >= lon1 || long >= lon2))
// }

// function degrees_to_radians(degrees) {
//   var pi = Math.PI;
//   return degrees * (pi / 180);
// }

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

// const transfer = (num) => {
//   const parsed = num.toString(2);
//   if (isNaN(parsed)) 
//     return [0,0,0,0,0,0,0,0,0,0,0,0]

//   const str = '' + parsed
//   return str.split('').map(Number)
// }


const Map = ({ymaps, ...props}) => {
 
  const [map, setMap] = useState(null)
  const [lastRoute, setLastRoute] = useState(null)
  useEffect(()=>{

    if (map){
      const bakCollection = new ymaps.GeoObjectCollection();
      bakAdres.forEach((v)=> {
        bakCollection.add(new ymaps.Placemark([v.lat, v.long], {
          balloonContent: 'Работает с 6:00 до 18:00',
          preset: 'islands#redDotIcon',
          iconColor: 'black'
        }));

      })
      bakCollection.events.add('click', (e) => {
        if (lastRoute)
          map.geoObjects.remove(lastRoute)
        ymaps.route([myCoords, e.get('coords')], { mapStateAutoApply: true }).then((route) => {
          route.getPaths().options.set({
            // в балуне выводим только информацию о времени движения с учетом пробок
            // balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
            // можно выставить настройки графики маршруту
            strokeColor: '0000ffff',
            opacity: 0.9
          });
          setLastRoute(route)

          map.geoObjects.add(route);
        })
      })
      // // Добавляем коллекцию на карту.
      map.geoObjects.add(bakCollection);
      // map.setBounds(myCollection.getBounds());

      

      fetch('https://bitbothacktoon.firebaseio.com/zavodi.json').then(v => v.json()).then((v) => {
        var ZavodsCollection = new ymaps.GeoObjectCollection();
        console.log(v);
        
      v.filter(Boolean).forEach(V => {
        ZavodsCollection.add(new ymaps.Placemark([V.lat.toFixed(2), V.long.toFixed(2)], {
          balloonContentHeader: V.name,
          balloonContentBody: "Работает с 6:00 до 18:00",
          balloonContentFooter: "Проложить маршрут",
            preset:'islands#icon',
            iconColor:'black'
          }));

        });
        ZavodsCollection.events.add('click', (e)=> {
          if(lastRoute)
            map.geoObjects.remove(lastRoute)
          ymaps.route([myCoords, e.get('coords')], { mapStateAutoApply: true }).then((route) => {
            route.getPaths().options.set({
              // в балуне выводим только информацию о времени движения с учетом пробок
              // balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
              // можно выставить настройки графики маршруту
              strokeColor: '0000ffff',
              opacity: 0.9
            });
            setLastRoute(route)


            map.geoObjects.add(route);
          })
        })
        
      // // Добавляем коллекцию на карту.
        map.geoObjects.add(ZavodsCollection);
      // map.setBounds(myCollection.getBounds());
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

  // const [places, setPlaces] = useState([])
  const [myCoords, setCoords] = useState([55.793947, 49.156265])
  
  useEffect(()=> {
    VKConnect.sendPromise('VKWebAppGetGeodata').then((data)=> { 
      if (data.available) {
        setCoords([data.lat, data.long])
        if (map){
          map.penTo(myCoords)
          map.geoObjects.add(new ymaps.Placemark(myCoords,{}, {
            preset:"islands#geolocationIcon"
          }))
        }

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

export default withYMaps(Map, true, ['Circle', 'geoObject.addon.balloon', 'geoObject.addon.hint','GeoObjectCollection','Placemark','route']);
