import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { BsCheck2, BsFillReplyFill, BsPlusSquare } from 'react-icons/bs';
import uuid from 'react-uuid';
import { addDays } from 'date-fns';
import { eachDayOfInterval } from 'date-fns';
import { pl } from 'date-fns/locale';

import { MenusApi } from 'src/api';
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
  const [selectedMeals, setSelectedMeals] = useState<any[]>([]);

  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };

  const onMealSelect = (meal: { date: Date; recipe: number; id: string }) => {
    console.log('meal', meal);
    setSelectedMeals((prev) => [
      ...prev.map((item) => {
        return item.id !== meal.id ? item : meal;
      })
    ]);
  };

  const postMenu = async () => {
    console.log('selectedMeals', selectedMeals);
    const data = {
      data: {
        name: title,
        days: selectedMeals.map((meal) => ({
          ...meal,
          date: new Date(new Date(meal.date).valueOf() + 3_600_000)
        }))
      }
    };
    console.log('DUPA DUPA', data);
    await MenusApi.postMenu(data);
  };

  console.log(selectedMeals);

  const start = range?.from ? new Date(range?.from) : '';
  const end = range?.to ? new Date(range.to) : '';

  const from = range?.from ? new Date(range?.from).toLocaleDateString() : '';
  const to = range?.to ? new Date(range.to).toLocaleDateString() : '';

  const dateArray = useMemo(
    () => (start && end ? eachDayOfInterval({ start: start, end: end }) : []),
    [range]
  );

  useEffect(() => {
    const dates =
      start && end ? eachDayOfInterval({ start: start, end: end }) : [];

    setSelectedMeals(
      dates.map((date) => ({ date: new Date(date), recipe: null, id: uuid() }))
    );
  }, [range]);

  const title = from ? `jadłospis ${from} - ${to}` : 'przygotuj jadłospis';

  const closeModalHandler = () => {
    props.closeModal();
    setIsMenuActivated(false);
  };

  const generateMenu = () => {
    setIsMenuActivated(true);
  };
  const goBack = () => {
    setIsMenuActivated(false);
  };

  console.log('isMenuActivated', isMenuActivated);

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
          <NewMenu
            goBack={goBack}
            dateArray={selectedMeals}
            onMealSelect={onMealSelect}
          />
        )}
        {dateArray.length > 0 && (
          <button
            onClick={isMenuActivated ? postMenu : generateMenu}
            className={style.btn}
          >
            <BsCheck2 size={40} />
          </button>
        )}
      </Modal>
    </>
  );
};

export default NewMenuModal;
