import React from 'react';
import GoogleTranslator from '../../../components/GoogleTranslator/GoogleTranslator';

const Footer = () => {
    return (
        <div id='footer'>
            <div className="text-center flex flex-col items-center py-4 px-2">
                <div className="">
                    <h1 className='min-w-[11rem] h-auto py-2'>
                        <img src="/assets/footer/wizmarket_logo.png" alt="Wiz-Market_logo" className='block w-full h-auto' />
                    </h1>
                </div>
                <div className='flex justify-between py-2 gap-2 '>
                    <p className='cursor-pointer text-sm font-medium'>Copyright JYES</p>
                    <p className='text-sm font-medium'>|</p>
                    <p className='cursor-pointer text-sm font-medium'>blog</p>
                    <p className='text-sm font-medium'>|</p>
                    <p className='cursor-pointer text-sm font-medium'>1:1문의</p>
                    <p className='text-sm font-medium'>|</p>
                    <GoogleTranslator />
                </div>
            </div>

        </div>
    );
};

export default Footer;