import React from 'react';
import List from "../components/List";
import Board from "../components/Board";
import CreateBoard from '@/components/CreateBoard';

export default function Home() {
  return (
    <>
      {/* <CreateBoard/> */}
      <Board/>
    </>
  )
}
// export async function getServerSideProps() {
//     console.log({pp: process.env})
// }
