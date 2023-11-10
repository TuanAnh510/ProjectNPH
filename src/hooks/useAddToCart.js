import { useState } from "react";
import { useCart } from "react-use-cart";

import { notifyError, notifySuccess } from "@utils/toast";
import useTranslation from "next-translate/useTranslation";

const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const { addItem, items, updateItemQuantity } = useCart();

  const { t } = useTranslation()
  
   const handleAddItem = (product) => {
    // Kiểm tra xem item có rỗng hoặc không phải là số, đặt giá trị thành 0
    const quantityToAdd = isNaN(item) || item === '' || item === "0" ? setItem(1) : parseInt(item);

    const result = items.find((i) => i.id === product.id);

    if (result !== undefined) {
      if (
        result?.quantity + quantityToAdd <=
        (product?.variants?.length > 0
          ? product?.variant?.quantity
          : product?.stock)
      ) {
        addItem(product, quantityToAdd);
        notifySuccess(`${quantityToAdd} ${product.title}`);
      } else {
        notifyError(t("common:Istock"));
      }
    } else {
      if (
        quantityToAdd <=
        (product?.variants?.length > 0
          ? product?.variant?.quantity
          : product?.stock)
      ) {
        addItem(product, quantityToAdd);
        notifySuccess(`${quantityToAdd} ${product.title} ${t("common:addedToCart")}`);
      } else {
        notifyError(t("common:Istock"));
      }
    }
  };

  const handleIncreaseQuantity = (product) => {
    // Kiểm tra xem item có rỗng hoặc không phải là số, đặt giá trị thành 0
    const quantityToAdd = isNaN(item) || item === '' || item === "0" ? setItem(1) : parseInt(item);

    const result = items?.find((p) => p.id === product.id);

    if (result) {
      if (
        result?.quantity + quantityToAdd <=
        (product?.variants?.length > 0
          ? product?.variant?.quantity
          : product?.stock)
      ) {
        updateItemQuantity(product.id, product.quantity + 1);
      } else {
        notifyError(t("common:Istock"));
      }
    }
  };


  return {
    setItem,
    item,
    handleAddItem,
    handleIncreaseQuantity,
  };
};

export default useAddToCart;
