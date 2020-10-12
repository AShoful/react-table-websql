import React from 'react';
import Title from '../Title';
import VirtualScroll from './VirtualScroll';
import { data } from '../function';

const Page2 = () => {
  return (
    <>
      <Title title="Страница 2" />
      <div style={{ margin: 10 }}>
        <VirtualScroll data={data} rowHeight={40} visibleRows={8} />
      </div>
    </>
  );
};

export default Page2;
