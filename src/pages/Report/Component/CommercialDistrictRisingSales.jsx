import React from 'react';
import formatDate from '../../../utils/formatDate';

const CommercialDistrictRisingSales = ({ commercialRisingSales, storeInfoRedux }) => {
    if (!commercialRisingSales) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialRisingSales 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const { nice_biz_map_data_ref_date, biz_detail_category_rep_name, sub_district_name, district_name } = storeInfoRedux;
    const date = new Date(nice_biz_map_data_ref_date);
    const month = date.getMonth() + 1;

    const salesData = [
        { rank: 1, data: commercialRisingSales.commercial_district_detail_category_average_sales_top1_info },
        { rank: 2, data: commercialRisingSales.commercial_district_detail_category_average_sales_top2_info },
        { rank: 3, data: commercialRisingSales.commercial_district_detail_category_average_sales_top3_info },
        { rank: 4, data: commercialRisingSales.commercial_district_detail_category_average_sales_top4_info },
        { rank: 5, data: commercialRisingSales.commercial_district_detail_category_average_sales_top5_info },
    ];

    const [rank1District] = salesData[0].data ? salesData[0].data.split(",") : ["정보없음"];
    const [rank2District] = salesData[1].data ? salesData[1].data.split(",") : ["정보없음"];
    const [rank3District] = salesData[2].data ? salesData[2].data.split(",") : ["정보없음"];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-opacity-80">
                    {month}월 {district_name}에서 {biz_detail_category_rep_name}이 가장 잘 되는 곳은? <span className='text-xs font-normal text-black text-opacity-70'>{formatDate(nice_biz_map_data_ref_date)} 기준 자료</span>
                </h2>
                <p className="text-2xl font-bold py-2">{rank1District}, {rank2District}, {rank3District}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr_1fr] gap-4 mb-0">
                <p className="text-gray-700 text-base">순위</p>
                <p className="text-gray-700 text-base">지역</p>
                <p className="text-gray-700 text-base">매출</p>
            </div>
            <div className="divide-y divide-gray-200 mt-0">
                {/* TOP 5 목록 */}
                {salesData.map((item, index) => {
                    const [districtName, sales] = item.data ? item.data.split(",") : ["정보없음", "0"];
                    const formattedSales = (parseInt(sales, 10) / 10000).toFixed(0);

                    const isHighlighted = districtName === sub_district_name;
                    const textStyle = isHighlighted ? "text-gray-700 text-base font-black" : "text-gray-700 text-base";
                    const rankStyle = isHighlighted ? "text-[#1B59F8] text-base font-black" : "text-[#1B59F8] text-base";

                    return (
                        <div key={index} className="grid grid-cols-[60px_1fr_1fr] gap-4 py-2">
                            <p className={rankStyle} style={{ paddingLeft: '0.5em' }}>{item.rank}</p>
                            <p className={textStyle}>{districtName}</p>
                            <p className={textStyle}>{Intl.NumberFormat().format(formattedSales)}만원</p>
                        </div>
                    );
                })}

                {/* 현재 매장 지역이 TOP 5에 없는 경우 추가 행 표시 */}
                {!salesData.some(item => item.data && item.data.split(",")[0] === sub_district_name) && (
                    <>
                        <div className="border-t border-gray-300 my-2"></div>
                        <div className="grid grid-cols-[60px_1fr_1fr] gap-4 py-2">
                            <p className="text-[#1B59F8] text-base font-black" style={{ paddingLeft: '0.5em' }}>-</p>
                            <p className="text-gray-700 text-base font-black">{sub_district_name}</p>
                            <p className="text-gray-700 text-base font-black">순위 외</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CommercialDistrictRisingSales;
