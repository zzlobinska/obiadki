import { useEffect, useState } from 'react';
import { db } from 'src/firebase';

import { collection, getDocs } from 'firebase/firestore';
import uuid from 'react-uuid';
import { Modal } from 'src/components';
import MealThumbnail from 'src/components/layout/MealThumbnail';
import NewRecipeModal from '../NewRecipeModal';
import RecipeDetailModal from '../RecipeDetailModal';
import style from './RecipesList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { RecipesApi } from 'src/api';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

const RecipesList = () => {
	const [recipes, setRecipes] = useState<any[]>([]);
	const params = useSearchParams();

	const version = useSelector((state: RootState) => state.recipesList.version);

	const fetchRecipes = async () => {
		const { data } = await RecipesApi.getRecipes({});
		setRecipes(data.data);
	};

	useEffect(() => {
		fetchRecipes();
	}, [version]);

	return (
		<>
			<div className={style.recipes}>
				{recipes.map((recipe) => (
					<div key={recipe.id}>
						<MealThumbnail recipe={{ ...recipe, ...recipe.attributes }} />
					</div>
				))}
			</div>
			{recipes.length === 0 && (
				<p className={style.no_recipes}>Brak przepisów.</p>
			)}
		</>
	);
};

export default RecipesList;
