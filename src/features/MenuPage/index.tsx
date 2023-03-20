import MenuHeader from './components/MenuHeader';
import MenusList from './components/MenusList';

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
