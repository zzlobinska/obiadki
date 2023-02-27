import { useState } from 'react';
import { BsX } from 'react-icons/bs';
import { Input } from 'src/components';
import Select from 'src/components/layout/InputSelect';
import { IngridientType } from '..';
import style from '../NewRecepieModal.module.scss';
import { quantityOptions } from 'src/constans/misc';

type IngridientPropsType = {
	ingridient: IngridientType;
	setIngridientsList: any;
	changeIngredientHandler: (ingredient: IngridientType) => void;
	validator: any;
	rule: any;
};

const Ingredient = ({
	ingridient,
	setIngridientsList,
	changeIngredientHandler,
	validator,
	rule,
}: IngridientPropsType) => {
	const deleteIngridient = (id: string) => {
		setIngridientsList((prev: any) =>
			prev.filter((ingridient: any) => ingridient.id !== id)
		);
	};

	console.log(ingridient.quantity);

	const onUnitChange = (unit: { label: string; value: string }) => {
		changeIngredientHandler({
			...ingridient,
			unit,
		});
	};
	const onQuantityChange = (quantity: string) => {
		changeIngredientHandler({
			...ingridient,
			quantity: +quantity,
		});
	};
	const onNameChange = (name: string) => {
		changeIngredientHandler({
			...ingridient,
			name: name,
		});
	};

	console.log(ingridient.quantity);

	return (
		<div className={style.ingridients}>
			<Input
				label='Ilość'
				value={ingridient.quantity}
				onChange={(e) => onQuantityChange(e.target.value)}
				validator={validator}
				rule={'required'}
				id='quantity'
			/>
			<Select
				onChange={onUnitChange}
				options={quantityOptions}
				label='Jednostka'
				value={ingridient.unit}
				validator={validator}
				rule={'required'}
				id='quantity_options'
			/>
			<Input
				label='Składnik'
				value={ingridient.name}
				onChange={(e) => onNameChange(e.target.value)}
				validator={validator}
				rule={'required'}
				id='ingridient'
			/>
			<button
				onClick={() => deleteIngridient(ingridient.id)}
				className={style.ingridient_btn}
			>
				<BsX size={30} />
			</button>
		</div>
	);
};

export default Ingredient;
