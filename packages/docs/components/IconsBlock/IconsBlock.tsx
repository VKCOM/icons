import * as React from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { Panel } from './Panel/Panel';
import { IconsArea } from './IconsArea/IconsArea';
import styles from './IconsBlock.module.css';

export function IconsBlock() {
  return (
    <div className={styles.host}>
      <Panel />
      <div className={styles.main}>
        <IconsArea />
        <Sidebar />
      </div>
    </div>
  );
}
