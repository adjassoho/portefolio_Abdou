import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const pathsToRevalidate = body.paths as string[]; // Ex: ['/projects', '/about'] ou juste le type

    if (!pathsToRevalidate || !Array.isArray(pathsToRevalidate)) {
      return NextResponse.json({ message: 'Invalid paths to revalidate' }, { status: 400 });
    }

    for (const path of pathsToRevalidate) {
      // Si le chemin est juste un type comme 'projects', il faut le préfixer par '/'
      const actualPath = path.startsWith('/') ? path : `/${path}`;
      revalidatePath(actualPath, 'page'); // 'page' pour revalider la page, ou 'layout'
      console.log(`Path revalidated: ${actualPath}`);
    }

    return NextResponse.json({ 
      revalidated: true, 
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error during revalidation:', err);
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err instanceof Error ? err.message : String(err) 
    }, { status: 500 });
  }
} 