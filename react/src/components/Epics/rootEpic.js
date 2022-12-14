import {combineEpics, ofType} from "redux-observable";
import {from, map, Observable, switchMap} from "rxjs";
import Server from "../../actions/server";

export const fetchBooksEpic = (action$) => action$.pipe(
    ofType("FETCH_BOOKS"),
    switchMap(() => {
        return from(Server.get("/books"))
    }),
    map((res) => ({type: "FETCH_BOOKS_FULFILLED", payload: {books: res.data}}))
)

export const fetchSelectionsEpic = (action$) => action$.pipe(
    ofType("FETCH_SELECTIONS"),
    switchMap(() => from(Server.get("/selections"))),
    map((res) => ({type: "FETCH_SELECTIONS_FULFILLED", payload:  res.data}))
)

export const rootEpic = combineEpics(fetchBooksEpic, fetchSelectionsEpic)

export const fetchDataEpic = (action$) => {
    const books$ = fetchBooksEpic(action$)
    const selections$ = fetchSelectionsEpic(action$)

return new Observable((observer) => {
    books$.subscribe((value) => observer.next(value))
    selections$.subscribe((value) => observer.next(value))
})
}