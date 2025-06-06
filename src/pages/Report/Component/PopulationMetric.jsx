const PopulationMetric = ({ label, value, jScore }) => {
    // label이 "소득(만원)"이나 빈 문자열이 아닐 때만 'K' 표시
    const shouldDisplayK = label !== "소득(만원)" && label !== "";

    return (
        <div className="flex flex-col items-center justify-center">
            <p className='text-xs font-bold'>{label}</p>
            <p className='text-lg font-extrabold'>
                {value}
                {shouldDisplayK ? 'K' : ''}
            </p>
            <div
                className={`w-10 h-10 rounded-[50%] text-center text-white text-lg font-bold content-center 
                    ${jScore <= 2 ? 'bg-blue-500' :
                        jScore <= 4 ? 'bg-green-500' :
                            jScore <= 6 ? 'bg-yellow-500' :
                                jScore <= 8 ? 'bg-pink-500' :
                                    jScore <= 10 ? 'bg-red-500' : 'bg-transparent'
                    }`}
            >
                {jScore}
            </div>
        </div>
    );
};

export default PopulationMetric