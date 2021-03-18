import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function FileUpload({ refreshFunction, modiImage, isEdit }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // 이미지가 두개 이상이면 작동 안함
        if (isEdit) {
            setImages([...modiImage]);
        }
        // images 자체를 넣으면 먹통 문제
    }, [modiImage]);

    const dropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" },
        };
        formData.append("file", files[0]);

        axios.post("/api/product/image", formData, config).then((response) => {
            if (response.data.success) {
                setImages([...images, response.data.filePath]);
                console.log("res", images);
                refreshFunction([...images, response.data.filePath]);
            } else {
                alert("파일을 저장하는데 실패했습니다");
            }
        });
    };

    const deleteHandler = (image) => {
        const currentIndex = images.indexOf(image);

        let newImages = [...images];
        newImages.splice(currentIndex, 1);
        refreshFunction(newImages);

        setImages(newImages);
    };

    console.log("image", images);

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300,
                                height: 240,
                                border: "1px solid lightgray",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <p>
                                <PlusOutlined style={{ fontSize: "3rem" }} />
                            </p>
                        </div>
                    </section>
                )}
            </Dropzone>

            <div
                style={{
                    display: "flex",
                    width: "350px",
                    height: "240px",
                    overflowX: "auto",
                }}
            >
                {images.map((image, index) => {
                    // console.log("image", image);
                    return (
                        <div onClick={() => deleteHandler(image)} key={index}>
                            <img
                                style={{
                                    minWidth: "300px",
                                    width: "300px",
                                    height: "240px",
                                }}
                                src={`http://localhost:5000/${image}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FileUpload;
