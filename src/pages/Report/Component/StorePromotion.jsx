// import React, { useState } from 'react';
// import ModalWithIframe from './ModalWithIframe';

// const StorePromotion = ({ storeInfo, storeInfoRedux }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalUrl, setModalUrl] = useState('');

//     if (!storeInfo) {
//         return (
//             <div className="p-4 bg-white">
//                 <p className="text-red-500">storeInfo 데이터를 불러오는 중 오류가 발생했습니다</p>
//             </div>
//         );
//     }

//     // const { localStoreInfo, weatherInfo, aqi_info, format_current_datetime, store_info_advice } = storeInfo;
//     const { localStoreInfo } = storeInfo;

//     const {
//         store_business_number,
//         // road_name,
//         // store_name,
//         // building_name,
//         // floor_info,
//         // local_store_image_url
//     } = localStoreInfo;



//     const handleLinkClick = (event, storeBusinessNumber) => {
//         event.preventDefault();

//         const REPORT_URL = `${process.env.REACT_APP_ADS}/ads/temp2/${storeBusinessNumber}`;
//         setModalUrl(REPORT_URL);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setModalUrl('');
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-md">
//             <ModalWithIframe
//                 isOpen={isModalOpen}
//                 onClose={handleCloseModal}
//                 url={modalUrl}
//             />

//             <div className="p-4">
//                 <div className="cursor-pointer py-2" onClick={(e) => handleLinkClick(e, store_business_number)}>
//                     <img src="/assets/component/wizAD2.png" alt="Wiz-advice_icon" className='block w-full h-auto' />
//                 </div>

//                 {/* <div className="">
//                     <p className='py-4 font-bold text-black text-opacity-80'>우리 매장 온라인 홍보효과는?</p>
//                     <p>...</p>
//                 </div> */}
//             </div>


//         </div>
//     );
// };

// export default StorePromotion;
