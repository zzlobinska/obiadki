import React, { useLayoutEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useAuthUser } from 'components';

import styles from './Dropdown.module.scss';

type RouteItem = {
  title: string;
  url: string;
  icon?: null | React.ReactNode;
  roles?: string[];
};

type DropdownItem = {
  title: string;
  dropdown: RouteItem[];
};

interface DropdownProps {
  className?: string;
  item: DropdownItem;
  visibleSidebar?: boolean;
  onClose?: () => void;
  disabled?: boolean;
  isClose: boolean;
}

const Dropdown = (props: DropdownProps) => {
  const { className, item, visibleSidebar, onClose, isClose } = props;

  const [items, setItems] = useState<React.ReactNode[]>([]);
  const user = useAuthUser();

  useLayoutEffect(() => {
    const itemsArr: React.ReactNode[] = [];

    item.dropdown.forEach((link, index) => {
      if (user?.role && !link.roles?.includes(user.role)) {
        return null;
      }

      itemsArr.push(
        <NavLink
          className={({ isActive }) => {
            console.log('isActive', isActive);
            return cn(styles.link, {
              [styles.isClose]: isClose,
              [styles.active]: isActive
            });
          }}
          to={link.url}
          key={index}
          onClick={onClose}
          id={link.url.slice(1, link.url.length)}
        >
          {!!link.icon && link.icon}
          {link.title}
        </NavLink>
      );
    });

    setItems(itemsArr);
  }, [item, user, visibleSidebar, isClose, onClose]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(styles.dropdown, className, styles.active, {
        [styles.wide]: visibleSidebar
      })}
    >
      <div className={styles.body}>{items}</div>
    </div>
  );
};

export default Dropdown;
