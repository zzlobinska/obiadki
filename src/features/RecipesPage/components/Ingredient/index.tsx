import { BsX } from 'react-icons/bs';
import SimpleReactValidator from 'simple-react-validator';

import { Input } from 'src/components';
import Select from 'src/components/layout/InputSelect';
import { quantityOptions } from 'src/constans/misc';
import { IngridientType } from 'src/constans/types';

import style from '../NewRecipeModal/NewRecipeModal.module.scss';

type IngridientPropsType = {
  ingridient: IngridientType;
  setIngridientsList: React.Dispatch<React.SetStateAction<IngridientType[]>>;
  changeIngredientHandler: (ingredient: IngridientType) => void;
  validator: SimpleReactValidator;
  rule: string;
};

const Ingredient = ({
  ingridient,
  setIngridientsList,
  changeIngredientHandler,
  validator
}: IngridientPropsType) => {
  const deleteIngridient = (id: string) => {
    setIngridientsList((prev: IngridientType[]) =>
      prev.filter((ingridient: IngridientType) => ingridient.id !== id)
    );
  };

  const onUnitChange = (unit: { label: string; value: string }) => {
    changeIngredientHandler({
      ...ingridient,
      unit
    });
  };
  const onQuantityChange = (quantity: string) => {
    changeIngredientHandler({
      ...ingridient,
      quantity: +quantity
    });
  };
  const onNameChange = (name: string) => {
    changeIngredientHandler({
      ...ingridient,
      name: name
    });
  };

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
