import React, { Suspense } from 'react';

import './IconsList/IconsList.module.css';
import './IconsList/IconBlock/IconBlock.module.css';

const IconsList = React.lazy(() => import('./IconsList/IconsList'));

export function IconsArea() {
  return (
    <Suspense fallback={null}>
      <IconsList />
    </Suspense>
  );
}
