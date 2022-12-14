import {useRef, useState} from "react";
import {createBook} from "../../actions/book-actions";
import {useDispatch} from "react-redux";
import {isStringEmpty, isObjectEmpty} from "../../utils/utils"

function CreateBookForm() {
  const dispatch = useDispatch()

  const inputRef = useRef({
    name: null,
    author: null,
  })
  const elementsRef = useRef({
    name: useRef(null),
    author: useRef(null),
  })

  const [errors, setErrors] = useState({})
  const onSubmit = async () => {
    let errors = {}
    if (isStringEmpty(inputRef.current.name)) {
      errors.bookName='required'
    }
    if (isStringEmpty(inputRef.current.author)) {
      errors.bookAuthor='required'
    }
    if (isObjectEmpty(errors)) {
      dispatch({ type: "CREATE_BOOK", payload: {
          title: inputRef.current.name,
          author: inputRef.current.author,
        }})
      elementsRef.current.name.current.value = ''
      elementsRef.current.author.current.value = ''
      setErrors({})
    } else {
      setErrors(errors)
    }
  }
  return (
    <div className="create_book_form_wrapper">
      <form className="create_book_form row" onSubmit={e=>{e.preventDefault(); onSubmit()}}>
        <div className="create_book_input col-md-6" >
          <label htmlFor="bookName" className="form-label">Book Title</label>
          <input type="text" className="form-control" id="bookName" ref={elementsRef.current.name}
                 onChange={e => inputRef.current.name = e.target.value} data-cy="bookNameInput"/>
          {errors.bookName && <span className="form_error">This field is required</span>}
        </div>
        <div className="create_book_input col-md-6">
          <label htmlFor="bookAuthor" className="form-label">Book Author</label>
          <input type="text" className="form-control" id="bookAuthor"  ref={elementsRef.current.author}
                 onChange={e => inputRef.current.author = e.target.value} data-cy="bookAuthorInput"/>
          {errors.bookAuthor && <span className="form_error">This field is required</span>}
        </div>
        <div className="create_book_form_add_btn_wrapper">
            <button type="submit" className="btn btn-primary" data-cy="createBookButton">Create book</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBookForm