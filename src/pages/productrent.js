import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
import Layout from "@layout/Layout";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext } from "react";
import StickyCart from "@component/cart/StickyCart";
import { useEffect } from "react";
import ProductCard from "@component/product/ProductCard";
import ProductServices from "@services/ProductServices";
import AttributeServices from "@services/AttributeServices";
import { useState } from "react";
import PageHeader from "@component/header/PageHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCardRent from "@component/product/ProductCardRent";
import dynamic from "next/dynamic";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";

const ProductRent = ({ rentalProducts, attributes }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: customPage } = useAsync(SettingServices.getCustomPage);
  const [row, setRow] = useState(30);
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [visibleProducts, setVisibleProducts] = useState(
    rentalProducts.slice(0, 10)
  );
  const [hasMore, setHasMore] = useState(true);


  const loadMore = () => {
    if (visibleProducts.length >= rentalProducts.length) {
      setHasMore(false);
      return;
    }

    const nextBatch = rentalProducts.slice(
      visibleProducts.length,
      visibleProducts.length + 10
    );
    setVisibleProducts((prevProducts) => [...prevProducts, ...nextBatch]);
  };

  useEffect(() => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout>
          <StickyCart />
          <div className="min-h-screen mx-auto lg:w-[80%] w-[100%] md:w-[100%]">
            {/* <PageHeader
              title={t("ProductRent")}
              description="Đây là trang tất cả sản phẩm"
            /> */}
            <div className="relative">
              <img
                src={customPage?.backgoundImage}
                className="lg:h-[250px] h-[100px] w-full bg-cover "
              />
              {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> */}
              <p className="absolute inset-0 flex items-center justify-center text-xl md:text-3xl lg:text-4xl font-bold font-serif text-center  ">
                {customPage?.titlePages?.titleProductRent}
              </p>
            </div>
            <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="flex">
                <div className="w-full">
                  <InfiniteScroll
                    dataLength={visibleProducts.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                  // endMessage={<p>No more products</p>}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-3">
                      {visibleProducts?.slice(0, row).map((product) => (
                        <ProductCardRent
                          key={product._id}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                    </div>
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};
export const getServerSideProps = async (context) => {
  const products = await ProductServices.getShowingProducts();
  const attributes = await AttributeServices.getShowingAttributes();
  const rentalProducts = products.filter(product => {
    const rentInfo = product.rent;
    return rentInfo && rentInfo.monthlyrent !== null && rentInfo.depositcost !== null && rentInfo.agree !== null;
  });
  return {
    props: {
      rentalProducts: rentalProducts,
      attributes,
    },
  };
};

export default dynamic(() => Promise.resolve(ProductRent), { ssr: false });
