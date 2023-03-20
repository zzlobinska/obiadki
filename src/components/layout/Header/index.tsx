import React from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

const Header = () => {
	return (
		<div className={style.container}>
			<ul className={style.nav}>
				<li className={style.nav_links}>
					<Link to='/przepisy' className={style.nav_link}>Przepisy</Link>
				</li>
				<li className={style.nav_links}>
					<Link to='/jadlospisy' className={style.nav_link}>Jadłospisy</Link>
				</li>
			</ul>
			<Link to='/'><h1 className={style.logo}>Obiadki</h1></Link>
		</div>
	);
};

export default Header;
