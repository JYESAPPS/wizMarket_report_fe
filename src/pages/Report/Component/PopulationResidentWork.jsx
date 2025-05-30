import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import formatDate from '../../../utils/formatDate';

ChartJS.register(ArcElement, ChartDataLabels);

const PopulationResidentWork = ({ populationResidentWork, storeInfoRedux }) => {
    if (!populationResidentWork) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">storeInfo 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const { sub_district_name, nice_biz_map_data_ref_date } = storeInfoRedux;
    const { loc_info_resident, loc_info_work_pop, loc_info_resident_percent, loc_info_work_pop_percent } = populationResidentWork;

    const data = {
        labels: ['직장인구', '주거인구'],
        datasets: [
            {
                label: '인구 분포',
                data: [loc_info_work_pop, loc_info_resident],
                backgroundColor: ['#FF7F0E', '#1F77B4'],
                borderColor: ['rgba(255, 127, 14, 1)', 'rgba(31, 119, 180, 1)'],
                borderWidth: 1,
                cutout: '80%',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        const percentage = tooltipItem.label === '주거인구' ? loc_info_work_pop_percent : loc_info_resident_percent;
                        return `${tooltipItem.label}: ${value.toLocaleString()} (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                color: '#222',
                font: {
                    size: 16, // 내부 라벨 크기 줄임
                    weight: '600',
                },
                formatter: (value, context) => {
                    const percentage = context.dataIndex === 0 ? loc_info_work_pop_percent : loc_info_resident_percent;
                    return `    ${percentage}%\n(${value.toLocaleString()})`;
                },
                anchor: 'start', // 내부 라벨 위치
                align: 'start',
            },
        },
        layout: {
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }
    };

    // const externalLabelsPlugin = {
    //     id: 'external-labels',
    //     afterDatasetsDraw: (chart) => {
    //         const { ctx, data } = chart;
    //         const meta = chart.getDatasetMeta(0);
    //         ctx.save();
    //         ctx.font = 'bold 14px Arial'; // 외부 라벨 크기 줄임
    //         ctx.fillStyle = '#333';
    //         ctx.textAlign = 'center';

    //         meta.data.forEach((arc, index) => {
    //             const angle = Math.PI / 2 - arc.startAngle - (arc.endAngle - arc.startAngle) / 2;
    //             const radius = arc.outerRadius + 10; // 외부 라벨 위치 조정

    //             const x = arc.x + Math.cos(angle) * radius;
    //             const y = arc.y + Math.sin(angle) * radius;

    //             ctx.fillText(data.labels[index], x, y); // 외부 라벨 텍스트
    //         });

    //         ctx.restore();
    //     },
    // };

    // const plugins = [externalLabelsPlugin];

    const focusAreaText = loc_info_resident_percent > loc_info_work_pop_percent
        ? `${sub_district_name}은 주거인구가 ${loc_info_resident_percent}%를 차지하는 주거중심지역입니다.`
        : `${sub_district_name}은 직장인구가 ${loc_info_work_pop_percent}%를 차지하는 직장중심지역입니다.`;

    return (
        <div className='bg-white p-4 rounded-lg shadow-md space-y-6'>
            <div className="flex flex-col items-center">
                <div className="w-full">
                    <p className="text-lg font-bold text-opacity-80">{sub_district_name} 주거환경 <span className='text-xs font-normal text-black text-opacity-70'>{formatDate(nice_biz_map_data_ref_date)} 기준 자료</span></p>
                    <p className="py-4 text-lg text-[#000000] text-opacity-70">{focusAreaText}</p>
                </div>
                {/* 도넛 차트 */}
                <div className="flex justify-center">
                    <div className="">
                        {/* <Doughnut data={data} options={options} plugins={plugins} /> */}
                        <Doughnut data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopulationResidentWork;
