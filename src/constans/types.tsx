export type IngridientType = {
  quantity: number | undefined;
  name: string;
  id: string;
  unit: { label: string; value: string } | null;
};

export type FormattedCategoryType = {
  name: string;
  parent: {
    data: ServerCategoryType;
  };
  label: string;
  value: number;
};

export interface ServerCategoryType {
  id: number;
  attributes: {
    name: string;
    parent: {
      data: ServerCategoryType;
    };
  };
}

export interface SelectedCategoryType extends ServerCategoryType {
  label: string;
  value: number;
}

export type ServerIngridientType = {
  ingredient_name: string;
  ingredient_unit: string;
  ingredient_quantity: number;
  id: string;
};

export type RecipeType = {
  thumbnail: string;
  description: string;
  ingredients: ServerIngridientType[];
  portion_number: number;
  prepare_time: string;
  title: string;
  id: number;
  categories: {
    data: ServerCategoryType[];
  };
<<<<<<< HEAD
  link: string;
=======
>>>>>>> 8640c2723fde5bcc5be5bef24d0f968dd67604fa
};

export type ServerRecipeType = {
  attributes: RecipeType;
  id: number;
};

export type MenuDayType = {
  date: string;
  id: string;
  isDisabled: boolean;
  recipe: {
    data: ServerRecipeType;
  };
};

export type MenuType = {
  attributes: {
    name: string;
    days: MenuDayType[];
  };
  id: number;
};

export type selectedDateType = {
  date: Date;
  id: string;
  isDisabled?: boolean;
  recipe: number | null;
};
