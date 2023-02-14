import React from 'react';

import style from './ComponentCard.module.scss';

type ComponentCardProps = {
  children: React.ReactNode;
  data: {
    title: string;
    description: string;
  };
};

const ComponentCard = (props: ComponentCardProps) => {
  const { children, data } = props;
  const { title, description } = data;

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={style.childrenWrapper}>{children}</div>
    </div>
  );
};

export default ComponentCard;
