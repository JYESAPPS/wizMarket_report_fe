// 조언파트 묶음 컴포넌트(risingBusiness, locInfo, population)

import React from 'react';

const AdviceBlock = ({ title, html, showIcon = false }) => {
  if (!html) return null;
  return (
    <div className="py-4">
      {showIcon ? (
        <div className="flex justify-center">
          <div className="w-6 h-auto">
            <img src="/assets/component/tip.png" alt="팁 이미지" className="block w-full h-auto" />
          </div>
        </div>
      ) : (
        <>
          {/* <div className="flex justify-center">
            <div className="w-6 h-auto">
              <img src="/assets/component/tip.png" alt="팁 이미지" className="block w-full h-auto" />
            </div>
          </div> */}
        </>
      )}
      <p className="text-md font-bold py-1">{title}</p>
      <p className="text-lg" dangerouslySetInnerHTML={{ __html: html.replace(/\n/g, "<br />") }}></p>
    </div>
  );
};

const AdviceSummary = ({ risingBusiness, population }) => {
  const risingAdvice = risingBusiness?.rising_business_advice || '';
  const locAdvice = population?.loc_info_advice || '';
  const populationAdvice = population?.population_advice || '';

  if (!risingAdvice && !locAdvice && !populationAdvice) return null;

  return (
    <div className="text-2xl bg-white p-4 rounded-md tracking-tight shadow-md shadow-black-500">
      <AdviceBlock title="업종 트랜드 분석 및 조언" html={risingAdvice} showIcon />
      <AdviceBlock title="지역경제 특성에 따른 장사 전략 요약을 확인하세요." html={locAdvice} showIcon={false} />
      <AdviceBlock title="연령별 특성 및 응대방법을 제안드립니다." html={populationAdvice} showIcon={false} />
    </div>
  );
};

export default AdviceSummary;
