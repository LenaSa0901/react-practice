import { map, mergeMap } from "rxjs/operators";
import { ofType } from 'redux-observable';
import SERVER from '../actions/server'

const fetchALLBooksFullfilled = payload => ({ type: "FETCH_BOOKS_FULFILLED", payload })


export const fetchBooks = (action$) => action$.pipe(
    ofType("FETCH_BOOKS"),
    mergeMap(() => 
        SERVER.get('/books').pipe(
            map((res) => fetchALLBooksFullfilled(res))
    ))
)