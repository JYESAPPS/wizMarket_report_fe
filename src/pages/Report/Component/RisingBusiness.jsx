import React from 'react';
import formatDateYM from '../../../utils/formatDateYM';

const RisingBusiness = ({ risingBusiness, storeInfoRedux }) => {
    if (!risingBusiness) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">risingBusiness 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    // 전국 TOP5 및 지역 TOP3 데이터 추출
    // const nationwide_top5 = [
    //     risingBusiness.rising_business_data.rising_business_national_rising_sales_top1_info,
    //     risingBusiness.rising_business_data.rising_business_national_rising_sales_top2_info,
    //     risingBusiness.rising_business_data.rising_business_national_rising_sales_top3_info,
    //     risingBusiness.rising_business_data.rising_business_national_rising_sales_top4_info,
    //     risingBusiness.rising_business_data.rising_business_national_rising_sales_top5_info,
    // ];

    const sub_district_top3_data = [
        risingBusiness.rising_business_data.rising_business_sub_district_rising_sales_top1_info,
        risingBusiness.rising_business_data.rising_business_sub_district_rising_sales_top2_info,
        risingBusiness.rising_business_data.rising_business_sub_district_rising_sales_top3_info,
    ];

    const {nice_biz_map_data_ref_date} = storeInfoRedux;

    return (
        <div className='bg-white p-4 rounded-md tracking-tight shadow-md shadow-black-500'>
            <p className="text-sm text-black text-opacity-70">{formatDateYM(nice_biz_map_data_ref_date)}</p>
            <div className="pb-10">
                {/* <h2 className="text-xl font-bold mb-4">최근 뜨는 점포업종은?</h2> */}

                {/* {nationwide_top5.length > 0 ? (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold pb-2">전국 매출 증가 업종 TOP5</h3>
                        {nationwide_top5.map((item, index) => {
                            const [district_name, sub_district_name, biz_detail_category_name, growth_rate] = item.split(',');
                            return (
                                <div key={index} className="pb-2 flex justify-between gap-4">
                                    <p className='text-md truncate'>
                                        <span className="font-bold text-blue-500">{index + 1}. </span>
                                        <span>{district_name} {sub_district_name} | </span>
                                        <span>{biz_detail_category_name === "소분류없음" ? '뜨는 업종이 없습니다.' : biz_detail_category_name}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold text-blue-500">{parseFloat(growth_rate).toFixed(1)}%</span>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="">Top5 데이터 오류</div>
                )} */}

                {sub_district_top3_data.length > 0 ? (
                    <div className='div-underline'>
                        <h3 className="text-lg font-semibold pb-2">
                            {risingBusiness.rising_business_data.sub_district_name} 매출 증가 업종 TOP3
                        </h3>
                        {sub_district_top3_data.map((item, index) => {
                            const [district_name, sub_district_name, biz_detail_category_name, growth_rate] = item.split(',');
                            return (
                                <div key={index} className="pb-2 flex justify-between">
                                    <p className='text-md'>
                                        <span className="font-bold text-blue-500">{index + 1}. </span>
                                        <span>{district_name} {sub_district_name} | </span>
                                        <span>{biz_detail_category_name === "소분류없음" ? '뜨는 업종이 없습니다.' : biz_detail_category_name}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold text-blue-500">{parseFloat(growth_rate).toFixed(1)}%</span>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="">Top3 데이터 오류</div>
                )}
            </div>
            <div className="">
                <div className="flex justify-center">
                    <div className="w-6 h-auto">
                        <img src="/assets/component/tip.png" alt="팁 이미지" className='block w-full h-auto' />
                    </div>
                </div>
                <p className='py-4 font-semibold'>최근 뜨는 업종을 통한 마켓 트랜드 분석 및 조언</p>
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: risingBusiness.rising_business_advice.replace(/\n/g, "<br />") }}></p>
            </div>
        </div>
    );
};

export default RisingBusiness;
