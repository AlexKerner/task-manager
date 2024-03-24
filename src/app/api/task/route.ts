import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const task = await prisma.task.findMany()
  return Response.json({ task })
}

export async function POST(req: Request) {

  const { title } = await req.json()
  const task = await prisma.task.create({
    data: {
      title
    }
  })
  return Response.json({ message: "Task Created", task })

}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const task = await prisma.task.delete({
    where: {
      id
    }
  })
  return Response.json({ message: "Task deleted", task })
}

export async function PATCH(req: Request) {
  const { id, completed, title } = await req.json()
  const task = await prisma.task.update({
    where: {
      id
    },
    data: {
      completed,
      title
    }
  })
  return Response.json({ message: "Task updated", task })
}
