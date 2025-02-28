"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import ReviewsTab from "./components/review-tabs";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { openPopup } from "@/service/modal.service";
// import { ViewAllVariantsModal } from "./components/view-all-variants.modal";
import LayoutLoader from "../layout-loader";
import { useTranslations } from "next-intl";
import {
  fetchProductDetails,
  fetchProductImagesById,
} from "@/service/product.service";
import { getInitials } from "@/utils/general";
import { getS3BasePath } from "@/config/aws";
import { ViewAllVariantsModal } from "./components/view-all-variants.modal";
import ImageBlock from "./image-block";

interface ProductRating {
  rating: number;
}

interface CategoryRatings {
  label: string;
  ratings: ProductRating[];
}

interface CategorizedRatings {
  excellent: CategoryRatings;
  good: CategoryRatings;
  medium: CategoryRatings;
  poor: CategoryRatings;
  veryBad: CategoryRatings;
}

const ProductDetails = () => {
  const t = useTranslations("ProductPage");
  const AWS_URL = getS3BasePath();
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();
  const prdocutSlug = searchParams.get("slug");
  const [productDetails, setProductDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [categorizedRatings, setCategorizedRatings] =
    useState<CategorizedRatings | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (prdocutSlug) {
      fetchProductData(prdocutSlug);
    }
  }, [prdocutSlug]);

  //Function to fetch order details
  const fetchProductData = async (slug: any) => {
    setLoading(true);
    startTransition(async () => {
      try {
        const response = await fetchProductDetails(slug);
        if (response?.status !== true && response?.statusCode !== 200) {
          toast.error(response?.message);
          return;
        }
        setProductDetails(response?.data);

        // Categorize ratings
        if (response?.data?.productRatings) {
          const categorized = await categorizeRatings(
            response.data.productRatings
          );
          setCategorizedRatings(categorized);
        }
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setLoading(false);
      }
    });
  };

  //Separating product ratings based upon it's rating
  const categorizeRatings: any = (productRatings: any[]) => {
    const categories: any = {
      excellent: { label: "Excellent", ratings: [] },
      good: { label: "Good", ratings: [] },
      medium: { label: "Medium", ratings: [] },
      poor: { label: "Poor", ratings: [] },
      veryBad: { label: "Very Bad", ratings: [] },
    };

    productRatings.forEach((rating) => {
      if (rating.rating >= 4.5) {
        categories.excellent.ratings.push(rating);
      } else if (rating.rating >= 4) {
        categories.good.ratings.push(rating);
      } else if (rating.rating >= 3) {
        categories.medium.ratings.push(rating);
      } else if (rating.rating >= 2) {
        categories.poor.ratings.push(rating);
      } else {
        categories.veryBad.ratings.push(rating);
      }
    });

    return categories;
  };

  const totalRatings: any = categorizedRatings
    ? Object.values(categorizedRatings).reduce(
        (sum, category) => sum + category.ratings.length,
        0
      )
    : 0;
  const getPercentage = (count: number) =>
    totalRatings ? (count / totalRatings) * 100 : 0;

  const handleOpenModal = async () => {
    await openPopup("variant", `${t("View")} ${t("Variants")}`, "view");
  };

  const fetchProductImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProductImagesById(
        productDetails?.product?.id
      );
      if (response?.status === true && response?.statusCode === 200) {
        const fetchedImages = response?.data;
        let formatedData: any = [];
        if (fetchedImages?.length > 0) {
          formatedData = fetchedImages?.map((image: any) => ({
            original: `${AWS_URL}/products/${productDetails?.product?.user_id}/${image.optimized_image}`,
            thumbnail: `${AWS_URL}/products/${productDetails?.product?.user_id}/${image.thumbnail_image}`,
          }));
        }
        setImages(formatedData);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productDetails?.product?.id) {
      fetchProductImages();
    }
  }, [productDetails]);

  return (
    <>
      <>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <LayoutLoader />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/product"
                className="flex items-center text-gray-800 gap-2"
              >
                <Icon
                  icon="heroicons:chevron-left-20-solid"
                  className="h-6 w-6"
                />
                <p className="text-base font-medium text-gray-800">
                  #000{productDetails?.product?.id}
                </p>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative bg-[#f5f5f5] h-[700px] p-4 rounded-xl">
                {images?.length > 0 ? <>
                <ImageBlock images={images} />
                    
                </> : <>
                <Avatar className="rounded-md object-cover w-full h-[250px] mt-20">
                  <AvatarFallback>
                    {productDetails?.product?.title
                      ? getInitials(productDetails?.product?.title)
                      : ""}
                  </AvatarFallback>
                </Avatar>
                </>}
              </div>
              <div className="ms-4">
                <h4 className="text-3xl text-gray-800 font-bold mb-2">
                  {productDetails?.product?.title}
                </h4>
                <div className="mt-6 border-y border-gray-300 py-8">
                  <h6 className="text-lg text-gray-800 font-semibold">
                    Specifications
                  </h6>
                  <Table className="mt-4">
                    <TableBody>
                      <TableRow className="border-none">
                        <TableCell className="text-base p-2 font-medium text-gray-500">
                          Category
                        </TableCell>
                        <TableCell className="p-2 text-base font-semibold text-gray-800 last:text-left">
                          {productDetails?.product?.category?.category_name}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-none">
                        <TableCell className="text-base p-2 font-medium text-gray-500">
                          Brand
                        </TableCell>
                        <TableCell className="p-2 text-base font-semibold text-gray-800 last:text-left">
                          {productDetails?.product?.brand?.brand_name}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Link
                    href="#"
                    onClick={handleOpenModal}
                    className="mt-3 inline-block underline"
                  >
                    View All Variants
                  </Link>
                  <ViewAllVariantsModal
                    productUuid={productDetails?.product?.uuid}
                  />
                </div>

                <div className="mt-6  py-3">
                  <h6 className="text-lg text-gray-800 font-semibold">
                    Description
                  </h6>
                  <Table className="mt-4 border-y border-gray-300">
                    <TableBody>
                      <TableRow className="border-none">
                        <TableCell className="text-base p-2 font-medium text-gray-500">
                          {productDetails?.product?.description?.replace(
                            /<\/?[^>]+(>|$)/g,
                            ""
                          )}
                        </TableCell>
                        <TableCell className="text-base p-2 font-medium text-gray-500"></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="text-3xl font-medium text-gray-800 pt-8">
                  Price :{" "}
                  <span className="font-semibold text-red-500">
                    ₹ {productDetails?.product?.price}
                  </span>
                </div>
              </div>
              <div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Rating Average */}
                    <div className="bg-gray-600/40 flex flex-col items-center justify-center text-center rounded-lg p-3">
                      <p className="text-4xl font-bold text-primary">
                        {categorizedRatings
                          ? (
                              Object.values(categorizedRatings).reduce(
                                (sum, category) =>
                                  sum +
                                  category.ratings.reduce(
                                    (ratingSum: any, review: any) =>
                                      ratingSum + review.rating,
                                    0
                                  ),
                                0
                              ) / totalRatings || 0
                            ) // Handle NaN case
                              .toFixed(1)
                          : "0"}
                      </p>
                      <p className="text-base font-semibold text-white">
                        Rating
                      </p>
                    </div>
                    {/* Categories */}
                    <div className="col-span-2 space-y-2">
                      {categorizedRatings &&
                        Object.entries(categorizedRatings).map(
                          ([key, category]) => (
                            <div className="flex items-center gap-3" key={key}>
                              <p className="text-white w-28">
                                {category?.label}
                              </p>
                              <Progress
                                value={getPercentage(category?.ratings?.length)}
                                size="sm"
                                color="primary"
                                className="w-full"
                              />
                              <p className="text-gray-400 w-14">
                                {category?.ratings?.length}
                              </p>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <Tabs
                    defaultValue="ExcellentTab"
                    className="inline-block w-full"
                  >
                    <TabsList className="rounded-full w-full mb-3">
                      <TabsTrigger
                        value="ExcellentTab"
                        className="rounded-full"
                      >
                        Excellent
                      </TabsTrigger>
                      <TabsTrigger value="GoodTab" className="rounded-full">
                        Good
                      </TabsTrigger>
                      <TabsTrigger value="MediumTab" className="rounded-full">
                        Medium
                      </TabsTrigger>
                      <TabsTrigger value="PoorTab" className="rounded-full">
                        Poor
                      </TabsTrigger>
                      <TabsTrigger value="VeryBadTab" className="rounded-full">
                        Very Bad
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="ExcellentTab">
                      <ReviewsTab
                        ratings={categorizedRatings?.excellent?.ratings}
                      />
                    </TabsContent>
                    <TabsContent value="GoodTab">
                      <ReviewsTab ratings={categorizedRatings?.good?.ratings} />
                    </TabsContent>
                    <TabsContent value="MediumTab">
                      <ReviewsTab
                        ratings={categorizedRatings?.medium?.ratings}
                      />
                    </TabsContent>
                    <TabsContent value="PoorTab">
                      <ReviewsTab ratings={categorizedRatings?.poor?.ratings} />
                    </TabsContent>
                    <TabsContent value="VeryBadTab">
                      <ReviewsTab
                        ratings={categorizedRatings?.veryBad?.ratings}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default ProductDetails;
