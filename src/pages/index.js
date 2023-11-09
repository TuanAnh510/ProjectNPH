import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

//internal import
import Layout from "@layout/Layout";
import Banner from "@component/banner/Banner";
import CardTwo from "@component/cta-card/CardTwo";
import OfferCard from "@component/offer/OfferCard";
import StickyCart from "@component/cart/StickyCart";
import ProductServices from "@services/ProductServices";
import ProductCard from "@component/product/ProductCard";
import MainCarousel from "@component/carousel/MainCarousel";
import FeatureCategory from "@component/category/FeatureCategory";
import Loading from "@component/preloader/Loading";
import AttributeServices from "@services/AttributeServices";
import BrandCard from "@component/brand/BrandCard";
import FeatureCard from "@component/feature-card/FeatureCard";
import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";

const Home = ({ popularProducts, discountProducts, attributes }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: customPage } = useAsync(SettingServices.getCustomPage);

  const { isLoading, setIsLoading } = useContext(SidebarContext);

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
        <Layout title="Trang chủ" description="Đây là trang chủ">
          <div className="min-h-screen">
            <StickyCart />
            <div className="bg-white">
              <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
                <div className="flex w-full h-full">
                  <div className="flex-shrink-0 xl:pr-6 lg:block w-full lg:w-3/5">
                    <MainCarousel />
                  </div>
                  <div className="w-full hidden lg:flex">
                    <OfferCard />
                  </div>
                </div>
                {/* <div className="bg-green-100 px-10 py-6 rounded-lg mt-6 hidden lg:block">
                    <Banner />
                  </div> */}
                <div className="mt-20 ">
                  <FeatureCard />
                </div>
              </div>
            </div>

            {/* feature category's */}
            {/* <div className="bg-gray-100 lg:py-16 py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <div className="mb-10 flex justify-center">
                  <div className="text-center w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      {t("common:Featured-title")}
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      {t("common:Featured-sub-title")}
                    </p>
                  </div>
                </div>
                <FeatureCategory />
              </div>
            </div> */}

            {/* discounted products */}
            {/* <div
              id="discount"
              className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
            >
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    {t("common:discounted-products-title")}
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    {t("common:discounted-products-paragraph-text")}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {discountProducts?.slice(0, 18).map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        attributes={attributes}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div> */}

            <div
              id="discount"
              className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
            >
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    {customPage?.titleText?.titleSaleProduct}
                  </h2>
                  {/* <p className="text-base font-sans text-gray-600 leading-6">
                    {t("common:discounted-products-paragraph-text")}
                  </p> */}
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {discountProducts?.slice(0, 18).map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        attributes={attributes}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* popular products */}
            <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    {customPage?.titleText?.titlePopularProduct}
                  </h2>
                  {/* <p className="text-base font-sans text-gray-600 leading-6">
                    {t("common:popular-products-sub-title")}
                  </p> */}
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {popularProducts?.slice(0, 18).map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        attributes={attributes}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* promotional banner card */}
            <div className="block mx-auto max-w-screen-2xl">
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                <div className="lg:p-16 p-6 bg-green-100 shadow-sm border rounded-lg">
                  <CardTwo />
                </div>
              </div>
            </div>

            {/* <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    All Brand Products for Daily Shopping
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    See all our popular brand products in this week. You can
                    choose your daily needs products from this list and get some
                    special offer with free shipping.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {popularProducts?.slice(19, 34).map((products) => (
                      <BrandCard key={products._id} products={products} />
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { query, _id } = context.query;

  const products = await ProductServices.getShowingProducts();
  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? query : "",
    }),

    AttributeServices.getShowingAttributes(),
  ]);

  const popularProducts = data?.products.filter((p) => p.prices.discount < 1);

  const discountProducts = products.filter((p) => p.prices.discount >= 1);

  return {
    props: {
      popularProducts: popularProducts.slice(0, 50),
      discountProducts: discountProducts,
      cookies: cookies,
      attributes,
    },
  };
};

export default Home;
