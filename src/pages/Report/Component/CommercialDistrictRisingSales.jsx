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

    // 데이터 정제 및 유효성 검사를 포함한 salesData 생성
    const salesData = [
        { rank: 1, data: commercialRisingSales.commercial_district_detail_category_average_sales_top1_info },
        { rank: 2, data: commercialRisingSales.commercial_district_detail_category_average_sales_top2_info },
        { rank: 3, data: commercialRisingSales.commercial_district_detail_category_average_sales_top3_info },
        { rank: 4, data: commercialRisingSales.commercial_district_detail_category_average_sales_top4_info },
        { rank: 5, data: commercialRisingSales.commercial_district_detail_category_average_sales_top5_info },
    ].map(item => {
        if (!item.data) return null;
        
        const [districtName, salesStr] = item.data.split(",");
        const sales = parseInt(salesStr, 10);
        
        if (!salesStr || isNaN(sales) || sales === 0) return null;
        
        return {
            ...item,
            districtName,
            sales,
            formattedSales: (sales / 10000).toFixed(0)
        };
    }).filter(Boolean); // null 값 제거

    // TOP 3 추출 (수정된 부분)
    const top3Districts = salesData
        .slice(0, 3)
        .map(item => item.districtName)
        .filter(Boolean);  // null/undefined 제거

        // 유효한 매출 데이터가 있는지 확인
    const hasSalesData = salesData.some(item => item.sales > 0);

    // 매출 데이터가 없으면 컴포넌트를 렌더링하지 않음
    if (!hasSalesData) {
        return null;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-opacity-80">
                    {month}월 {district_name}에서 {biz_detail_category_rep_name}이 가장 잘 되는 곳은? 
                    <span className='text-xs font-normal text-black text-opacity-70 ml-2'>
                        {formatDate(nice_biz_map_data_ref_date)} 기준 자료
                    </span>
                </h2>
                {top3Districts.length > 0 && (
                    <p className="text-2xl font-bold py-2">{top3Districts.join(', ')}</p>
                )}
            </div>
            
            {salesData.length > 0 ? (
                <>
                    <div className="grid grid-cols-[60px_1fr_1fr] gap-4 mb-0">
                        <p className="text-gray-700 text-base">순위</p>
                        <p className="text-gray-700 text-base">지역</p>
                        <p className="text-gray-700 text-base">매출</p>
                    </div>
                    <div className="divide-y divide-gray-200 mt-0">
                        {salesData.map((item) => {
                            const isHighlighted = item.districtName === sub_district_name;
                            const textStyle = isHighlighted ? "text-gray-700 text-base font-black" : "text-gray-700 text-base";
                            const rankStyle = isHighlighted ? "text-[#1B59F8] text-base font-black" : "text-[#1B59F8] text-base";

                            return (
                                <div key={item.rank} className="grid grid-cols-[60px_1fr_1fr] gap-4 py-2">
                                    <p className={rankStyle} style={{ paddingLeft: '0.5em' }}>{item.rank}</p>
                                    <p className={textStyle}>{item.districtName}</p>
                                    <p className={textStyle}>{Intl.NumberFormat().format(item.formattedSales)}만원</p>
                                </div>
                            );
                        })}

                        {!salesData.some(item => item.districtName === sub_district_name) && (
                            <>
                                <div className="border-t border-gray-300 my-2"></div>
                                <div className="grid grid-cols-[60px_1fr_1fr] gap-4 py-2">
                                    <p className="text-[#1B59F8] text-base font-black" style={{ paddingLeft: '0.5em' }}>순위 외</p>
                                    <p className="text-gray-700 text-base font-black">{sub_district_name}</p>
                                </div>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <div className="py-8 text-center">
                    <p className="text-gray-500">
                        해당지역 내 업종의 표본수가 매우 적을 경우 사업자 정보보호를 위해 매출정보를 제공하지 않습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CommercialDistrictRisingSales;