import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
  app.get("/memories", async () => {
    const memories = await prisma.memory.findMany({
      orderBy: { createdAt: "asc" },
    });
    return memories.map((memory) => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      export: memory.content.substring(0, 100).concat("..."),
    }));
  });

  app.get("/memories/:id", async (request) => {
    const idSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = idSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    return memory;
  });

  app.post("/memories", async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = await prisma.memory.create({
      data: {
        content,
        isPublic,
        coverUrl,
        userId: "4025e319-a90e-4131-87ed-c14fbb942ba8",
      },
    });

    return memory;
  });

  app.patch("/memories", async (request) => {
    const idSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = idSchema.parse(request.params);

    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string().optional(),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = await prisma.memory.update({
      where: { id },
      data: {
        content,
        isPublic,
        coverUrl,
      },
    });

    return memory;
  });

  app.delete("/memories", async (request) => {
    const idSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = idSchema.parse(request.params);

    await prisma.memory.delete({
      where: { id },
    });
  });
}
