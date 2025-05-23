import React from 'react';

const LocInfoHotPlace = ({ locInfoHotPlace, storeInfoRedux }) => {
    if (!locInfoHotPlace) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">locInfoHotPlace 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const { nice_biz_map_data_ref_date, district_name, sub_district_name } = storeInfoRedux;
    const date = new Date(nice_biz_map_data_ref_date);
    const month = date.getMonth() + 1;

    const salesData = [
        { rank: 1, data: locInfoHotPlace.loc_info_district_hot_place_top1_info },
        { rank: 2, data: locInfoHotPlace.loc_info_district_hot_place_top2_info },
        { rank: 3, data: locInfoHotPlace.loc_info_district_hot_place_top3_info },
        { rank: 4, data: locInfoHotPlace.loc_info_district_hot_place_top4_info },
        { rank: 5, data: locInfoHotPlace.loc_info_district_hot_place_top5_info },
    ];

    const [rank1District] = salesData[0].data ? salesData[0].data.split(",") : ["정보없음"];
    const [rank2District] = salesData[1].data ? salesData[1].data.split(",") : ["정보없음"];
    const [rank3District] = salesData[2].data ? salesData[2].data.split(",") : ["정보없음"];

    return (
        <div className="p-4 rounded-lg shadow-md " style={{ background: 'linear-gradient(to right, #6B78E8, #C67AF7)' }}>
            <div className="flex flex-col gap-4">
                <h2 className="text-sm text-white text-opacity-80 font-normal">
                    {month}월 우리 지역 {district_name}의 핫플레이스는?
                </h2>
                <p className="text-white text-2xl font-semibold py-2 div-underline-hotplace">{rank1District}, {rank2District}, {rank3District}</p>
            </div>
            <div className="grid grid-cols-[1.5fr_2fr_3fr_3fr_1fr] pt-2">
                <p className="text-white text-opacity-80 font-normal text-sm">순위</p>
                <p className="text-white text-opacity-80 font-normal text-sm">지역</p>
                <p className="text-white text-opacity-80 font-normal text-sm">평균유동인구</p>
                <p className="text-white text-opacity-80 font-normal text-sm">매장평균매출</p>
                <p className="text-white text-opacity-80 font-normal text-sm">점수</p>
            </div>
            <div className="divide-y divide-gray-200">
                {salesData.map((item, index) => {
                    const [districtName, movepop, sales, jscore] = item.data ? item.data.split(",") : ["-", 0, 0, 0, 0];
                    // const formattedSales = (parseInt(sales, 10) / 10000).toFixed(0);

                    const isHighlighted = districtName === sub_district_name;
                    const textStyle = isHighlighted ? "text-white text-sm font-semibold" : "text-white text-sm";
                    const rankStyle = isHighlighted ? "text-[#16DBCC] text-sm font-semibold" : "text-[#16DBCC] text-sm";

                    return (
                        <div key={index} className="grid grid-cols-[1.3fr_2fr_3fr_3fr_1fr] gap-2 py-2">
                            <p className={rankStyle} style={{ paddingLeft: '0.5em' }}>{item.rank}</p>
                            <p className={textStyle}>{districtName}</p>
                            <p className={textStyle}>{Intl.NumberFormat().format(movepop)}명</p>
                            <p className={textStyle}>{Intl.NumberFormat().format(sales / 10000)}만원</p>
                            <p className={textStyle}>{Number(jscore).toFixed(2)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LocInfoHotPlace;
