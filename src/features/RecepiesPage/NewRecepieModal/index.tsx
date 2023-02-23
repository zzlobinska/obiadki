import { useId, useState } from 'react';
import {
	BsFillClockFill,
	BsFillPeopleFill,
	BsFillPlusSquareFill,
	BsX,
} from 'react-icons/bs';
import uuid from 'react-uuid';
import { Button, Input, Modal, Textarea, FileUploader } from 'src/components';
import style from './NewRecepieModal.module.scss';

type NewRecepieModalProps = {
	closeModal: () => void;
	isModalActive: boolean;
};

type IngridientType = {
	quantity: number | null;
	name: string;
	id: string;
};

const NewRecepieModal = ({
	closeModal,
	isModalActive,
}: NewRecepieModalProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [ingridientsList, setIngridientsList] = useState<IngridientType[]>([]);

	const deleteIngridient = (id: string) => {
		setIngridientsList((prev) =>
			prev.filter((ingridient) => ingridient.id !== id)
		);
	};

	const Ingridient = ({ ingridient }: { ingridient: IngridientType }) => {
		return (
			<div className={style.ingridients}>
				<Input label='Ilość' />
				<Input label='Składnik' />
				<button
					onClick={() => deleteIngridient(ingridient.id)}
					className={style.ingridient_btn}
				>
					<BsX size={30} />
				</button>
			</div>
		);
	};

	const addIngridient = () => {
		const newIngridient = {
			quantity: null,
			name: '',
			id: uuid(),
		};

		setIngridientsList((prev) => [...prev, newIngridient]);
	};

	return (
		<Modal title='Nowy Przepis' closeModal={closeModal} isOpen={isModalActive}>
			<div className={style.content}>
				<div className={style.main}>
					<div className={style.name}>
						<Input label='Nazwa' />
						<FileUploader
							value={file}
							setFile={setFile}
							handleUpload={() => {}}
						/>
					</div>
					<div className={style.details}>
						<div className={style.wrapper}>
							<BsFillPeopleFill size={40} />
							<Input type='number' />
						</div>
						<div className={style.wrapper}>
							<BsFillClockFill size={40} />
							<Input />
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
					<Ingridient key={ingridient.id} ingridient={ingridient} />
				))}
				<Textarea label='Przepis' />
				<Button label='Dodaj Przepis' />
			</div>
		</Modal>
	);
};

export default NewRecepieModal;
