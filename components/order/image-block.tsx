import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import ImageGallery from "react-image-gallery";
import InnerImageZoom from "react-inner-image-zoom";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { getS3BasePath } from "@/config/aws";

// Interface for image props
interface IImageProps {
  product: any;
}

const ImageBlock: React.FC<IImageProps> = ({ product }) => {
  const AWS_URL = getS3BasePath();
  const [productId, setProductId] = useState<number>(product?.id);
  const [images, setImages] = useState<any>([]);
  const [intialImage, setInitialImage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Function to render each image with a zoom feature.
  const renderImageWithZoom = (item: any) => (
    <InnerImageZoom
      src={item.original}
      zoomSrc={item.original}
      className="w-full h-full object-contain"
      zoomType="hover"
      zoomPreload={true}
    />
  );

  useEffect(() => {
    // If product image exists, format it for ImageGallery
    if (product?.image) {
      const optimizedImage = product.image.replace("_thumbnail", "_optimized"); // Assuming there's an optimized version.
      const formattedImages = [
        {
          original: `${AWS_URL}/products/${product?.user_id}/${optimizedImage}`, // Optimized image for zoom
          thumbnail: `${AWS_URL}/products/${product?.user_id}/${product.image}`, // Thumbnail image
        },
      ];
      setImages(formattedImages);
    }
  }, [product]);

  return (
    <div className="md:col-span-5">
      <Card className="bg-gray-100 dark:bg-white/10 p-6">
        <div className="">
          <ImageGallery
            items={images}
            renderItem={renderImageWithZoom}
            showThumbnails={true}
            showFullscreenButton={true}
            showPlayButton={false}
          />
        </div>
      </Card>
    </div>
  );
};

export default ImageBlock;
