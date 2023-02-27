import { useEffect, useState } from 'react';
import { db } from 'src/firebase';

import { collection, getDocs } from 'firebase/firestore';
import uuid from 'react-uuid';
import { Modal } from 'src/components';
import MealThumbnail from 'src/components/layout/MealThumbnail';
import NewRecepieModal from '../NewRecepieModal';
import RecepieDetailModal from '../RecepieDetailModal';
import style from './RecepiesList.module.scss';



const RecepiesList = () => {
	const [recepies, setRecepies] = useState<any[]>([]);
	
	const fetchRecepies = async () => {
		await getDocs(collection(db, 'recipes')).then((response) => {
			const newData = response.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setRecepies(newData);
			console.log(newData);
		});
	};

	useEffect(() => {
		fetchRecepies();
	}, [fetchRecepies]);

	

	return (
		<div className={style.recepies}>
			{recepies.map((recepie) => (
				<div key={recepie.key}>
					<MealThumbnail
						recepie={recepie}
					/>
					
				</div>
			))}
		</div>
	);
};

export default RecepiesList;
