// 가게정보 커스텀


import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreInfo } from '../../stores/storeInfoSlice';
import axios from "axios";
import Population from "./Component/Population";
import PopulationJscore from "./Component/PopulationJscore";
import Footer from "./Component/Footer";

// import StoreDescription from "./Component/StoreDescription";
// import StoreCategoryDescription from "./Component/StoreCategoryDescription";
// import LocTourInfo from "./Component/LocTourInfo";
// import RoadEventInfo from "./Component/RoadEventInfo";
// import Ad1 from "./Component/AD1";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>컴포넌트 마운트 문제.</div>;
        }
        return this.props.children;
    }
}

const Report = React.memo(() => {
    const { uuid } = useParams();

    // 페이지 한정: 확대/축소 및 가로 스크롤 방지
    useEffect(() => {
        // 기존 viewport 메타 백업 후 잠금 설정
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        const prevViewportContent = viewportMeta?.getAttribute('content');
        if (viewportMeta) {
            viewportMeta.setAttribute(
                'content',
                'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
            );
        }

        // iOS 핀치 제스처 차단
        const preventDefault = (e) => {
            e.preventDefault();
        };

        // 더블탭 줌 차단
        let lastTouchEnd = 0;
        const onTouchEnd = (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        };

        // Ctrl + 휠 줌 차단
        const onWheel = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        window.addEventListener('gesturestart', preventDefault);
        window.addEventListener('gesturechange', preventDefault);
        window.addEventListener('gestureend', preventDefault);
        window.addEventListener('touchend', onTouchEnd, { passive: false });
        window.addEventListener('wheel', onWheel, { passive: false });

        // 본 페이지 체류 동안만 가로 스크롤 잠금
        const prevOverflowX = document.body.style.overflowX;
        document.body.style.overflowX = 'hidden';

        return () => {
            window.removeEventListener('gesturestart', preventDefault);
            window.removeEventListener('gesturechange', preventDefault);
            window.removeEventListener('gestureend', preventDefault);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('wheel', onWheel);
            document.body.style.overflowX = prevOverflowX;
            if (viewportMeta && typeof prevViewportContent === 'string') {
                viewportMeta.setAttribute('content', prevViewportContent);
            }
        };
    }, []);

    useEffect(() => {
        const fetchStoreBusinessId = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/get/uuid/store`,
                    { uuid },
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                set_store_business_id(response.data.store_business_number);
            } catch (error) {
                console.error("매장번호 조회 실패:", error);
            }
        };

        if (uuid) {
            fetchStoreBusinessId();
        }
    }, [uuid]);

    const [store_business_id, set_store_business_id] = useState(null);
    const dispatch = useDispatch();
    const storeInfoRedux = useSelector((state) => state.storeInfo);

    const errorHandler = useCallback((error, source) => {
        console.error(`Error in ${source}:`, error);

    }, []);

    window.onerror = function (message, source, lineno, colno, error) {
        errorHandler(error, 'window.onerror');
        return false;
    };


    const [states, setStates] = useState({
        loading: {

            storeInfo: true,
            population: true,
            dailyTip: true,
            trendAdvice: true,
        },
        data: {

            storeInfo: null,
            population: null,
            dailyTip: null,
            trendAdvice: null,
        },
        error: {

            storeInfo: null,
            population: null,
            dailyTip: null,
            trendAdvice: null,
        }
    });

    const [storeInfoReceived, setStoreInfoReceived] = useState(false);

    const ENDPOINT_GROUPS = useMemo(() => ({
        essential: [
            {
                key: 'storeInfoRedux',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info/redux`,
                reduxAction: true
            },
        ],
        primary: [
            {
                key: 'storeInfo',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info`
            },
            {
                key: 'population',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population`
            },
            {
                key: 'dailyTip',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/ai/daily-tip`
            },
            {
                key: 'trendAdvice',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/ai/trend-advice`
            },
        ],
        secondary: [
        ],
    }), []);

    const fetchEndpoint = useCallback(async (endpoint, controller, isMountedRef) => {
        if (!isMountedRef.current) return;

        try {
            const response = await axios.get(endpoint.url, {
                params: { store_business_id },
                timeout: 60000,
                signal: controller.signal,
                retry: 3,
                retryDelay: 1500
            });

            if (!isMountedRef.current) return;

            if (endpoint.condition && !endpoint.condition(storeInfoRedux)) {
                setStates(prev => ({
                    ...prev,
                    loading: { ...prev.loading, [endpoint.key]: false }
                }));
                return;
            }

            if (endpoint.reduxAction) {
                dispatch(fetchStoreInfo.fulfilled(response.data));
                setStoreInfoReceived(true);
            } else {
                setStates(prev => ({
                    ...prev,
                    data: { ...prev.data, [endpoint.key]: response.data },
                    loading: { ...prev.loading, [endpoint.key]: false }
                }));
            }
        } catch (error) {
            if (!isMountedRef.current || error.name === 'AbortError') return;

            errorHandler(error, `fetchEndpoint ${endpoint.key}`);

            setStates(prev => ({
                ...prev,
                error: { ...prev.error, [endpoint.key]: error.message },
                loading: { ...prev.loading, [endpoint.key]: false }
            }));

            if (endpoint.reduxAction) {
                dispatch(fetchStoreInfo.rejected(null, null, error));
            }
        }
    }, [store_business_id, dispatch, storeInfoRedux, errorHandler]);

    const fetchGroupWithDelay = useCallback(async (endpoints, delay = 0, controller, isMountedRef) => {
        if (!isMountedRef.current) return;

        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        const BATCH_SIZE = 3;
        for (let i = 0; i < endpoints.length; i += BATCH_SIZE) {
            if (!isMountedRef.current) return;

            const batch = endpoints.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(endpoint =>
                fetchEndpoint(endpoint, controller, isMountedRef)
            ));
        }
    }, [fetchEndpoint]);

    useEffect(() => {
        const isMountedRef = { current: true };
        const controller = new AbortController();

        const fetchEssentialData = async () => {
            if (!store_business_id || !isMountedRef.current) return;

            try {
                await fetchGroupWithDelay(ENDPOINT_GROUPS.essential, 0, controller, isMountedRef);
            } catch (error) {
                errorHandler(error, 'Error fetchEssentialData');
            }
        };

        fetchEssentialData();

        return () => {
            isMountedRef.current = false;
            controller.abort();
        };
    }, [store_business_id, fetchGroupWithDelay, ENDPOINT_GROUPS.essential, errorHandler]);

    useEffect(() => {
        const isMountedRef = { current: true };
        const controller = new AbortController();

        const fetchRemainingData = async () => {
            if (!storeInfoReceived || !storeInfoRedux || !isMountedRef.current) return;

            try {
                await Promise.all([
                    fetchGroupWithDelay(ENDPOINT_GROUPS.primary, 100, controller, isMountedRef),
                    fetchGroupWithDelay(ENDPOINT_GROUPS.secondary, 200, controller, isMountedRef)
                ]);
            } catch (error) {
                errorHandler(error, 'fetchRemainingData');
            }
        };

        fetchRemainingData();

        return () => {
            isMountedRef.current = false;
            controller.abort();
        };
    }, [storeInfoRedux, storeInfoReceived, fetchGroupWithDelay, ENDPOINT_GROUPS, errorHandler]);

    const renderSection = useCallback((Component, key, additionalProps = {}) => {
        if (states.loading[key]) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }

        if (states.error[key]) {
            return (
                <div className="p-4 bg-white rounded-lg shadow">
                    <p className="text-red-500">
                        '{key}' 데이터를 불러오는 중 오류가 발생했습니다: {states.error[key]}
                    </p>
                </div>
            );
        }

        return states.data[key] ? <Component {...states.data[key]} {...additionalProps} /> : null;
    }, [states]);

    // 헤더 및 AI 섹션에서 사용할 데이터
    const storeName = states?.data?.storeInfo?.localStoreInfo?.store_name || '';
    const categoryName = storeInfoRedux?.detail_category_name || storeInfoRedux?.biz_detail_category_rep_name || '';
    const dailyTip = states?.data?.dailyTip?.gpt_answer || '';
    const trendAdviceRaw = states?.data?.trendAdvice?.gpt_answer || '';

    const parseTrendAdvice = useCallback((text) => {
        if (!text) {
            return { analysis: '', recommendation: '' };
        }

        const cleaned = text.replace(/\r/g, '').trim();
        const [analysisSection, rest] = cleaned.split(/조언\s*[:：]/);
        const analysis = analysisSection ? analysisSection.replace(/분석\s*[:：]?/g, '').trim() : '';
        const recommendation = rest ? rest.trim() : '';

        return { analysis, recommendation };
    }, []);

    const formatParagraphs = (text) => {
        if (!text) return [];
        const normalized = text.replace(/<br\s*\/?>/gi, '\n');
        return normalized.split(/\n+/).map(line => line.trim()).filter(Boolean);
    };

    const trendAdvice = useMemo(
        () => parseTrendAdvice(trendAdviceRaw),
        [parseTrendAdvice, trendAdviceRaw]
    );

    const renderTextCard = (title, content, badgeLabel = "INFO") => (
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center text-xs font-semibold text-white bg-black rounded-full px-3 py-1">
                    {badgeLabel}
                </span>
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>

            {content ? (
                <div className="space-y-4 text-gray-800 leading-relaxed text-lg">
                    {formatParagraphs(content).map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </div>
            ) : (
                <p className="text-lg text-gray-400">데이터를 불러오는 중이거나 아직 준비되지 않았습니다.</p>
            )}
        </section>
    );

    const renderPromoPlaceholder = () => (
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center text-xs font-semibold text-white bg-black rounded-full px-3 py-1">
                    AI
                </span>
                <h2 className="text-lg font-semibold text-gray-900">AI 홍보 이미지</h2>
            </div>
            <p className="text-sm text-gray-500">AI가 생성한 홍보 이미지를 곧 만나보실 수 있어요.</p>
            <div className="w-full h-48 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-sm">
                추후 이미지가 추가될 예정입니다.
            </div>
        </section>
    );

    const renderTrendAdviceCard = () => (
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center text-xs font-semibold text-white bg-black rounded-full px-3 py-1">AI</span>
                    <h2 className="text-lg font-semibold text-gray-900">분석 및 조언</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl bg-gray-50 p-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-700">분석</p>
                    {trendAdvice.analysis ? formatParagraphs(trendAdvice.analysis).map((line, idx) => (
                        <p key={idx} className="text-lg text-gray-800 leading-relaxed">{line}</p>
                    )) : <p className="text-lg text-gray-400">분석 내용이 없습니다.</p>}
                </div>
                <div className="rounded-2xl bg-gray-50 p-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-700">조언</p>
                    {trendAdvice.recommendation ? formatParagraphs(trendAdvice.recommendation).map((line, idx) => (
                        <p key={idx} className="text-lg text-gray-800 leading-relaxed">{line}</p>
                    )) : <p className="text-lg text-gray-400">조언 내용이 없습니다.</p>}
                </div>
            </div>
        </section>
    );

    return (
        <ErrorBoundary>
            <main className="report bg-gray-100 flex justify-center overflow-x-hidden" style={{ touchAction: 'pan-y' }}>
                <div className="w-full px-4">
                    {/* ---상단 Wiz 리포트 헤더--- */}
                    <section className="py-6 px-4">
                        {/* 로고 */}
                        <div className="flex items-center gap-3">
                            <div className="w-28 sm:w-32">
                                <img src={process.env.PUBLIC_URL + "/assets/component/reportWizLogo.png"} alt="Wiz" className="block w-full h-auto" />
                            </div>
                            <span className="text-3xl sm:text-3xl font-normal text-black">
                                리포트
                            </span>
                        </div>

                        {/* 매장명 / 업종 */}
                        <div className="mt-8">
                            {storeName && (
                                <h1 className="text-3xl sm:text-3xl font-semibold text-left text-black">{storeName}</h1>
                            )}
                            {categoryName && (
                                <p className="text-base sm:text-base text-gray-800 mt-2">· 등록한 업종 : {categoryName}</p>
                            )}
                        </div>

                        {/* 구분선 */}
                        <div className="h-px w-full bg-gray-300 my-3"></div>

                        {/* 마케팅 효과분석 소개 */}
                        {/* <div className="mt-8">
                            <h2 className="text-lg sm:text-xl font-semibold text-black">마케팅 효과분석</h2>
                            <p className="text-gray-800 text-base sm:text-base mt-2">
                                wizMarket AI리포트는 AI, 빅데이터를 기반으로 한 자체 마케팅 효과분석 솔루션을 적용하여 마케팅 효과 분석을 제공하고 있습니다.
                            </p>
                        </div> */}
                    </section>

                    {/* ---플랫폼 성과 지표--- */}
                    {/* <section className="py-4 px-4">
                        <PlatformPerformanceCard />
                    </section> */}

                    <section className="px-4 space-y-6 pb-8">
                        {renderTextCard("매장 운영 AI 팁!", states.loading.dailyTip ? "" : dailyTip)}
                        {renderPromoPlaceholder()}
                        {renderTrendAdviceCard()}

                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">지역경제 특성</h2>
                            {renderSection(PopulationJscore, 'population', { population: states.data.population, storeInfoRedux, hideAdvice: true })}
                            {renderTextCard(
                                "지역경제 특성 분석",
                                states.loading.population ? "" : (states.data.population?.loc_info_advice || ""),
                                "ECONOMY"
                            )}
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">연령별 특성 및 응대방법</h2>
                            {renderTextCard(
                                "연령별 특성 및 응대방법",
                                states.loading.population ? "" : (states.data.population?.population_advice || ""),
                                "TIP"
                            )}
                            {renderSection(Population, 'population', { population: states.data.population, storeInfoRedux, hideAdvice: true })}
                        </section>

                        <section className="space-y-4">
                            <Footer />
                        </section>
                    </section>
                </div>
            </main>
        </ErrorBoundary>
    );
});

export default Report;