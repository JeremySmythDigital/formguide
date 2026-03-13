import { NextRequest, NextResponse } from 'next/server';
import { saveFormSession } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fields, formName, userId } = body;

    const sessionId = crypto.randomUUID();
    
    const session = await saveFormSession({
      id: sessionId,
      user_id: userId || 'anonymous',
      form_name: formName,
      parsed_fields: fields,
      progress: { currentFieldIndex: 0, completedFields: [] },
      status: 'draft',
    });

    return NextResponse.json({
      success: true,
      sessionId,
      session,
    });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json(
      { error: 'Failed to save form session' },
      { status: 500 }
    );
  }
}