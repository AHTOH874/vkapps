import React from 'react'
import { Panel, PanelHeader, Group, Cell } from '@vkontakte/vkui';

const Zavod = ({id, go, zavodId}) => {
  

  return <Panel id={id}>
    <PanelHeader>Завод</PanelHeader>
    <Group>
      <Cell>
        Да
      </Cell>
    </Group>
  </Panel>
}

export default Zavod