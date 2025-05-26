const RoadEventInfo = ({ roadEventInfo }) => {


    const items = roadEventInfo.body.items || [];
    if (items.length === 0) {
        return (
            <div className="p-4 bg-white">
                <p className="text-gray-500">도로 돌발 교통상황 정보가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold text-opacity-80">실시간 주변 교통상황 상태는?!</p>
            {items.map((item, index) => (
                <div key={index} className="flex justify-between gap-2 py-4">
                    <div className="flex-2 flex items-center">
                        <div className="w-14 h-14">
                            <img className='w-full h-auto' src="/assets/component/roadEvent.png" alt="느낌표" />
                        </div>
                    </div>
                    <div className="text-lg leading-5 flex-1 flex flex-col gap-1">
                        <p className="font-extrabold text-gray-800">{item.type} <span className='text-[#A2A2A2] font-normal'>| {item.eventType}</span> </p>
                        <p className="text-[#000000B2]">{item.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoadEventInfo;
