import React, { ReactElement, ReactNode } from 'react';

import style from './ComponentsPresentation.module.scss';

type ListProps = {
  children: React.ReactNode[];
};

const ComponentsPresentation = ({ children }: ListProps) => {
  console.log('ComponentsPresentation', children);
  return (
    <div className={style.wrapper}>
      {children?.map((child: any, key) => {
        return (
          <div key={key} className={style.child}>
            <h2>{child.type.name}</h2>
            <p>
              Ut tenetur veritatis et beatae internos ea tempore ducimus sed
              perferendis perferendis sit voluptate eveniet sed voluptatibus
              officia est voluptates doloribus. Est rerum totam in ipsum quas
              eum eveniet corporis eum velit ipsa sit sunt velit est soluta
              officia et omnis recusandae? Aut suscipit facilis et perspiciatis
              enim a quod deleniti et voluptatem explicabo. Et officia veniam
              sit asperiores dicta cum distinctio nihil ut nihil aperiam et unde
              blanditiis eos impedit maiores?
            </p>
            <div className={style.component}>{child}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentsPresentation;
