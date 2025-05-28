import React from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import formatDate from '../../../utils/formatDate';

ChartJS.register(ArcElement, ChartDataLabels);

// 상수
const MIN_SAMPLE_SIZE = 5; // 최소 표본 수 기준

const CommercialDistrictMainCategoryCount = ({ commercialDistrictMainCategory, storeInfoRedux }) => {
    if (!commercialDistrictMainCategory) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrictMainCategory 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const {
        commercial_district_food_business_count,
        commercial_district_healthcare_business_count,
        commercial_district_education_business_count,
        commercial_district_entertainment_business_count,
        commercial_district_lifestyle_business_count,
        commercial_district_retail_business_count
    } = commercialDistrictMainCategory;

    const dataValues = [
        commercial_district_food_business_count,
        commercial_district_healthcare_business_count,
        commercial_district_education_business_count,
        commercial_district_entertainment_business_count,
        commercial_district_lifestyle_business_count,
        commercial_district_retail_business_count
    ];

    // 데이터 유효성 검사 추가
    const hasValidData = dataValues.some(value => value > 0);
    
    if (!hasValidData) {
        return (
            <div className='bg-white p-4 rounded-lg shadow-md'>
                <p className="text-lg font-bold text-opacity-80">
                    {storeInfoRedux.sub_district_name} 업종별 분포 
                    <span className='text-xs font-normal text-black text-opacity-70 ml-2'>
                        {formatDate(storeInfoRedux.nice_biz_map_data_ref_date)} 기준 자료
                    </span>
                </p>
                <div className="py-8 text-center">
                    <p className="text-gray-500">
                        해당지역 내 업종의 표본수가 매우 적을 경우 사업자 정보보호를 위해 정보를 제공하지 않습니다.
                    </p>
                </div>
            </div>
        );
    }

    const dataLabels = ['음식점', '의료/건강', '학문/교육', '여가/오락', '생활서비스', '소매/유통'];

    // 유효한 데이터와 라벨 필터링
    const validDataWithLabels = dataValues
        .map((value, index) => ({
            value,
            label: dataLabels[index]
        }))
        .filter(item => item.value >= MIN_SAMPLE_SIZE);
    
    // 필터링된 데이터와 라벨 분리
    const filteredValues = validDataWithLabels.map(item => item.value);
    const filteredLabels = validDataWithLabels.map(item => item.label);

    const maxIndex = filteredValues.indexOf(Math.max(...filteredValues));
    const minIndex = filteredValues.indexOf(Math.min(...filteredValues));

    const mostCommonCategory = filteredLabels[maxIndex];
    const leastCommonCategory = filteredLabels[minIndex];

    const data = {
        labels: filteredLabels,
        datasets: [
            {
                data: filteredValues,
                backgroundColor: [
                    '#FFF5EB',
                    '#F16913',
                    '#FD8D3C',
                    '#FDA26B',
                    '#FDD0A2',
                    '#FEE6C2'
                ].slice(0, filteredLabels.length), // 필터링된 데이터 수만큼 색상 사용
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            datalabels: {
                formatter: (value) => value,
                color: '#000',
                font: {
                    weight: '',
                    size: 14
                },
                align: 'center',
                anchor: 'center',
                offset: 0,
                display: true
            }
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 40,
                bottom: 40,
                left: 40,
                right: 40
            }
        }
    };

    const secondPlugin = {
        id: 'second-datalabels',
        afterDatasetsDraw: (chart) => {
            const { ctx, data } = chart;
            const meta = chart.getDatasetMeta(0);

            ctx.save();
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';

            meta.data.forEach((arc, index) => {
                const model = arc;
                const angle = Math.PI / 2 - model.startAngle - (model.endAngle - model.startAngle) / 2;
                const radius = model.outerRadius + 20;

                const x = model.x + Math.cos(angle - 1.6) * radius;
                const y = model.y - Math.sin(angle - 1.6) * radius;

                ctx.fillStyle = '#333';
                ctx.fillText(data.labels[index], x, y);
            });

            ctx.restore();
        }
    };

    const plugins = [secondPlugin];

    const formattedDate = formatDate(storeInfoRedux.nice_biz_map_data_ref_date);

    return (
        <div className='bg-white p-4 rounded-lg shadow-md'>
                <p className="text-lg font-bold text-opacity-80">{storeInfoRedux.sub_district_name} 업종별 분포 <span className='text-xs font-normal text-black text-opacity-70'>{formattedDate} 기준 자료</span></p>
                <p className='pt-4 text-lg text-[#000000] text-opacity-70'>
                    {storeInfoRedux.sub_district_name}은 {mostCommonCategory} 업종이 가장 많고 {leastCommonCategory} 업종이 가장 적게 분포합니다.
                </p>
            <div className="h-64">
                <Pie data={data} options={options} plugins={plugins} />
            </div>
        </div>
    );
};

export default CommercialDistrictMainCategoryCount;
