import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import YouTube from '../../../components/Youtube';
import { hasYoutubeIframe } from '../../../utils/unescapeHTML';

const StoreDescription = ({ storeDescriptions }) => {
    if (!storeDescriptions || storeDescriptions.length === 0) {
        return null;
    }

    return (
        <div className="bg-white p-4 shadow-md shadow-black-500 rounded-lg">
            <div className="flex gap-1 py-2">
                <div className="w-6 h-6">
                    <img className='block w-full' src={process.env.PUBLIC_URL + "/assets/component/tip.png"} alt="별 이미지" />
                </div>
                <div className="">
                    <p className='text-[#FF1664] font-bold'>매장 정보</p>
                </div>
            </div>
            {storeDescriptions.map((storeDescription, index) => {
                const hasIframe = hasYoutubeIframe(storeDescription.store_description_content);
                return (
                    <div key={index} className="pb-4 flex gap-2">
                        <div className="py-2.5 flex flex-col items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-[#7864F9] rounded-full"></div>
                            <div className="w-[1px] h-full bg-[#EEE9FE]"></div>
                        </div>
                        <div className="w-full bg-[#F6F6F6] p-4 rounded-2xl overflow-hidden"> 
                            <h2 className="text-lg font-bold">{storeDescription.store_description_title}</h2>
                            {!hasIframe && storeDescription.store_description_content && (
                                <p
                                    className={`${storeDescription.store_description_img_url?.length > 0 ? 'text-black px-2 py-4 text-lg rounded-xl' : 'py-2 font-medium'}`}
                                    dangerouslySetInnerHTML={{
                                        __html: storeDescription.store_description_content
                                    }}
                                />
                            )}

                            {storeDescription.store_description_img_url &&
                                storeDescription.store_description_img_url.some(url => url !== null) && (
                                    <div className="w-full rounded-xl overflow-hidden mt-2"> 
                                        <Swiper
                                            modules={[Navigation, Pagination]}
                                            spaceBetween={10}
                                            slidesPerView={1}
                                            pagination={{ clickable: true }}
                                            className="w-full max-w-full" 
                                        >
                                            {storeDescription.store_description_img_url
                                                .filter(url => url !== null)
                                                .map((imgUrl, imgIndex) => (
                                                    <SwiperSlide key={imgIndex} className="w-full"> 
                                                        <div className="aspect-w-16 aspect-h-9 w-full"> 
                                                            <img
                                                                src={`${process.env.REACT_APP_FASTAPI_BASE_URL}${imgUrl}`}
                                                                alt={`${storeDescription.store_description_title} ${imgIndex + 1}`}
                                                                className="w-full h-64 object-cover rounded-xl"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                        </Swiper>
                                    </div>
                                )}

                            {hasIframe && <YouTube content={storeDescription.store_description_content} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StoreDescription;