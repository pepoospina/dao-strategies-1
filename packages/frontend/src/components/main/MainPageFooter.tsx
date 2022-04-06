import { FC } from 'react';

import { ThemeSwitcher } from '~~/components/common';

export interface IMainPageFooterProps {
  dumb?: any;
}

export const MainPageFooter: FC<IMainPageFooterProps> = (_) => {
  const left = <div></div>;

  const right = <ThemeSwitcher />;

  return (
    <>
      {left}
      {right}
    </>
  );
};
