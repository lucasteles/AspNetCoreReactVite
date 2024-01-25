import { useState } from 'react'

interface Props {
  currentCount?: number
}

export const Counter = ({ currentCount }: Props) => {

  const [count, setCount] = useState(currentCount ?? 0)
  const increment = () => setCount(count + 1)

  return (
    <div>
      <h1>Counter</h1>

      <p>This is a simple example of a React component.</p>

      <p aria-live="polite">Current count: <strong>{count}</strong></p>

      <button className="btn btn-primary" onClick={increment}>Increment</button>
    </div>
  )
}
