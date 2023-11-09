import React, { useState, useMemo, createContext } from 'react';
import { useContext } from 'react';
import { CartRentContext } from './CartRentContext';

// create context
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartRentDrawerOpen, setCartRentDrawerOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);
  const closeCartDrawer = () => setCartDrawerOpen(false)

  const toggleCartRentDrawer = () => setCartRentDrawerOpen(!cartRentDrawerOpen);
  const closeCartRentDrawer = () => setCartRentDrawerOpen(false)


  const toggleCategoryDrawer = () => setCategoryDrawerOpen(!categoryDrawerOpen);
  const closeCategoryDrawer = () => setCategoryDrawerOpen(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };

  const value = useMemo(
    () => ({
      cartDrawerOpen,
      toggleCartDrawer,
      closeCartDrawer,
      setCartDrawerOpen,
      categoryDrawerOpen,
      toggleCategoryDrawer,
      closeCategoryDrawer,
      isModalOpen,
      toggleModal,
      closeModal,
      currentPage,
      setCurrentPage,
      handleChangePage,
      isLoading,
      setIsLoading,
      setCartRentDrawerOpen,
      cartRentDrawerOpen,
      toggleCartRentDrawer,
      closeCartRentDrawer,
      isUpdate,
      setIsUpdate
    }),

    [cartDrawerOpen, categoryDrawerOpen, cartRentDrawerOpen, isModalOpen, currentPage, isLoading, isUpdate]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
