import React from 'react';
const CommercialDistrictAvgJScore = ({ commercialDistrictAvgJscore, storeInfoRedux }) => {

    if (!commercialDistrictAvgJscore) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrictAvgJscore 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    if (!commercialDistrictAvgJscore) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const { city_name, district_name, sub_district_name, nice_biz_map_data_ref_date, biz_detail_category_rep_name } = storeInfoRedux;

    return (
        <div className='p-4 bg-[#0D161F] rounded-md tracking-tight shadow-md shadow-black-500'>
            <div className="py-2">
                <p className='text-white text-4xl pb-1 font-semibold'>동네 상권은?: <span className='text-[#16DBCC] text-4xl font-extrabold'>{commercialDistrictAvgJscore.commercial_district_j_score_average}p</span></p>
                <p className='text-white  pb-1'>{city_name} {district_name} {sub_district_name} {biz_detail_category_rep_name} 업종</p>
                <p className='text-gray-400 text-xs  pb-1 '>'전자정부 상권정보' {nice_biz_map_data_ref_date}</p>
                <p className='text-white text-sm  pb-2 '>전반적으로 사업하기 용이한 좋은 입지 조건을 지니고 있습니다.</p>
                <p className='text-gray-400 text-xs'>전국기준 = <span className='text-[#5BAB84] text-xs'>100% </span> 참고) 서초4동(강남역) = 9.03 / 10</p>
            </div>
        </div>
    );
};

export default CommercialDistrictAvgJScore;