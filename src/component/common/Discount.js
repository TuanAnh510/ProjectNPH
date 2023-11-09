import useTranslation from "next-translate/useTranslation";

const Discount = ({ discount, product, slug, modal }) => {

  const handlerDiscount = (price, originalPrice) => {
    const priceDiscount = (originalPrice - price) / originalPrice * 100
    const integerNumber = Math.floor(priceDiscount);

    return integerNumber
  }
  const { t } = useTranslation()
  return (
    <>
      {discount > 1 && (
        <span
          className={
            modal
              ? "absolute text-dark text-sm bg-green-600 text-white py-1 px-2 rounded font-medium z-10 left-4 top-4"
              : slug
                ? "text-dark text-sm bg-green-600 text-white py-1 px-2 rounded font-medium z-10 right-4 top-4"
                : " absolute text-dark text-xs bg-green-600 text-white py-1 px-2 rounded font-medium z-10 right-4 top-4"
          }
        >
          {t(`common:saleDis`)} {discount}
        </span>
      )}
      {discount === undefined && Number(product.prices.discount) > 1 && (
        <span
          className={
            modal
              ? "absolute text-dark text-sm bg-green-600 text-white py-1 px-2 rounded font-medium z-10 left-4 top-4"
              : slug
                ? "text-dark text-sm bg-green-600 text-white py-1 px-2 rounded font-medium z-10 right-4 top-4"
                : " absolute text-dark text-xs bg-green-600 text-white py-1 px-2 rounded font-medium z-10 right-4 top-4"
          }
        >
          {t(`common:saleDis`)} {handlerDiscount(product.prices.price, product.prices.originalPrice)}%
        </span>
      )}
    </>
  );
};

export default Discount;
