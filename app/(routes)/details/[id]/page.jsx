'use client'
import React from 'react';

import { useParams } from 'next/navigation';
import CoffeeCatchupCard from '../_compo/CoffeeCatchupCard';
import Float from '@/app/(components)/Float';


const page = () => {
    const { id } = useParams();

  return (
    <div>
      <CoffeeCatchupCard />
      {/* <CartPage /> */}
      <Float />
    </div>
  );
};

export default page;