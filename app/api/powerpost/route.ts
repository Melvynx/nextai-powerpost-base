import { requiredAuth } from "@/auth/helper";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import { PostSchema } from "../../(layout)/dashboard/posts/new/post.schema";
import { generatePowerPost } from "./generate-powerpost";
import { generateTitle } from "./generate-title";
import { scrapPost } from "./scrap-post";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const session = await requiredAuth();
    if (session.credits <= 0) {
      return NextResponse.json(
        {
          error: "You don't have enough credits",
        },
        { status: 400 }
      );
    }

    const data = PostSchema.parse(body);

    const { coverUrl, markdown } = await scrapPost(data.source);

    const powerPost = await generatePowerPost({
      markdown,
      mode: data.mode,
      language: data.language,
    });

    console.log({
      powerPost: powerPost.length,
      markdown: markdown.length,
    });

    const title = await generateTitle({
      powerpost: powerPost,
      language: data.language,
    });

    const finalPost = await prisma.post.create({
      data: {
        content: markdown,
        source: data.source,
        powerPost: powerPost,
        title,
        coverUrl,
        id: getId(title),
        userId: session.id,
      },
    });

    await prisma.user.update({
      where: {
        id: session.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(finalPost);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        {
          error: e.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "An error occured",
      },
      { status: 400 }
    );
  }
};

const getId = (title: string) => {
  const cleanedTitle = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-zA-Z0-9]/g, "_") // Remplacer les caractères spéciaux par des underscores
    .toLowerCase(); // Convertir en minuscules pour uniformité

  return cleanedTitle + Math.random().toString(36).substring(7);
};
