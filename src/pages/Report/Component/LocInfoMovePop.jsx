import React from 'react';

const LocInfoMovePop = ({ locInfoMovePop, storeInfoRedux }) => {
    if (!locInfoMovePop) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">locInfoMovePop 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const { city_name, sub_district_name } = storeInfoRedux;
    const { loc_info_move_pop_j_score, loc_info_move_pop, loc_info_city_move_pop } = locInfoMovePop;

    const popComparison = loc_info_move_pop > loc_info_city_move_pop ? "높은" : "적은";

    const maxPopulation = 250000;

    const cityPercentage = parseInt((loc_info_city_move_pop / maxPopulation) * 250);
    const localPercentage = parseInt((loc_info_move_pop_j_score) * 21);

    return (
        <div className='bg-white p-4 rounded-lg shadow-md space-y-6'>
            <div className="flex flex-col items-center">
                <div className="text-center pb-6">
                    <p className='text-lg font-bold text-opacity-80'>매장 인근 ({sub_district_name}) 유동인구</p>
                    <p className='text-xs py-4 font-sem'>
                        일 평균 <span className='font-bold text-3xl'>{loc_info_move_pop.toLocaleString("ko-KR")}</span>
                        <span className='font-bold text-xl'>명</span>
                    </p>
                    <p>우리지역은 {city_name}에서 유동인구가 {popComparison} 편입니다</p>
                </div>
                <div className="pt-10 flex justify-center items-center gap-4 w-full">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-[#57B3B9] font-bold">
                        {loc_info_move_pop_j_score}
                    </div>
                    <div className="bg-[#F2F2F2] w-[250px] h-6 rounded-xl flex relative">
                        <div className="bg-[#57B3B9] absolute top-[-50px] p-2 rounded-lg translate-x-[-45%] z-10 min-w-36 flex justify-center items-center"
                            style={{ left: `${cityPercentage}px` }}>
                            <p className='text-white text-xs max-w-36 truncate text-center'>
                                {city_name} 평균 유동인구
                            </p>
                        </div>
                        <div className="bg-[#57B3B9] absolute top-[-31px] w-4 h-4 z-0"
                            style={{ left: `${cityPercentage + 5}px`, transform: 'rotate(45deg)' }}>
                        </div>
                        <div className="bg-[#16DBCC] w-[22px] h-[22px] rounded-full absolute"
                            style={{ left: `${localPercentage}px` }}>
                        </div>
                        <div className="bg-[#CF4432] w-[22px] h-[22px] rounded-full absolute"
                            style={{ left: `${cityPercentage}px` }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocInfoMovePop;
