import React from 'react';

const MobileBlock = () => {
  return (
    <div className="h-screen w-screen bg-sand flex items-center justify-center text-center p-4">
      <div>
        <h1 className="text-wow-red text-3xl font-buran font-bold tracking-widest mb-2">Мобильные устройства не поддерживаются</h1>
        <p className="text-dirty-red text-xl font-moscow">Пожалуйста, откройте сайт на компьютере.</p>
      </div>
    </div>
  );
};

export default MobileBlock;
