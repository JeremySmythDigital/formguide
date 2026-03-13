import { NextRequest, NextResponse } from 'next/server';
import { parseFormWithMistral } from '@/lib/mistral';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fields = await parseFormWithMistral(buffer, file.name);

    return NextResponse.json({
      success: true,
      fields,
      fileName: file.name,
      fieldCount: fields.length,
    });
  } catch (error) {
    console.error('Parse error:', error);
    return NextResponse.json(
      { error: 'Failed to parse form' },
      { status: 500 }
    );
  }
}