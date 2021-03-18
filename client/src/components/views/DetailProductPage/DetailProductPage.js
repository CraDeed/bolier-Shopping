import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Button, Col, Modal, Row } from "antd";
import { useHistory } from "react-router";
import { WarningTwoTone } from "@ant-design/icons";

function DetailProductPage(props) {
    const [product, setProduct] = useState({});
    const [updatePost, setUpdatePost] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const history = useHistory();

    const productId = props.match.params.productId;

    useEffect(() => {
        axios
            .get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then((response) => {
                setProduct(response.data[0]);
                setUpdatePost(response.data[0]);
                // console.log(response);
            })
            .catch((err) => alert(err));
    }, []);

    const onUpdateHandler = () => {
        history.push({
            pathname: `/product/modify/${productId}`,
            state: { productInfo: product },
        });
    };

    const onShowModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        axios.delete(
            `/api/product/products_by_id/delete?id=${productId}&type=single`
        );
        setIsModalVisible(false);
        history.push("/");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>{product.title}</h1>
            </div>
            {props.user.userData && props.user.userData.isAdmin ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        onClick={onUpdateHandler}
                        style={{ fontSize: "18px", marginRight: "1rem" }}
                    >
                        수정
                    </Button>
                    <Button
                        onClick={onShowModal}
                        type="danger"
                        style={{ fontSize: "18px" }}
                    >
                        삭제
                    </Button>
                    <Modal
                        title="등록 게시물 삭제"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p style={{ fontSize: "24px" }}>
                            <WarningTwoTone
                                twoToneColor="#FE2E2E"
                                style={{
                                    marginRight: "10px",
                                }}
                            />
                            정말 삭제하시겠습니까?
                        </p>
                    </Modal>
                </div>
            ) : null}
            <br />
            <Row gutter={[16, 16]}>
                {/* Product Image */}
                <Col lg={12} sm={24}>
                    <ProductImage detail={product} />
                </Col>
                {/* Product Info */}
                <Col lg={12} sm={24}>
                    <ProductInfo detail={product} />
                </Col>
            </Row>
        </div>
    );
}

export default DetailProductPage;
