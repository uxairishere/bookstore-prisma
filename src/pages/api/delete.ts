import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    return await deleteBook(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
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