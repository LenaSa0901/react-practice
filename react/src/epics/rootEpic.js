import { combineEpics } from 'redux-observable'
import { fetchBooks } from './books'

export const rootEpic = combineEpics(
    fetchBooks
)