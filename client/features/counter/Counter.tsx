import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'

import {
	decrement,
	increment,
	incrementByAmount,
	selectCount
} from './counterSlice'

function Counter() {
	const dispatch = useAppDispatch()
	const count = useAppSelector(selectCount)
	const [incrementAmount, setIncrementAmount] = useState('2')

	const incrementValue = Number(incrementAmount) || 0

	return (
		<div>
			<div>
				<button
					type='submit'
					aria-label='Decrement value'
					onClick={() => dispatch(decrement())}
				>
					-
				</button>
				<span>{count}</span>
				<button
					type='submit'
					aria-label='Increment value'
					onClick={() => dispatch(increment())}
				>
					+
				</button>
			</div>
			<div>
				<input
					aria-label='Set increment amount'
					value={incrementAmount}
					onChange={e => setIncrementAmount(e.target.value)}
				/>
				<button
					type='submit'
					onClick={() => dispatch(incrementByAmount(incrementValue))}
				>
					Add Amount Add Async
				</button>
			</div>
		</div>
	)
}

export default Counter
