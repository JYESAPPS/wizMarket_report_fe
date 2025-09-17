// Wiz App 커스텀

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreInfo } from '../../stores/storeInfoSlice';
import axios from "axios";
// import StoreInfo from "./Component/StoreInfo";
// import RisingMenu from "./Component/RisingMenu";
import CommercialDistrict from "./Component/CommercialDistrict";
// import CommonInformation from "./Component/CommonInformation";
import LocInfoAvgJscore from "./Component/LocInfoAvgJscore";
import Population from "./Component/Population";
import PopulationJscore from "./Component/PopulationJscore";
// import LocInfoJScore from "./Component/LocInfoJScore";
import PopulationResidentWork from "./Component/PopulationResidentWork";
// import CommercialDistrictAvgJScore from "./Component/CommercialDistrictAvgJScore";
import LocInfoMovePop from "./Component/LocInfoMovePop";
import CommercialDistrictMainCategoryCount from "./Component/CommercialDistrictMainCategoryCount";
// import CommercialDistirctJScore from "./Component/CommercialDistirctJScore";
import CommercialDistrictWeekdaySales from "./Component/CommercialDistrictWeekdaySales";
import CommercialDistrictTimeSales from "./Component/CommercialDistrictTimeSales";
//import CommercialDistrictRisingSales from "./Component/CommercialDistrictRisingSales";
import LocInfoHotPlace from "./Component/LocInfoHotPlace";
import RisingBusiness from "./Component/RisingBusiness";
import PlatformPerformanceCard from "./Component/PlatformPerformanceCard";
import Footer from "./Component/Footer";
// import StoreDescription from "./Component/StoreDescription";
// import StoreCategoryDescription from "./Component/StoreCategoryDescription";
// import LocTourInfo from "./Component/LocTourInfo";
// import RoadEventInfo from "./Component/RoadEventInfo";
// import Ad1 from "./Component/AD1";
// import Ad2 from "./Component/Ad2";
// import Ad3 from "./Component/Ad3";
// import StorePromotion from "./Component/StorePromotion";
// import MenuBar from "../../components/MenuBar";

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

    // const [tab, setTab] = useState("report");

    // const handleTabChange = async (newTab) => {
    //     if (newTab === "report") {
    //         try {
    //             const store_business_number = localStorage.getItem("store_business_number");
    //             if (!store_business_number) {
    //                 alert("사업자 번호가 없습니다. 다시 로그인 해주세요.");
    //                 return;
    //             }
    //             const payload = {
    //                 store_business_id : store_business_number
    //             }
    //             const response = await axios.post(
    //                 `${process.env.REACT_APP_FASTAPI_REPORT_URL}/report/get/store/uuid`,
    //                 payload,
    //                 {
    //                     headers: { 'Content-Type': 'application/json' },
    //                 }
    //             );

    //             const { uuid } = response.data;

    //             const REPORT_URL = `${process.env.REACT_APP_REPORT}/wizmarket/report/${uuid}`;

    //             window.location.href = REPORT_URL;
    //         } catch (error) {
    //             console.error("리포트 열기 실패:", error);
    //             alert("리포트 조회 중 오류가 발생했습니다.");
    //         }
    //     } else {
    //         setTab(newTab);
    //     }
    // };

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
            risingMenu: true,
            commercialDistrict: true,
            commonInfo: true,
            locInfoAvgJscore: true,
            population: true,
            locInfo: true,
            populationResidentWork: true,
            commercialDistrictAvgJscore: true,
            locInfoMovePop: true,
            commercialDistrictMainCategory: true,
            commercialDistrictJscore: true,
            commercialDistrictWeekdaySales: true,
            commercialDistrictTimeSales: true,
            commercialRisingSales: true,
            risingBusiness: true,
            storeDescription: true,
            storeCategoryDescription: true,
            // locTourInfo: true,
            roadEventInfo: true,
            locInfoHotPlace: true,
        },
        data: {
            storeInfo: null,
            risingMenu: null,
            commercialDistrict: null,
            commonInfo: null,
            locInfoAvgJscore: null,
            population: null,
            locInfo: null,
            populationResidentWork: null,
            commercialDistrictAvgJscore: null,
            locInfoMovePop: null,
            commercialDistrictMainCategory: null,
            commercialDistrictJscore: null,
            commercialDistrictWeekdaySales: null,
            commercialDistrictTimeSales: null,
            commercialRisingSales: null,
            risingBusiness: null,
            storeDescription: null,
            storeCategoryDescription: null,
            // locTourInfo: null,
            roadEventInfo: null,
            locInfoHotPlace: null,
        },
        error: {
            storeInfo: null,
            risingMenu: null,
            commercialDistrict: null,
            commonInfo: null,
            locInfoAvgJscore: null,
            population: null,
            locInfo: null,
            populationResidentWork: null,
            commercialDistrictAvgJscore: null,
            locInfoMovePop: null,
            commercialDistrictMainCategory: null,
            commercialDistrictJscore: null,
            commercialDistrictWeekdaySales: null,
            commercialDistrictTimeSales: null,
            commercialRisingSales: null,
            risingBusiness: null,
            storeDescription: null,
            storeCategoryDescription: null,
            // locTourInfo: null,
            roadEventInfo: null,
            locInfoHotPlace: null,
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
                key: 'commonInfo',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/common/info`
            },
            {
                key: 'commercialDistrict',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict`
            },
            {
                key: 'locInfoAvgJscore',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore/average`
            },
            {
                key: 'storeDescription',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/local/store/content`
            },
            {
                key: 'storeCategoryDescription',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/detail/category/content`
            },
            {
                key: 'population',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population`
            },
            {
                key: 'populationResidentWork',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/resident/work/compare`
            },
            {
                key: 'commercialDistrictAvgJscore',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/jscore/average`
            },
            {
                key: 'locInfoMovePop',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/move/population`
            },
            {
                key: 'locInfoHotPlace',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/hotplace`
            },
            {
                key: 'commercialDistrictMainCategory',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/mainCategory/count`
            },
            {
                key: 'commercialDistrictJscore',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/jscore`
            },
            {
                key: 'commercialDistrictWeekdaySales',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/weekday/sales`
            },
            {
                key: 'commercialDistrictTimeSales',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/time/sales`
            },
            {
                key: 'commercialRisingSales',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/commercialDistrict/rising/sales`
            },
            // {
            //     key: 'locTourInfo',
            //     url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/local/tour/info`
            // },
            {
                key: 'roadEventInfo',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/local/road/info`
            },
        ],
        secondary: [
            {
                key: 'risingMenu',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising/menu/advice`,
                condition: (storeData) => storeData?.biz_main_category_id === 1
            },
            {
                key: 'locInfo',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/jscore`
            },
            {
                key: 'risingBusiness',
                url: `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising/business`
            },
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

    // 헤더 표시에 사용할 매장명/업종명
    const storeName = states?.data?.storeInfo?.localStoreInfo?.store_name || '';
    const categoryName = storeInfoRedux?.detail_category_name || storeInfoRedux?.biz_detail_category_rep_name || '';

    return (
        <ErrorBoundary>
            <main className="report bg-gray-100 flex justify-center">
                <div className="w-full px-4">
                    {/* ---상단 Wiz 리포트 헤더--- */}
                    <section className="py-6 px-4">
                        {/* 로고 */}
                        <div className="flex items-center gap-3">
                            <div className="w-28 sm:w-32">
                                <img src="/assets/component/reportWizLogo.png" alt="Wiz" className="block w-full h-auto" />
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
                                <p className="text-sm sm:text-base text-gray-600 mt-2">· 등록한 업종: {categoryName}</p>
                            )}
                        </div>
                        
                        {/* 구분선 */}
                        <div className="h-px w-full bg-gray-300 my-6"></div>

                        {/* 마케팅 효과분석 소개 */}
                        <div className="mt-8">
                            <h2 className="text-lg sm:text-xl font-semibold text-black">마케팅 효과분석</h2>
                            <p className="text-gray-600 text-sm sm:text-base mt-2">
                                wizMarket AI리포트는 AI, 빅데이터를 기반으로 한 자체 마케팅 효과분석 솔루션을 적용하여 마케팅 효과 분석을 제공하고 있습니다.
                            </p>
                        </div>
                    </section>

                    {/* ---플랫폼 성과 지표--- */}
                    <section className="py-4 px-4">
                        <PlatformPerformanceCard />
                    </section>

                    {/* ---매장 info--- */}
                    {/* <section className="">
                        {renderSection(StoreInfo, 'storeInfo', { storeInfo: states.data.storeInfo, storeInfoRedux })}
                    </section> */}

                    {/* ---매장 상세정보--- */}
                    {/* {!states.error.storeDescription && !states.loading.storeDescription && states.data.storeDescription?.length > 0 && (
                        <section className="px-1 py-1">
                            {renderSection(StoreDescription, 'storeDescription', { storeDescriptions: states.data.storeDescription })}
                        </section>
                    )} */}

                    {/* ---전국 매출 증가 TOP5 / 해당 지역 매출 증가 TOP3--- */}
                    <section className="px-4 py-4">
                        {renderSection(RisingBusiness, 'risingBusiness', { risingBusiness: states.data.risingBusiness, storeInfoRedux })}
                    </section>

                    {/* ---입지점수--- */}
                    <section className="px-4 py-4">
                        {renderSection(LocInfoAvgJscore, 'locInfoAvgJscore', { locInfoAvgJscore: states.data.locInfoAvgJscore, storeInfoRedux })}
                    </section>

                    {/* <section className="px-1 py-1">
                        {renderSection(StorePromotion, 'storeInfo', { storeInfo: states.data.storeInfo, storeInfoRedux })}
                    </section> */}

                    {/* ---유동인구--- */}
                    <section className="px-4 py-4">
                        {renderSection(LocInfoMovePop, 'locInfoMovePop', { locInfoMovePop: states.data.locInfoMovePop, storeInfoRedux })}
                    </section>

                    {/* ---지역 경제 특성--- */}
                    <section className="px-4 py-4">
                        {renderSection(PopulationJscore, 'population', { population: states.data.population, storeInfoRedux })}
                    </section>

                    {/* 
                        <section className="px-1 py-1">
                            {renderSection(LocInfoJScore, 'locInfo', { locInfo: states.data.locInfo, storeInfoRedux })}
                        </section>
                    */}

                    {/* ---인구 분포--- */}
                    <section className="px-4 py-4">
                        {renderSection(Population, 'population', { population: states.data.population, storeInfoRedux })}
                    </section>

                    {/* ---주거 환경--- */}
                    <section className="px-4 py-4">
                        {renderSection(PopulationResidentWork, 'populationResidentWork', { populationResidentWork: states.data.populationResidentWork, storeInfoRedux })}
                    </section>

                    {/* ---중간 광고--- */}
                    {/* <section className="px-1 py-1">
                        <Ad1 />
                    </section>
                    <section className="px-1 py-1">
                        <Ad2 />
                    </section>
                    <section className="px-1 py-1">
                        <Ad3 />
                    </section> */}

                    {/* ---실시간 교통상황--- */}
                    {/* {states.data.roadEventInfo?.body?.items?.length > 0 && (
                        <section className="px-1 py-1">
                            {renderSection(RoadEventInfo, 'roadEventInfo', { roadEventInfo: states.data.roadEventInfo, storeInfoRedux })}
                        </section>
                    )} */}

                    {/* ---핫플레이스--- */}
                    <section className="px-4 py-4">
                        {renderSection(LocInfoHotPlace, 'locInfoHotPlace', { locInfoHotPlace: states.data.locInfoHotPlace, storeInfoRedux })}
                    </section>

                    {/* ---업종별 분포--- */}
                    <section className="px-4 py-4">
                        {renderSection(CommercialDistrictMainCategoryCount, 'commercialDistrictMainCategory', { commercialDistrictMainCategory: states.data.commercialDistrictMainCategory, storeInfoRedux })}
                    </section>

                    {/* ---우리 동네 매장 평균--- */}
                    <section className="px-4 py-4">
                        {renderSection(CommercialDistrict, 'commercialDistrict', { commercialDistrict: states.data.commercialDistrict, commercialDistrictJscore: states.data.commercialDistrictJscore, storeInfoRedux })}
                    </section>

                    {/* ---가장 많이 주문하는 메뉴--- */}
                    {/* <section className="px-1 py-1">
                        {renderSection(RisingMenu, 'risingMenu', { risingMenu: states.data.risingMenu, storeInfoRedux })}
                    </section> */}

                    {/* ---storeCategoryDescription--- */}
                    {/* {states.data.storeCategoryDescription && states.data.storeCategoryDescription?.length > 0 && (
                        <section className="px-1 py-1">
                            {renderSection(StoreCategoryDescription, 'storeCategoryDescription', { storeCategoryDescription: states.data.storeCategoryDescription, storeInfoRedux })}
                        </section>
                    )} */}

                    {/* ---공통정보--- */}
                    {/* {!states.error.commonInfo && !states.loading.commonInfo && states.data.commonInfo?.map((commonReport) => (
                        <section className="px-1 py-1" key={commonReport.common_information_id}>
                            {renderSection(CommonInformation, 'commonInfo', { commonReport })}
                        </section>
                    ))} */}

                    {/* ---동네상권--- */}
                    {/* <section className="px-1 py-1">
                        {renderSection(CommercialDistrictAvgJScore, 'commercialDistrictAvgJscore', { commercialDistrictAvgJscore: states.data.commercialDistrictAvgJscore, storeInfoRedux })}
                    </section> */}

                    {/* <section className="px-1 py-1">
                        // {renderSection(CommercialDistirctJScore, 'commercialDistrictJscore', { commercialDistrictJscore: states.data.commercialDistrictJscore, storeInfoRedux })}
                    </section> */}


                    {/* ---요일별 매출평균--- */}
                    <section className="px-4 py-4">
                        {renderSection(CommercialDistrictWeekdaySales, 'commercialDistrictWeekdaySales', { commercialDistrictWeekdaySales: states.data.commercialDistrictWeekdaySales, storeInfoRedux })}
                    </section>

                    {/* ---시간대별 매출평균--- */}
                    <section className="px-4 py-4">
                        {renderSection(CommercialDistrictTimeSales, 'commercialDistrictTimeSales', { commercialDistrictTimeSales: states.data.commercialDistrictTimeSales, storeInfoRedux })}
                    </section>

                    {/* ---우리지역에서 가장 잘되는 곳?--- */}
                    {/* <section className="px-1 py-1">
                        {renderSection(CommercialDistrictRisingSales, 'commercialRisingSales', { commercialRisingSales: states.data.commercialRisingSales, storeInfoRedux })}
                    </section> */}

                    {/* ---매창 근처에는 무엇이 있을까?--- */}
                    {/* <section className="px-1 py-1">
                        {renderSection(LocTourInfo, 'locTourInfo', { locTourInfo: states.data.locTourInfo, storeInfoRedux })}
                    </section> */}
                    {/* <div className="fixed bottom-0 left-0 w-full px-6 flex gap-4 bg-white py-2">
                        <MenuBar tab={tab} setTab={handleTabChange} />
                    </div> */}

                    <section className="px-4 py-4">
                        <Footer />
                    </section>
                </div>
            </main>
        </ErrorBoundary>
    );
});

export default Report;