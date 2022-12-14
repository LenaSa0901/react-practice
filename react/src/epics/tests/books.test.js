import {asyncScheduler, scheduled} from "rxjs";
import {fetchBooksEpic} from "../../components/Epics/rootEpic";

const booksMock = {data: [{id: 1, authorName: "ttt", bookName: "uuu"}]}
jest.mock("../../actions/server", () => {
    return {get(){return Promise.resolve(booksMock)}}
});

describe ("Test Books", () => {
    it ("Tests BookFetch", (done) => {
        const booksEpic = fetchBooksEpic(scheduled([{type: "FETCH_BOOKS"}], asyncScheduler));
        booksEpic.subscribe((action) => {
            if (action.type === "FETCH_BOOKS_FULFILLED") {
                expect(action.payload).toEqual({books: booksMock.data});
                done()
            }
        });
    })
})