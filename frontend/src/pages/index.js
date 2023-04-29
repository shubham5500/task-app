import React from 'react';
import List from "../components/List";
import Board from "../components/Board";

export default function Home() {
  return (
    <main>
      <div className="w-1/2 mx-auto">
        {/*<CreateBoard/>*/}
        <Board/>
      </div>
    </main>
  )
}
