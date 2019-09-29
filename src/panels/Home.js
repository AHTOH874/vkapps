import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import List from '@vkontakte/vkui/dist/components/List/List';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import connect from '@vkontakte/vk-connect-promise';
import ReactSVG from 'react-svg';
import Waste from '../icons/13_ico_Waste.svg'
import Routes from '../icons/15_ico_Routes.svg'

const Home = ({ id, go, fetchedUser }) => {
	const [error, setError] = useState(null)
	const skan = () => {
		try {
			connect.send('VKWebAppOpenQR').then((d) => JSON.parse(d.qr_data)).catch((e) => setError(e))
		} catch (er) {
			setError(er)
		}
	}


	return (
	<Panel id={id}>
		<PanelHeader>Личный кабинет</PanelHeader>
		
		{error ? <FormStatus title="Ну ошибка" state="error">
        {
        	JSON.stringify(error)
        }
      </FormStatus> : null }
		{fetchedUser &&
		<Group title="Добро пожаловать!">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}
		<List title="Даные о вас">
			<Cell asideContent={<div>521,23<div>баллов</div></div>} description={<><div>Всего в системе: 780 баллов</div><div>Последние начисленные баллы: {'12,3'}</div></>}>
				<strong>Ваши баллы</strong>
			</Cell>
			<Cell description={"Все предложения инициатив"} asideContent={7}>
				<strong>Экоинициативы</strong>
			</Cell>
		</List>
<Group title="Навигация">

			<Cell>
				<Button size="xl" level="2" onClick={go} data-to="map">
					Перейти к карте
				</Button>
			</Cell>
			<Cell>
				<Button size="xl" level="2" onClick={skan} data-to="persik">
					Отсканировать QR-code
				</Button>
			</Cell>
		</Group>
		
		<FixedLayout vertical="bottom" style={{backgroundColor:'#1c7859', height:'60px'}}>
			<div style={{display:'flex', flexDirection:'row', paddingTop:'7px'}}> 
				<ReactSVG onClick={go} data-to="SelectMycor" beforeInjection={svg => {
    svg.setAttribute('style', 'height: 45px; width:100%')
  }} src={Waste} style={{textAlign: 'center', margin:'auto'}}></ReactSVG>
	<ReactSVG beforeInjection={svg => {
    svg.setAttribute('style', 'height: 45px; width:100%')
  }} src={Routes} style={{textAlign: 'center', margin:'auto'}}></ReactSVG>
			</div>
		</FixedLayout>
	</Panel>
)};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home
