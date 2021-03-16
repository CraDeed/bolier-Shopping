import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage({ detail }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (detail.images && detail.images.length > 0) {
            let images = [];

            detail.images.map((item) => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`,
                });
            });
            setImages(images);
        }
    }, [detail]);

    return (
        <div>
            <ImageGallery items={images} />
        </div>
    );
}

export default ProductImage;
