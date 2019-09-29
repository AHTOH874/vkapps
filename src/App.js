import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik/Persik';
import Mycor from './panels/Mycor/Mycor';
import Zavod from './panels/Zavod/Zavod';

import './App.css'
import MapWrapper from './panels/Map/MapWrapper';
const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [zavodId, setZavodId] = useState(null)
  const [selectedElem, selectElem] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

	const [popout, setPopout] = useState(null); //<ScreenSpinner size='large' />

	useEffect(() => {
		// Init VK  Mini App
		connect.send('VKWebAppInit');
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		connect.send("VKWebAppSetViewSettings", {
			"status_bar_style": "light",
			"action_bar_color": '#1c7859'
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
		if (e.currentTarget.dataset.hasOwnProperty('id'))
			setZavodId(e.currentTarget.dataset.id)
			
	};
	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<Persik id='persik' go={go} />
			<MapWrapper id='map' go={go} selectedElem={selectedElem}/>
			<Zavod id='zavod' zavodId={zavodId}/>
			<Mycor id='SelectMycor' selectedElem={selectedElem} go={go} selectElem={selectElem}/>
			
		</View>
	);
}

export default App;

