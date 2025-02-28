import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import ImageGallery from "react-image-gallery";
import InnerImageZoom from "react-inner-image-zoom";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

// Interface for image props
interface IImageProps {
  images: any;
}

const ImageBlock: React.FC<IImageProps> = ({ images }) => {
  const [intialImage, setInitialImage] = useState(0);
  // Function to render each image with a zoom feature
  const renderImageWithZoom = (item: any) => (
    <InnerImageZoom
      src={item.original}
      zoomSrc={item.original}
      className="w-full h-full object-contain"
      zoomType="hover"
      zoomPreload={true}
    />
  );

  return (
    <div className="md:col-span-5">
      <Card className="bg-gray-100 dark:bg-white/10 p-6">
        <div className="">
          {/* Image gallery with zoom integration */}
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
