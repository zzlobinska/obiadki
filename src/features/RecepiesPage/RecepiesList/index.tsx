import { useEffect, useState } from 'react';
import { db } from 'src/firebase';

import { collection, getDocs } from 'firebase/firestore';
import uuid from 'react-uuid';
import { Modal } from 'src/components';
import MealThumbnail from 'src/components/layout/MealThumbnail';
import NewRecepieModal from '../NewRecepieModal';
import RecepieDetailModal from '../RecepieDetailModal';
import style from './RecepiesList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { RecipesApi } from 'src/api';

const RecepiesList = () => {
	const [recepies, setRecepies] = useState<any[]>([]);
	const params = useSearchParams();

	console.log(params);

	const fetchRecepies = async () => {
	
		const {data} = await RecipesApi.getRecipes({});
		setRecepies(data.data)
		console.log(data);
	};

	

	useEffect(() => {
		fetchRecepies();
	}, []);

	return (
		<div className={style.recepies}>
			{recepies.map((recepie) => (
				<div key={recepie.key}>
					<MealThumbnail recepie={{...recepie, ...recepie.attributes}} />
				</div>
			))}
		</div>
	);
};

export default RecepiesList;
