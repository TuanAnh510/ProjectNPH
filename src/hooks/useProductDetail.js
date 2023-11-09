import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "@context/SidebarContext";
import useAddToCart from "@hooks/useAddToCart";
import AttributeServices from "@services/AttributeServices";
import ProductServices from "@services/ProductServices";
import { notifyError } from "@utils/toast";
import { showingTranslateValue } from "@utils/translate";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";
import useAddRentToCart from "@hooks/useAddRentToCart";
import { UserContext } from "@context/UserContext";



const useProductDetail = ({ product, attributes, relatedProduct }) => {

    const router = useRouter();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting)

    const {
        state: { userInfo },
    } = useContext(UserContext);


    const currency = globalSetting?.default_currency || "VND";
    const { isLoading, setIsLoading } = useContext(SidebarContext);
    const { handleAddItem, item, setItem } = useAddToCart();
    const { handleAddItemRent, itemRent, setItemRent } = useAddRentToCart();
    const { lang } = useTranslation("ns1");

    // react hook

    const [value, setValue] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [originalPrice, setOriginalPrice] = useState(0);
    const [stock, setStock] = useState("");
    const [discount, setDiscount] = useState("");
    const [selectVariant, setSelectVariant] = useState({});
    const [isReadMore, setIsReadMore] = useState(true);
    const [selectVa, setSelectVa] = useState({});
    const [variantTitle, setVariantTitle] = useState([]);
    const [variants, setVariants] = useState([]);
    const [styleCheck, setStyleCheck] = useState("payment");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [monthRent, setMonthRent] = useState();

    const handleChangeSelect = (e) => {
        setStyleCheck(e.target.value);
    };
    const handleCheckout = () => {
        router.push(`/checkout`);

    };
    const handleCheckoutRent = () => {
        router.push(`/checkout-rent`);

    };

    useEffect(() => {
        const yearDiff = endDate?.$y - startDate?.$y;
        const monthDiff = endDate?.$M - startDate?.$M;
        const totalMonth = yearDiff * 12 + monthDiff;

        setMonthRent(totalMonth)
    }, [startDate, endDate])


    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        if (value) {
            const result = product?.variants?.filter((variant) =>
                Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
            );
            const res = result?.map(
                ({
                    originalPrice,
                    discount,
                    quantity,
                    inUse,
                    inUseOrder,
                    barcode,
                    sku,
                    productId,
                    image,
                    ...rest
                }) => ({ ...rest })
            );
            const resultss = product?.variants;
            const filterKey = Object.keys(Object.assign({}, ...res));
            const selectVar = filterKey?.reduce(
                (obj, key) => ({ ...obj, [key]: selectVariant[key] }),
                {}
            );
            const newObj = Object.entries(selectVar).reduce(
                (a, [k, v]) => (v ? ((a[k] = v), a) : a),
                {}
            );

            delete newObj.price;

            const foundObject = resultss.find((obj) => {
                return Object.keys(newObj).every((key) => obj[key] === newObj[key]);
            });

            if (result.length <= 0 || foundObject === undefined) return setStock(0);

            setVariants(result);
            setSelectVariant(foundObject);
            setSelectVa(foundObject);
            setImg(foundObject?.image);
            setPrice(Number(foundObject?.price));
            setOriginalPrice(Number(foundObject?.originalPrice));
            setStock(foundObject?.quantity);
            setDiscount(Number(foundObject?.discount));
        } else if (product?.variants?.length > 0) {
            const result = product?.variants?.filter((variant) =>
                Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
            );

            setVariants(result);
            setPrice(Number(product.variants[0]?.price));
            setOriginalPrice(Number(product.variants[0]?.originalPrice));
            setStock(product.variants[0]?.quantity);
            setDiscount(Number(product.variants[0]?.discount));
            setSelectVariant(product.variants[0]);
            setSelectVa(product.variants[0]);
            setImg(product.variants[0]?.image);
        } else {
            setPrice(Number(product?.prices?.price));
            setOriginalPrice(Number(product?.prices?.originalPrice));
            setStock(product?.stock);
            setDiscount(Number(product?.prices?.discount));
            setImg(product?.image[0]);
        }
    }, [
        product?.prices?.discount,
        product?.prices?.originalPrice,
        product?.prices?.price,
        product?.stock,
        product.variants,
        selectVa,
        selectVariant,
        value,
    ]);

    useEffect(() => {
        const res = Object.keys(Object.assign({}, ...product?.variants));
        const varTitle = attributes?.filter((att) => res.includes(att?._id));

        setVariantTitle(varTitle?.sort());
    }, [variants, attributes]);

    useEffect(() => {
        setIsLoading(false);
    }, [product]);

    const handleAddToCart = (p) => {
        if (p.variants.length === 1 && p.variants[0].quantity < 1)
            return notifyError(t("common:Istock"));

        if (stock <= 0) return notifyError(t("common:Istock"));

        if (styleCheck === "payment") {
            if (
                product?.variants.map(
                    (variant) =>
                        Object.entries(variant).sort().toString() ===
                        Object.entries(selectVariant).sort().toString()
                )
            ) {
                const newItem = {
                    ...p,
                    id: `${p.variants.length <= 1
                        ? p._id
                        : p._id +
                        variantTitle
                            ?.map(
                                // (att) => selectVariant[att.title.replace(/[^a-zA-Z0-9]/g, '')]
                                (att) => selectVariant[att._id]
                            )
                            .join("-")
                        }`,

                    title: `${p.variants.length <= 1
                        ? showingTranslateValue(product?.title, lang)
                        : showingTranslateValue(product?.title, lang) +
                        "-" +
                        variantTitle
                            ?.map(
                                // (att) => selectVariant[att.title.replace(/[^a-zA-Z0-9]/g, '')]
                                (att) =>
                                    att.variants?.find(
                                        (v) => v._id === selectVariant[att._id]
                                    )
                            )
                            .map((el) =>
                                Object.keys(el?.name).includes(lang)
                                    ? el?.name[lang]
                                    : el?.name.en
                            )
                        }`,
                    variant: selectVariant,
                    price: price,
                    originalPrice: originalPrice,
                };
                handleAddItem(newItem);
            }
        } else {
            return notifyError(t("common:allVariant"));
        }
    };

    const handleChangeImage = (img) => {
        setImg(img);
    };

    const { t } = useTranslation();


    const category_name = product?.category;

    return {
        startDate,
        endDate,
        handleStartDateChange,
        handleEndDateChange,
        router,
        prevRef,
        nextRef,
        userInfo,
        currency,
        isLoading,
        setIsLoading,
        item,
        setItem,
        handleAddItemRent,
        itemRent,
        setItemRent,
        lang,
        setValue,
        price,
        img,
        originalPrice,
        stock,
        selectVariant,
        setSelectVariant,
        isReadMore,
        setIsReadMore,
        setSelectVa,
        variantTitle,
        styleCheck,
        handleChangeSelect,
        handleAddToCart,
        handleChangeImage,
        t,
        category_name,
        monthRent,
        handleCheckout,
        handleCheckoutRent,
    };

}




export default useProductDetail