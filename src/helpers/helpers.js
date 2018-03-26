import * as R from 'ramda'

const minToMs = min => min * 60000

const checkIn = (xs, x) => (R.indexOf(x, xs) == -1 ? false : true)

export { checkIn, minToMs }
