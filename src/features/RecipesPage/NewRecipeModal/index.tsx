import { useEffect, useId, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

import {
	BsFillClockFill,
	BsFillPeopleFill,
	BsFillPlusSquareFill,
	BsX,
} from 'react-icons/bs';
import uuid from 'react-uuid';
import {
	Button,
	Input,
	Modal,
	Textarea,
	FileUploader,
	useValidator,
} from 'src/components';
import Ingredient from './Ingredient';
import style from './NewRecipeModal.module.scss';
import { Form } from 'react-router-dom';
import { db } from 'src/firebase';
import { notifyDanger, notifySuccess } from 'src/components/layout/Toasts';
import Select from 'react-select';
import { CategoriesApi, RecipesApi } from 'src/api';
import { CategoryType, RecipeType } from '../RecipeDetailModal';
import Multiselect from 'src/components/layout/Multiselect';
import { useDispatch } from 'react-redux';
import { verify } from 'crypto';
import { changeVersion } from '../slice';

type NewRecipeModalProps = {
	closeModal: () => void;
	isModalActive: boolean;
	recipe?: RecipeType;
	editRecipe: boolean;
};
export type IngridientType = {
	quantity: number | undefined;
	name: string;
	id: string;
	unit: { label: string; value: string } | null;
};

const getCategories = (recipe?: RecipeType) => {
	return recipe?.categories?.data?.map((cat) => ({
		label: cat.attributes.name,
		value: cat.id,
		...cat,
	}));
};

const getIngridients = (recipe?: RecipeType) => {
	return recipe?.ingredients.map((ingredient) => ({
		quantity: ingredient.ingredient_quantity,
		name: ingredient.ingredient_name,
		id: ingredient.id,
		unit: {
			label: ingredient.ingredient_unit,
			value: ingredient.ingredient_unit,
		},
	}));
};

const NewRecipeModal = ({
	recipe,
	closeModal,
	isModalActive,
	editRecipe
}: NewRecipeModalProps) => {
	const [file, setFile] = useState<string>(recipe?.thumbnail || '');
	const [ingridientsList, setIngridientsList] = useState<IngridientType[]>(
		getIngridients(recipe) || []
	);
	const [description, setDescription] = useState<string>(
		recipe?.description || ''
	);
	const [title, setTitle] = useState<string>(recipe?.title || '');
	const [portionNumber, setPortionNumber] = useState<number | string>(
		recipe?.portion_number || ''
	);
	const [prepareTime, setPrepareTime] = useState<string>(
		recipe?.prepare_time || ''
	);
	const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);

	const [selectedCategories, setSelectedCategories] = useState<any[]>(
		getCategories(recipe) || []
	);

	

	console.log(recipe);

	const dispatch = useDispatch();

	const addIngridient = () => {
		const newIngridient = {
			quantity: undefined,
			name: '',
			unit: null,
			id: uuid(),
		};

		setIngridientsList((prev) => [...prev, newIngridient]);
	};

	const changeIngredientHandler = (ingredient: IngridientType) => {
		setIngridientsList((prev) =>
			prev.map((ing) => {
				if (ing.id === ingredient.id) {
					return ingredient;
				} else {
					return ing;
				}
			})
		);
	};

	

	const addRecipe = async (e: any) => {
		e.preventDefault();
		if (ingridientsList.length === 0) {
			notifyDanger(['Musisz dodać składnik.']);

			return;
		}
		if (!validator.allValid()) {
			validator.showMessages();
			return;
		}

		try {
			const queryData: any = {
				data: {
					description: description,
					portion_number: +portionNumber,
					prepare_time: prepareTime,
					thumbnail: file,
					title: title,
					ingredients: ingridientsList.map((ingridient) => ({
						ingredient_name: ingridient.name,
						ingredient_quantity: ingridient.quantity,
						ingredient_unit: ingridient.unit?.label,
					})),
					categories: selectedCategories,
				},
			};
			if (recipe?.id) {
				await RecipesApi.putRecipe(recipe.id, queryData);
				
			} else {
				await RecipesApi.postRecipe(queryData);
				notifySuccess(['Przepis został dodany.']);
			}

			dispatch(changeVersion());

			closeModal();
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const validator = useValidator();

	const fetchCategories = async () => {
		const { data } = await CategoriesApi.getCategories({});
		setCategoriesList(
			data.data.filter((cat: any) => cat.attributes.parent.data)
		);
		console.log(data);
	};

	console.log('categoriesList', categoriesList);

	useEffect(() => {
		fetchCategories();
	}, []);

	const options = categoriesList.map((cat) => ({
		...cat,
		label: cat.attributes.name,
		value: cat.id,
	}));

	return (
		<div className={style.content}>
			<div className={style.main}>
				<div className={style.name}>
					<Input
						onChange={(e) => setTitle(e.target.value)}
						label='Nazwa'
						value={title}
						validator={validator}
						rule={'required'}
						id='title'
					/>
					<Input
						label='Link do zdjęcia'
						onChange={(e) => setFile(e.target.value)}
						value={file}
						id='file'
						validator={validator}
						rule={'required'}
					/>
				</div>
				<div className={style.details}>
					<div className={style.wrapper}>
						<BsFillPeopleFill size={40} />
						<Input
							onChange={(e) => setPortionNumber(e.target.value)}
							value={portionNumber}
						/>
					</div>
					<div className={style.wrapper}>
						<BsFillClockFill size={40} />
						<Input
							onChange={(e) => setPrepareTime(e.target.value)}
							value={prepareTime}
							id='prepare_time'
							validator={validator}
							rule={'required'}
						/>
					</div>
				</div>
				<Multiselect
					value={selectedCategories}
					onChange={setSelectedCategories}
					options={options}
				/>
			</div>
			<div className={style.add}>
				<button onClick={addIngridient} className={style.ingridients_btn}>
					<p>Dodaj składnik</p>
					<BsFillPlusSquareFill size={25} />
				</button>
			</div>
			{ingridientsList.map((ingridient) => (
				<Ingredient
					setIngridientsList={setIngridientsList}
					key={ingridient.id}
					ingridient={ingridient}
					changeIngredientHandler={changeIngredientHandler}
					validator={validator}
					rule={'required'}
				/>
			))}
			<Textarea
				onChange={setDescription}
				value={description}
				label='Przepis'
				id='description'
				validator={validator}
				rule={'required'}
			/>
			<Button onClick={addRecipe} label={editRecipe ? 'Zapisz' : 'Dodaj'} />
		</div>
	);
};

export default NewRecipeModal;