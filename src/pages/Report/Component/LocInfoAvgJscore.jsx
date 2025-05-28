import React from 'react';

const getScoreMessage = (score) => {
    if (!score && score !== 0) return '';

    switch (true) {
        case score >= 9:
            return '최상위 수준의 입지 조건을 보유하고 있어 사업 성공 가능성이 매우 높습니다.';
        case score >= 7:
            return '우수한 입지 조건을 갖추고 있어 사업하기에 매우 좋은 위치입니다.';
        case score >= 5:
            return '평균 이상의 입지 조건으로 사업 운영에 긍정적인 요소가 많습니다.';
        case score >= 2:
            return '기본적인 입지 조건은 갖추고 있으나, 경쟁력 향상을 위한 전략이 필요합니다.';
        default:
            return '입지 조건이 다소 열악하여 차별화된 운영 전략 수립이 필수적입니다.';
    }
};

const LocInfoAvgJscore = ({ locInfoAvgJscore, storeInfoRedux }) => {
    const { city_name, district_name, sub_district_name, loc_info_data_ref_date } = storeInfoRedux;

    if (!locInfoAvgJscore) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">locInfoAvgJscore 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    return (
        <div className='p-4 bg-[#000000] rounded-md tracking-tight shadow-md shadow-black-500 relative -mt-4'>
            <div className="py-2">
                <p className='text-white text-4xl pb-1 font-semibold'>
                    입지 점수 : <span className='text-[#46ff35] text-4xl font-extrabold'>
                        {locInfoAvgJscore.loc_info_j_score_average}p
                    </span>
                </p>
                <p className='text-white pb-1'>{city_name} {district_name} {sub_district_name}</p>
                <p className='text-gray-400 text-xs pb-1'>'전자정부 상권정보' {loc_info_data_ref_date}</p>
                <p className='text-white text-sm pb-2'>
                    {getScoreMessage(locInfoAvgJscore.loc_info_j_score_average)}
                </p>
                <p className='text-gray-400 text-xs'>
                    전국기준 = <span className='text-[#5BAB84] text-xs'>100% </span> 
                    참고 - 서초4동(강남역) = 9.03 / 10
                </p>
            </div>
        </div>
    );
};

export default LocInfoAvgJscore;