# Travel Shopping Mall

React와 Node로 만든 여행 쇼핑몰 입니다

## Development Environment
* Front-End : React
* Back-End : Node.js
* Database : MoongoDB
* Design : Antd
* Tools : VSCODE

### Lecture
* JohnAn 인프런 강의

## 강의외 추가 개발

* 게시글 수정 및 삭제 기능:  관리자 계정만 수정 및 삭제 가능

### 게시글 수정 기능:
원래 게시글 데이터를 DetailPage에서 받아서 useHistory을 통해 페이지 이동과 state를 전달하여 UploadPage에서 수정 시엔 useLocation으로 받은 state를 이용 기존 정보 출력 <br />

![update](https://user-images.githubusercontent.com/56147655/111593891-ca01cc80-880d-11eb-9bc1-4323b8a47a0c.gif)

useHistory, useLocation으로 페이지 이동간 state 전달 할 수 있다 <br/>

### 게시글 삭제 기능:
삭제 구현, 만일 어떤 유저의 장바구니에 삭제하려는 상품이 있다면 해당 상품 삭제시 유저의 장바구니 안 상품도 삭제하도록 구현

![delete](https://user-images.githubusercontent.com/56147655/111594778-d6d2f000-880e-11eb-9e36-c9ea0af9f804.gif)



#### 더 나은 방법이 있다면 코멘트 부탁합니다!
