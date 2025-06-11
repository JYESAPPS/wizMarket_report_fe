import React from 'react';
import formatDate from '../../../utils/formatDate';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);



const CommercialDistrict = ({ commercialDistrict, commercialDistrictJscore, storeInfoRedux }) => {
    if (!commercialDistrict) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrict 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    // 레이더 그래프
    const {
        commercial_district_market_size_j_socre = 0,
        commercial_district_average_sales_j_socre = 0,
        commercial_district_usage_count_j_socre = 0,
        commercial_district_sub_district_density_j_socre = 0,
        commercial_district_sub_average_payment_j_socre = 0
    } = commercialDistrictJscore || {};

    const labels = ['시장규모', '평균매출', '이용건수', '점포밀도', '평균결제금액'];
    const scores = [
        commercial_district_market_size_j_socre,
        commercial_district_average_sales_j_socre,
        commercial_district_usage_count_j_socre,
        commercial_district_sub_district_density_j_socre,
        commercial_district_sub_average_payment_j_socre
    ];

    // 낮은 점수와 높은 점수를 나누기
    // const lowScores = labels.filter((_, i) => scores[i] < 3.0);
    // const highScores = labels.filter((_, i) => scores[i] >= 3.0);

    const data = {
        labels,
        datasets: [
            {
                label: '상권 분석 점수',
                data: scores,
                backgroundColor: 'rgba(244, 117, 96, 0.25)',
                borderColor: 'rgba(244, 117, 96, 1)',
                borderWidth: 1,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(244, 117, 96, 1)',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                grid: {
                    circular: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 10,
                pointLabels: {
                    display: true,
                    font: {
                        size: 12
                    },
                    padding: 5,
                },
                ticks: {
                    display: false,
                    stepSize: 2
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: false
            }
        },
    };
    //레이더 그래프 오류메세지
    // if (!commercialDistrictJscore) {
    //     return (
    //         <div className="p-4 bg-white">
    //             <p className="text-red-500">commercialDistrictJscore 데이터를 불러오는 중 오류가 발생했습니다</p>
    //         </div>
    //     );
    // }

    const {
        commercial_district_national_density_average,
        commercial_district_sub_district_density_average,
        commercial_district_national_average_sales,
        commercial_district_sub_district_average_sales,
        commercial_district_national_average_payment,
        commercial_district_sub_district_average_payment,
        commercial_district_national_usage_count,
        commercial_district_sub_district_usage_count,
        commercial_district_average_sales_max_percent_weekday,
        commercial_district_average_sales_min_percent_weekday,
        commercial_district_average_sales_max_percent_time,
        commercial_district_average_sales_max_percent_client_top1,
        commercial_district_average_sales_max_percent_client_top2,
    } = commercialDistrict;

    const { district_name, sub_district_name, nice_biz_map_data_ref_date } = storeInfoRedux;

    // 주요고객 섹션 표시 여부
    const showMainCustomers = commercial_district_average_sales_max_percent_client_top1 !== "-" &&
        commercial_district_average_sales_max_percent_client_top2 !== "-";

    // 매출비중 섹션 표시 여부
    const showSalesDistribution = commercial_district_average_sales_max_percent_weekday !== "-" &&
        commercial_district_average_sales_max_percent_time !== "-" &&
        commercial_district_average_sales_min_percent_weekday !== "-";

    // 점포당 매출규모 섹션 표시 여부
    const showSalesScale = commercial_district_national_average_sales !== 0 &&
        commercial_district_sub_district_average_sales !== 0 &&
        district_name;

    // 평균 결제단가/이용건수 섹션 표시 여부
    const showPaymentAndUsage = commercial_district_sub_district_average_payment !== 0 &&
        commercial_district_sub_district_usage_count !== 0;

    // 밀집도 섹션 표시 여부
    const showDensity = commercial_district_sub_district_density_average !== 0 &&
        commercial_district_national_density_average !== 0;

    // 모든 섹션이 숨겨진 경우 체크
    const noDataAvailable = !showMainCustomers && !showSalesDistribution &&
        !showSalesScale && !showPaymentAndUsage && !showDensity;

    // 모든 섹션의 데이터가 있는지 체크
    const allDataAvailable = showMainCustomers && showSalesScale && showPaymentAndUsage && showDensity;

    // 모든 데이터가 없으면 알림문 띄움
    // if (!allDataAvailable) {
    //     return (
    //         <div className="bg-white p-4 rounded-lg shadow-md">
    //             <p className='text-lg font-bold text-opacity-80'>
    //                 {sub_district_name} {storeInfoRedux.biz_detail_category_rep_name} 매장 평균 
    //                 <span className='text-xs font-normal text-black text-opacity-70 ml-2'>
    //                     {formatDate(nice_biz_map_data_ref_date)} 기준 자료
    //                 </span>
    //             </p>
    //             <div className="py-8 text-center">
    //                 <p className="text-gray-500">해당지역 내 업종의 표본수가 매우 적을 경우 사업자 정보보호를 위해 정보를 제공하지 않습니다.</p>
    //             </div>
    //         </div>
    //     );
    // }

    // 모든 데이터가 없으면 섹터자체 없앰
    if (!allDataAvailable) {
        return null;
    }

    return (
        <div className='bg-white p-4 rounded-lg shadow-md'>
            <div className="">
                {/* <p className="text-md font-semibold py-4">{storeInfoRedux.sub_district_name} {storeInfoRedux.biz_detail_category_rep_name} 상권분석</p> */}
                {/* <p className='text-md text-opacity-80 pb-4'>내 점포 사업 요약 <span className='text-xs text-opacity-80'>{formatDate(nice_biz_map_data_ref_date)}</span></p> */}
                <p className='text-lg font-bold text-opacity-80'>{sub_district_name} {storeInfoRedux.biz_detail_category_rep_name} 매장 평균 <span className='text-xs font-normal text-black text-opacity-70'>{formatDate(nice_biz_map_data_ref_date)} 기준 자료</span></p>

                {/* 레이더 그래프 - allDataAvailable 조건부 렌더링 */}
                {allDataAvailable && (
                    <div className="w-full h-72 flex justify-center">
                        <Radar data={data} options={options} />
                    </div>
                )}

                {/* <div className="text-sm text-gray-500 pt-4">
                                <div className="flex justify-center">
                                    <div className="w-6 h-auto">
                                        <img src="/assets/component/advice_icon.png" alt="Wiz-advice_icon" className='block w-full h-auto' />
                                    </div>
                                </div>
                                <p className='text-md font-bold py-2'>분석 및 조언</p>
                                <p className="text-lg">AI 조언.....</p>
                            </div> */}
            </div>

            <div className="">
                {showMainCustomers && (
                    <div className="py-4 text-right">
                        <p className='text-lg font-semibold text-black text-opacity-70'>주요고객은</p>
                        <p className='text-2xl font-bold text-black text-opacity-70'>
                            {commercial_district_average_sales_max_percent_client_top1}, {commercial_district_average_sales_max_percent_client_top2}
                        </p>
                    </div>
                )}

                {/* {showSalesDistribution && (
                    <div className="py-4 text-right">
                        <p className='text-md font-semibold text-black text-opacity-70'>{sub_district_name} {biz_detail_category_rep_name} 매출비중</p>
                        <p className='text-2xl font-bold text-black text-opacity-70'>
                            {`${commercial_district_average_sales_max_percent_weekday} ${commercial_district_average_sales_max_percent_time} `}
                            <span className='font-normal text-black text-opacity-70'>에 매출이 가장 높고</span>
                        </p>
                        <p className='text-2xl font-bold text-black text-opacity-70'>
                            {` ${commercial_district_average_sales_min_percent_weekday}`}
                            <span className='font-normal text-black text-opacity-70'> 매출이 가장 낮아요</span>
                        </p>
                    </div>
                )} */}

                {showSalesScale && (
                    <div className="py-4 text-right">
                        <p className='text-lg font-semibold text-black text-opacity-70'>점포당 매출규모는</p>
                        <p className='text-sm font-normal text-black text-opacity-70'>전월대비
                            {commercial_district_national_average_sales > commercial_district_sub_district_average_sales
                                ? ` ${Math.round((commercial_district_national_average_sales - commercial_district_sub_district_average_sales) / 10000).toLocaleString()}만원 감소`
                                : ` ${Math.round((commercial_district_sub_district_average_sales - commercial_district_national_average_sales) / 10000).toLocaleString()}만원 증가`}
                        </p>
                        <p className='text-[2.5rem] font-bold text-black text-opacity-70'>{Math.round(commercial_district_sub_district_average_sales / 10000).toLocaleString()}만원</p>
                        <p className='text-base text-black text-opacity-70'>
                            우리 {sub_district_name}은 {district_name}의 다른 동에 비해</p>
                        <p className='text-base text-black text-opacity-70'>{commercial_district_sub_district_average_sales > commercial_district_national_average_sales
                            ? "장사가 잘되는 편입니다."
                            : "장사가 안되는 편입니다."}
                        </p>
                    </div>
                )}

                {showPaymentAndUsage && (
                    <div className="py-4 text-right">
                        <p className='text-lg font-semibold text-black text-opacity-70'>평균 객단가는</p>
                        <p className='text-sm font-normal text-black text-opacity-70'>
                            {commercial_district_national_average_payment > commercial_district_national_usage_count
                                ? ` 감소추세`
                                : ` 증가추세`}
                        </p>
                        <p className='text-[2.5rem] font-bold text-black text-opacity-70 '>{commercial_district_sub_district_average_payment.toLocaleString()}원</p>
                        <p className='text-base text-black text-opacity-70'>우리 {sub_district_name}은 {district_name}의 다른 동에 비해
                            {commercial_district_national_average_payment > commercial_district_sub_district_average_payment
                                ? ` 객단가가 낮은 편입니다.`
                                : ` 객단가가 높은 편입니다.`}
                        </p>

                        <p className='text-base text-black text-opacity-70'> 이용건수는 {commercial_district_sub_district_usage_count.toLocaleString()}건으로
                            {commercial_district_national_usage_count > 0 ? (
                                commercial_district_national_usage_count > commercial_district_sub_district_usage_count ? (
                                    ` ${((commercial_district_national_usage_count - commercial_district_sub_district_usage_count) / commercial_district_national_usage_count * 100).toFixed(2)}% 감소하였습니다`
                                ) : (
                                    ` ${((commercial_district_sub_district_usage_count - commercial_district_national_usage_count) / commercial_district_national_usage_count * 100).toFixed(2)}% 증가하였습니다`
                                )
                            ) : (
                                " 전국 평균 이용건수가 없습니다."
                            )}</p>
                    </div>
                )}

                {showDensity && (
                    <div className="py-4 text-right">
                        <p className='text-lg font-semibold text-black text-opacity-70'>경쟁매장 밀집도는 얼마나</p>
                        <p className='text-[2.5rem] font-bold text-black text-opacity-70'>{commercial_district_sub_district_density_average}%</p>
                        <p className='text-base text-black text-opacity-70'>전국 평균 수치보다 {commercial_district_sub_district_density_average > commercial_district_national_density_average ? "높습니다." : "낮습니다."}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommercialDistrict;