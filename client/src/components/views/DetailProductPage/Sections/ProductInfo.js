import React, { useState } from "react";
import { Button, Descriptions, Popover } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";

function ProductInfo({ detail }) {
    const [popOver, setPopOver] = useState(false);

    const dispatch = useDispatch();

    const clickHandler = () => {
        // 필요한 정보를 Cart 필드에다가 넣어준다
        dispatch(addToCart(detail._id)).then((response) => {
            if (response.payload) {
                setPopOver(true);
            }
            setTimeout(() => {
                setPopOver(false);
            }, 2000);
        });
    };

    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Writer">
                    {detail && detail.writer && detail.writer.name}
                </Descriptions.Item>

                <Descriptions.Item label="Price">
                    {detail.price}
                </Descriptions.Item>
                <Descriptions.Item label="Sold">
                    {detail.sold}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {detail.description}
                </Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Popover
                    visible={popOver}
                    content={<div>장바구니에 담겼습니다</div>}
                    trigger="click"
                >
                    <Button
                        size="large"
                        shape="round"
                        type="danger"
                        onClick={clickHandler}
                    >
                        Add to Cart
                    </Button>
                </Popover>
            </div>
        </div>
    );
}

export default ProductInfo;
