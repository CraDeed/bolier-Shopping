import React, { useEffect, useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";
import { useLocation } from "react-router";

const { Title } = Typography;
const { TextArea } = Input;

const Continent = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
    const [images, setImages] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const location = useLocation();

    // console.log("typeprops", typeof location.state.productInfo.images);

    useEffect(() => {
        if (location.state) {
            setIsEdit(true);
            setTitle(location.state.productInfo.title);
            setDescription(location.state.productInfo.description);
            setPrice(location.state.productInfo.price);
            setContinent(location.state.productInfo.continents);
            setImages(location.state.productInfo.images);
        }
    }, [location.state]);

    // console.log(images);

    // console.log("uploadprops", props);

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value);
    };

    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    };

    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value);
    };

    const continentChangeHandler = (e) => {
        setContinent(e.currentTarget.value);
    };

    const updateImages = (newImages) => {
        setImages(newImages);
    };

    const submitHandler = () => {
        // e.preventDefault();

        if (
            !title ||
            !description ||
            !price ||
            !continent ||
            images.length === 0
        ) {
            return alert("모든 값을 넣어 주셔야 합니다.");
        }

        // 서버에 채운 값들을 request로 보낸다.

        let body = {
            // 로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: title,
            description: description,
            price: price,
            images: images,
            continents: continent,
        };

        if (isEdit) {
            body._id = location.state.productInfo._id;
            axios.patch("/api/product", body).then((response) => {
                if (response.data.success) {
                    alert("상품 수정에 성공 했습니다.");
                    props.history.push("/");
                } else {
                    alert("상품 수정에 실패 했습니다.");
                }
            });
        } else {
            axios.post("/api/product", body).then((response) => {
                if (response.data.success) {
                    alert("상품 업로드에 성공 했습니다.");
                    props.history.push("/");
                } else {
                    alert("상품 업로드에 실패 했습니다.");
                }
            });
        }
    };

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <Title level={2}>여행 상품 업로드</Title>
            </div>

            <Form onFinish={submitHandler}>
                {/* {DropZone} */}
                {isEdit ? (
                    <FileUpload
                        refreshFunction={updateImages}
                        modiImage={images}
                        isEdit={isEdit}
                    />
                ) : (
                    <FileUpload refreshFunction={updateImages} />
                )}

                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea
                    onChange={descriptionChangeHandler}
                    value={description}
                />
                <br />
                <br />
                <label>가격($)</label>
                <Input
                    type="number"
                    onChange={priceChangeHandler}
                    value={price}
                />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={continent}>
                    {Continent.map((item) => (
                        <option key={item.key} value={item.key}>
                            {item.value}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <Button htmlType="submit">{isEdit ? "수정" : "등록"}</Button>
            </Form>
        </div>
    );
}

export default UploadProductPage;
