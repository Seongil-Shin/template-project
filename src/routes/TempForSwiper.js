import React from "react";
import ImageSwiper from "../components/elements/ImageSwiper";

const cards = [
   {
      image: "https://t1.daumcdn.net/cfile/tistory/9945234B5E09CAB61D",
      subject: "첫번째",
      description: "첫번째입니다.",
   },
   {
      image:
         "https://pds.joins.com/news/component/htmlphoto_mmdata/201809/09/htm_2018090984648725255.jpg",
      subject: "두번째",
      description: "두번째입니다.",
   },
   {
      image:
         "https://images.chosun.com/resizer/RmctbWNTbUgId9z0XRnzB-VHSKc=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/3ZGKCINBDD54LISJRGKQLD6IIU.jpg",
      subject: "세번째",
      description: "세번째입니다.",
   },
   {
      image:
         "https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2019/11/PS19111300065.jpg",
      subject: "네번째",
      description: "네번째입니다.",
   },
   {
      image:
         "http://www.futurekorea.co.kr/news/photo/201910/122202_123779_5033.jpg",
      subject: "다섯번째",
      description: "다섯번째입니다.",
   },
];

export default function TempForSwiper() {
   return (
      <>
         <div style={{ height: "70px" }}></div>
         <ImageSwiper inputCards={cards} />
      </>
   );
}
