import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Drawer from 'rc-drawer';

//internal import
import Cart from '@component/cart/Cart';
import { SidebarContext } from '@context/SidebarContext';
import CartRent from '@component/cart/CartRent';

const CartDrawer = () => {
  const { cartRentDrawerOpen, closeCartRentDrawer } = useContext(SidebarContext);

  return (
    <Drawer
      open={cartRentDrawerOpen}
      onClose={closeCartRentDrawer}
      parent={null}
      level={null}
      placement={'right'}
    >
      <CartRent />
    </Drawer>
  );
};
export default dynamic(() => Promise.resolve(CartDrawer), { ssr: false });
