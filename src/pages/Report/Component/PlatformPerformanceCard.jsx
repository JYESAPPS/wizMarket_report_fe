import React from 'react';

const PlatformPerformanceCard = () => {
    const platformData = [
        {
            logo: "/assets/component/instaLogo.png",
            metrics: [
                { label: "포스팅 수", value: "45" },
                { label: "좋아요 수", value: "249" },
                { label: "팔로워", value: "2" },
                { label: "참여율", value: "14%" }
            ]
        },
        {
            logo: "/assets/component/blogLogo.png",
            metrics: [
                { label: "업로드 수", value: "45" },
                { label: "방문자리뷰", value: "148" },
                { label: "블로그리뷰", value: "193" },
                { label: "평점", value: "4.47" }
            ]
        },
        {
            logo: "/assets/component/placeLogo.png",
            metrics: [
                { label: "포스팅 수", value: "25.7K" },
                { label: "멤버 수", value: "25.7K" },
                { label: "조회수", value: "65.2K" },
                { label: "ROI", value: "6.2%" }
            ]
        },
        {
            logo: "/assets/component/bandLogo.png",
            metrics: [
                { label: "포스팅 수", value: "25.7K" },
                { label: "이웃 수", value: "25.7K" },
                { label: "방문자 수", value: "258" },
                { label: "C-RANK", value: "35%" }
            ]
        },
        {
            logo: "/assets/component/xLogo.png",
            metrics: [
                { label: "포스팅 수", value: "25.7K" },
                { label: "팔로워 수", value: "25.7K" },
                { label: "방문자 수", value: "258" },
                { label: "참여율", value: "6.2%" }
            ]
        },
        {
            logo: "/assets/component/youtubeLogo.png",
            metrics: [
                { label: "업로드 수", value: "45" },
                { label: "좋아요 수", value: "249" },
                { label: "구독자 수", value: "20.1K" },
                { label: "참여율", value: "14%" }
            ]
        }
    ];

    // 부제용 날짜 계산: 현재 기준 이전 달 표기
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const yyyy = prevMonth.getFullYear();
    const mm = String(prevMonth.getMonth() + 1).padStart(2, '0');
    const subtitleText = `${yyyy}-${mm}월 마케팅은 지난달 대비 효과가 낮습니다.`;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* <h2 className="text-xl font-semibold text-gray-800 mb-6">플랫폼 성과 지표</h2> */}
            
            {/* MEI 상단 카드 */}
            <section aria-label="MEI 요약 카드" className="">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">마케팅 효과지수(MEI) 추이</h3>
                <p className="text-sm md:text-base text-gray-600 mt-1">{subtitleText}</p>
                <div className="mt-3 md:mt-4">
                    <img 
                        src="/assets/component/MEI.png" 
                        alt="MEI trend chart" 
                        className="w-full rounded-lg shadow-sm object-contain" 
                    />
                </div>
            </section>

            <div className="space-y-4 mt-4">
                {platformData.map((platform, index) => (
                    <div key={index} className="flex items-center space-x-1 p-2 bg-gray-50 rounded-lg">
                        {/* 플랫폼 로고 */}
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img 
                                src={platform.logo} 
                                alt="platform logo" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        
                        {/* 지표들 */}
                        <div className="flex-1 flex">
                            {platform.metrics.map((metric, metricIndex) => (
                                <div key={metricIndex} className="flex-1 text-center relative">
                                    <div className="text-xs text-gray-600 mb-1">
                                        {metric.label}
                                    </div>
                                    <div className="text-sm font-semibold text-black">
                                        {metric.value}
                                    </div>
                                    {/* 구분선 */}
                                    {metricIndex < platform.metrics.length - 1 && (
                                        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlatformPerformanceCard;
