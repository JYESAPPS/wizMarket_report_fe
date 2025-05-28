import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const LocTourInfo = ({ locTourInfo }) => {
    const [showAll, setShowAll] = useState(false);
    const [groupedItems, setGroupedItems] = useState({});

    // 대분류(cat1)별로 아이템 그룹화
    // useEffect(() => {
    //     if (locTourInfo?.response?.body?.items?.item) {
    //         const grouped = locTourInfo.response.body.items.item.reduce((acc, item) => {
    //             const category = item.cat2_name || '기타';
    //             if (!acc[category]) {
    //                 acc[category] = [];
    //             }
    //             acc[category].push(item);
    //             return acc;
    //         }, {});
    //         setGroupedItems(grouped);
    //     }
    // }, [locTourInfo]);

    {/* 대분류(cat2)별로 아이템 그룹화, 허용된 카테고리만 포함 */}
    useEffect(() => {
    if (locTourInfo?.response?.body?.items?.item) {
        const allowedCategories = ['문화시설', '축제'];
        
        const grouped = locTourInfo.response.body.items.item.reduce((acc, item) => {
            const category = item.cat2_name || '기타';
            
            // 허용된 카테고리만 포함
            if (allowedCategories.includes(category)) {
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(item);
            }
            return acc;
        }, {});
        
        setGroupedItems(grouped);
    }
    }, [locTourInfo]);


    if (!locTourInfo?.response?.body?.items) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">locTourInfo 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const categoryList = Object.entries(groupedItems);

    // 허용된 카테고리 데이터가 없으면 렌더링하지 않음
    if (categoryList.length === 0) {
        return null;
    }

    const visibleCategories = showAll ? categoryList : categoryList.slice(0, 3);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-opacity-80">매장 근처에는 무엇이 있을까?</p>

            {visibleCategories.map(([category, categoryItems]) => (
                <div key={category} className="py-6">
                    {/* <h3 className="text-lg font-bold text-gray-800 pb-4">{categoryItems[0].cat1_name} / {category}</h3> */}
                    <h3 className="text-lg font-bold text-gray-800 pb-4">{category}</h3>
                    <Swiper spaceBetween={16} slidesPerView={1.2} className="w-full">
                        {categoryItems.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="rounded-lg">
                                    {/* 이미지 조건부 렌더링 수정 */}
                                    <img
                                        src={item.firstimage ? item.firstimage : '/assets/component/noImage.png'}
                                        alt={item.title || '이미지 없음'}
                                        className="w-full h-48 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/assets/component/noImage.png';
                                        }}
                                    />
                                    <div className="">
                                        <div className="flex gap-2 leading-[30px] items-center">
                                            <p className="font-bold">{item.title}</p>
                                            <p className="text-[#D9D9D9]">|</p>
                                            <p className="text-sm">{item.cat3_name}</p>
                                        </div>
                                        <div className="flex gap-1 leading-[30px] items-center">
                                            <p className="bg-[#3B82F6] min-w-8 text-xs rounded-md text-white text-center px-0.5">거리</p>
                                            <p className='text-xs text-[#808080] font-bold'>{Math.round(item.dist)}m</p>
                                            <p className="text-[#D9D9D9]">|</p>
                                            <p className="text-xs text-[#808080]">{item.addr1} {item.addr2}</p>
                                        </div>


                                        <p className="text-sm text-gray-600"></p>
                                        <p className="text-sm text-gray-500"></p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}

            {categoryList.length > 3 && !showAll && (
                <div className="flex justify-center items-center gap-1 cursor-pointer text-[#1B59F8] font-bold bg-white" onClick={() => setShowAll(true)}>
                    더 보기
                    <div className="w-2.5 h-2.5">
                        <img className="block w-full h-auto" src="/assets/component/ic.png" alt="펼치기" />
                    </div>
                </div>
            )}

            {showAll && (
                <div className="flex justify-center items-center gap-1 cursor-pointer text-[#1B59F8] font-bold bg-white" onClick={() => setShowAll(false)}>
                    접기
                    <div className="w-2.5 h-2.5">
                        <img style={{ transform: 'rotate(180deg)' }} className="block w-full h-auto" src="/assets/component/ic.png" alt="접기" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocTourInfo;
