import { useEffect, useState } from 'react';
import { DateRange,DayPicker } from 'react-day-picker';
import { BsCheck2, BsFillReplyFill, BsPlusSquare } from 'react-icons/bs';
import { addDays } from 'date-fns';
import { eachDayOfInterval } from 'date-fns';
import { pl } from 'date-fns/locale';

import { Modal } from 'src/components';

import NewMenu from './components/NewMenu';

import 'react-day-picker/dist/style.css';
import style from './NewMenuModal.module.scss';

type NewMenuModalProps = {
	isModalOpen: boolean;
	closeModal: () => void;
};

const pastMonth = new Date();

const NewMenuModal = (props: NewMenuModalProps) => {
	const [range, setRange] = useState<DateRange | undefined>();
	const [isMenuActivated, setIsMenuActivated] = useState<boolean>(false);
	const defaultSelected: DateRange = {
		from: pastMonth,
		to: addDays(pastMonth, 4),
	};
	const start = range?.from ? new Date(range?.from) : '';
	const end = range?.to ? new Date(range.to) : '';

	const from = range?.from ? new Date(range?.from).toLocaleDateString() : '';
	const to = range?.to ? new Date(range.to).toLocaleDateString() : '';

	const dateArray =
		start && end ? eachDayOfInterval({ start: start, end: end }) : [];

	const title = from ? `jadłospis ${from} - ${to}` : 'przygotuj jadłospis';

	const closeModalHandler = () => {
		props.closeModal();
		setRange();
		setIsMenuActivated(false);
	};

	const generateMenu = () => {
		setIsMenuActivated(true);
	};
	const goBack = () => {
		setIsMenuActivated(false);
	};

	return (
		<>
			<Modal
				title={title}
				isOpen={props.isModalOpen}
				closeModal={closeModalHandler}
			>
				{!isMenuActivated ? (
					<>
						<h2 className={style.title}>Wybierz okres:</h2>
						<div className={style.calendar}>
							<DayPicker
								mode='range'
								defaultMonth={pastMonth}
								selected={range}
								onSelect={setRange}
								locale={pl}
							/>
						</div>
					</>
				) : (
					<NewMenu goBack={goBack} dateArray={dateArray} />
				)}
				{dateArray.length > 0 && (
					<button onClick={generateMenu} className={style.btn}>
						<BsCheck2 size={40} />
					</button>
				)}
			</Modal>
		</>
	);
};

export default NewMenuModal;
