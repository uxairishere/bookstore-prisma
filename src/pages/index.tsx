import { useEffect, useState } from "react"
import {BsTrashFill} from 'react-icons/bs'

export default function Home() {
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookGenre, setBookGenre] = useState<string>("");
  const [APIResponse, setAPIResponse] = useState<any>(null);
  
  useEffect(() => {
    readDB();
  }, [])

  const readDB =async () => {
    try {
      const response = await fetch('/api/books', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      setAPIResponse(await response.json())
      if (response.status !== 200) {
        console.log('something went wrong')
        //set an error banner here
      } else {
        resetForm()
        console.log('Data loaded successfully !!!')
        //set a success banner here
      }
    } catch (error) {
      console.log('there was an reading from database', error)
    }
  }

  const handleDelete = async (id:any) => {
    try {
      const body = { id: id }
      const response = await fetch('/api/delete', {
        method: 'POST ',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (response.status !== 200) {
        console.log('something went wrong')
        //set an error banner here
      } else {
        resetForm()
        readDB()
        console.log('Data deleted successfully !!!')
        //set a success banner here
      }
    } catch (error) {
      console.log('there was an error while deleting from database', error)
      
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const body = { bookTitle, bookAuthor, bookGenre }
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (response.status !== 200) {
        console.log('something went wrong')
        //set an error banner here
      } else {
        resetForm();
        readDB();
        console.log('form submitted successfully !!!')
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log('there was an error submitting', error)
    }
  }

  const resetForm = () => {
    setBookAuthor('')
    setBookTitle('')
    setBookGenre('')
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Suggest a book</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
          <form action="#" className="space-y-8">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book Title</label>
              <input onChange={(e: any) => setBookTitle(e.target.value)} type="text" id="book-title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Author</label>
              <input onChange={(e: any) => setBookAuthor(e.target.value)} type="text" id="author-name" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Genre</label>
              <input onChange={(e: any) => setBookGenre(e.target.value)} type="text" id="genre" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
            </div>
            <button onClick={handleSubmit} type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-full hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-cyan-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
          </form>
        </div>
        <div className="py-3 px-4 mx-auto max-w-screen-md">{ APIResponse?.map((book:any) => (
          <div key={book.id} className="flex justify-between items-center rounded-lg bg-green-500/10 text-green-500 px-3 border-[1px] border-green-500/30 mb-3">
            <h1>{book.bookTitle}</h1>
            <button onClick={() => handleDelete(book.id)} className="hover:text-red-500"><BsTrashFill/></button>
          </div>
        ))
          }</div>
      </section>
    </>
  )
}
