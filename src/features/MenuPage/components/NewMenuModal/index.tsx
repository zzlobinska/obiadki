import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { BsCheck2 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { eachDayOfInterval } from 'date-fns';
import { pl } from 'date-fns/locale';

import { MenusApi } from 'src/api';
import { notifyDanger, notifySuccess } from 'src/components/layout/Toasts';
import { selectedDateType } from 'src/constans/types';

import { changeVersion } from '../../slice';
import NewMenu from '../NewMenu';

import 'react-day-picker/dist/style.css';
import style from './NewMenuModal.module.scss';

type NewMenuModalPropsType = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const pastMonth = new Date();

const NewMenuModal = (props: NewMenuModalPropsType) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [isMenuActivated, setIsMenuActivated] = useState<boolean>(false);
  const [selectedMeals, setSelectedMeals] = useState<selectedDateType[]>([]);

  const dispatch = useDispatch();

  const onMealSelect = (meal: { date: Date; recipe: number; id: string }) => {
    setSelectedMeals((prev) => [
      ...prev.map((item) => {
        return item.id !== meal.id ? item : meal;
      })
    ]);
  };

  const postMenu = async () => {
    if (
      selectedMeals?.filter((meal) => !meal.recipe && !meal.isDisabled).length >
      0
    ) {
      notifyDanger(['Wybierz przepis lub oznacz dzień jako bezprzepisowy.']);
      return;
    }

    const data = {
      data: {
        name: title,
        days: selectedMeals.map((meal) => ({
          ...meal,
          date: new Date(new Date(meal.date).valueOf() + 3_600_000)
        }))
      }
    };
    await MenusApi.postMenu(data);
    dispatch(changeVersion());
    notifySuccess(['Jadłospis został dodany.']);
    closeModalHandler();
  };

  const start = useMemo(
    () => (range?.from ? new Date(range.from) : ''),
    [range]
  );
  const end = useMemo(() => (range?.to ? new Date(range.to) : ''), [range]);

  const from = useMemo(
    () => (range?.from ? new Date(range?.from).toLocaleDateString() : ''),
    [range]
  );
  const to = useMemo(
    () => (range?.to ? new Date(range.to).toLocaleDateString() : ''),
    [range]
  );

  const dateArray = useMemo(
    () => (start && end ? eachDayOfInterval({ start: start, end: end }) : []),
    [end, start]
  );

  useEffect(() => {
    const dates =
      start && end ? eachDayOfInterval({ start: start, end: end }) : [];

    if (selectedMeals.length === 0 && start && end) {
      setSelectedMeals(
        dates.map((date) => ({
          date: new Date(date),
          recipe: null,
          id: uuid(),
          isDisabled: false
        }))
      );
    }
  }, [range, end, start]);

  const title = from ? ` ${from} - ${to}` : '';

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

  console.log('selectedMeals', selectedMeals);

  return (
    <>
      {!isMenuActivated ? (
        <>
          <div className={style.name}>
            <h2 className={style.title}>Wybierz okres:</h2>
          </div>
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
        <>
          <h2 className={style.title}>{title}</h2>
          <NewMenu
            goBack={goBack}
            dateArray={selectedMeals}
            onMealSelect={onMealSelect}
          />
        </>
      )}
      {dateArray.length > 0 && (
        <button
          onClick={isMenuActivated ? postMenu : generateMenu}
          className={style.btn}
        >
          <BsCheck2 size={40} />
        </button>
      )}
    </>
  );
};

export default NewMenuModal;
