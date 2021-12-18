import React, { useState } from 'react';

const  ForTest=()=> {
  // Объявление новой переменной состояния «count»
  const [count, setCount] = useState(0);
  console.log(count);

  const incCount=()=>{
    setCount(count+1);
    console.log(`после клика ${count}`)
  }
  {
  return (
    <div>
      <p>Вы кликнули {count} раз(а)</p>
      <button onClick={()=>incCount()}>
        Нажми на меня
      </button>
    </div>
  );
  }
}

export default ForTest;