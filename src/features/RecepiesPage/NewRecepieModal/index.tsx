import { useId, useState } from 'react';
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
import style from './NewRecepieModal.module.scss';
import { Form } from 'react-router-dom';
import { db } from 'src/firebase';
import { notifyDanger, notifySuccess } from 'src/components/layout/Toasts';
import Select from 'react-select';

type NewRecepieModalProps = {
	closeModal: () => void;
	isModalActive: boolean;
};
export type IngridientType = {
	quantity: number | undefined;
	name: string;
	id: string;
	unit: { label: string; value: string } | null;
};

const NewRecepieModal = ({
	closeModal,
	isModalActive,
}: NewRecepieModalProps) => {
	const [file, setFile] = useState<string>('');
	const [ingridientsList, setIngridientsList] = useState<IngridientType[]>([]);
	const [description, setDescription] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [portionNumber, setPortionNumber] = useState<string>('');
	const [prepareTime, setPrepareTime] = useState<string>('');
	const [ingridientName, setIngridientName] = useState<string>('');

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

	const clearModal = () => {
		setFile('');
		setDescription('');
		setIngridientName('');
		setIngridientsList([]);
		setTitle('');
		setPortionNumber('');
		setPrepareTime('');
		closeModal();
	};

	const addRecipe = async (e: any) => {
		e.preventDefault();
		if (ingridientsList.length === 0) {
			notifyDanger(['Musisz dodać składnik.']);
			console.log(ingridientsList.length);
			return;
		}
		if (!validator.allValid()) {
			validator.showMessages();
			return;
		}

		try {
			const docRef = await addDoc(collection(db, 'recipes'), {
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
			});
			notifySuccess(['Przepis został dodany.']);

			clearModal();
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

	const validator = useValidator();

	return (
		<Modal title='Nowy Przepis' closeModal={clearModal} isOpen={isModalActive}>
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
				<Button onClick={addRecipe} label='Dodaj Przepis' />
			</div>
		</Modal>
	);
};

export default NewRecepieModal;
