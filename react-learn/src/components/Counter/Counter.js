import React, { useState, useEffect, useRef } from 'react'
function Counter() {
  const [count, setCount] = useState(0)
  // useEffect(() => {
  //   // document.title = `${count }time`
  //   setCount(c => c + 1);
  //   // const id = setInterval(() => {
  //   // }, 1000);
  //   // return () => clearInterval(id)
  // }, [])

  const latestCount = useRef(count)
  useEffect(() => {
    console.log(latestCount.current)
    latestCount.current = count;
    setTimeout(() => {
      console.log(`clicked ${latestCount.current} times`)
    }, 3000)
  })
  return (
    <div>
      <p>you clicked {count} time</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  )
}

export default Counter  