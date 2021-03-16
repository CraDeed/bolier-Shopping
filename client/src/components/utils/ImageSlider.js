import React from "react";
import { Carousel } from "antd";

function ImageSlider({ images }) {
    return (
        <div>
            <Carousel autoplay>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            style={{ width: "100%", height: "250px" }}
                            src={`http://localhost:5000/${image}`}
                            alt="image"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageSlider;
