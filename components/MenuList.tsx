
import React from 'react';
import MenuItem from './MenuItem';
import { type MenuItem as MenuItemType } from '../types';

interface MenuListProps {
  menuItems: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
}

const MenuList: React.FC<MenuListProps> = React.memo(({ menuItems, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {menuItems.map(item => (
        <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
});

MenuList.displayName = 'MenuList';

export default MenuList;
