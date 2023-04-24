import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    return await addBook(req, res)
  } else if(req.method === 'GET'){
    return await readBooks(req,res);
  } else if (req.method === 'DELETE'){
    return await deleteBook(req,res);
  }
   else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function readBooks(req:any, res:any) {
  try {
    const allbooks = await prisma.bookSugesstion.findMany();
    return res.status(200).json(allbooks, {success: true});
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Error reading from database"}, {success: false})
  }
}

async function addBook(req:any, res:any) {
  const body = req.body
  try {
    const newEntry = await prisma.bookSugesstion.create({
      data: {
        bookTitle: body.bookTitle,
        bookAuthor: body.bookAuthor,
        bookGenre: body.bookAuthor,
      }
    })
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error deleting book', success: false })
  }
}

async function deleteBook(req:any, res:any) {
  const body = req.body
  try {
    await prisma.bookSugesstion.delete({
      where:{
        id: body.id,
      }
    })
    return res.status(200).json({message: "Book deleted successfully" ,success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error adding book', success: false })
  }
}