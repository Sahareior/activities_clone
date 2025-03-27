import React from 'react';

const Footer = () => {
    return (
        <div className=' max-w-5xl mb-16 mx-auto bg-white'>
            <footer >
  <div className='flex flex-col text-slate-500  py-9'>
    <div className='flex justify-cente gap-2'>
    <p className='text-[12px]'>This experience is powered by</p>
        <img src="https://thechildunplugged.zbooni.com/_next/static/media/zbooni-logo-black.ca8163a2.svg" alt="" />
    </div>

    <p className='text-[12px] text-cente mt-2'>The next generation platform for personalized commerce.</p>
  </div>
</footer>

        </div>
    );
};

export default Footer;