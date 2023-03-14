import MenuHeader from './MenuHeader';
import MenusList from './MenusList';

import style from './MenuPage.module.scss';

const MenuPage = () => {
  return (
    <div className={style.section}>
      <MenuHeader />
      <MenusList />
    </div>
  );
};

export default MenuPage;
