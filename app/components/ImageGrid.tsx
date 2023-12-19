"use client";

type GridImageProps = {
    images: string[];
  };

const ImageGrid = ({ images }) => {
    return (
      <div className="grid grid-cols-3 gap-4">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className="w-full h-auto rounded-md"
          />
        ))}
      </div>
    );
  };
  
  export default ImageGrid;