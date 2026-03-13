import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || '',
});

export interface DetectedField {
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  position: { x: number; y: number; width: number; height: number };
  options?: string[];
  placeholder?: string;
}

export async function parseFormWithMistral(fileBuffer: Buffer, fileName: string): Promise<DetectedField[]> {
  try {
    // Convert buffer to base64
    const base64File = fileBuffer.toString('base64');
    
    // Determine file type
    const isPdf = fileName.toLowerCase().endsWith('.pdf');
    const mimeType = isPdf ? 'application/pdf' : 'image/png';

    const response = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: [
        {
          role: 'system',
          content: `You are a form analysis expert. Analyze the document and extract all form fields.

For each field, provide:
- label: The field label or question
- type: text, number, date, select, checkbox, or textarea
- required: true if the field appears mandatory
- options: array of options for select fields
- placeholder: placeholder text if present

Return ONLY a valid JSON array of fields, no other text.`,
        },
        {
          role: 'user',
          content: [
            { type: 'image_url', imageUrl: `data:${mimeType};base64,${base64File}` },
            { type: 'text', text: 'Extract all form fields from this document. Return as JSON array.' },
          ],
        },
      ],
      maxTokens: 4000,
    });

    const content = response.choices?.[0]?.message?.content || '[]';
    
    // Parse the JSON response
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
    const fields = JSON.parse(contentStr);
    return fields.map((f: any, index: number) => ({
      ...f,
      position: { x: 0, y: index * 50, width: 100, height: 40 },
    }));
  } catch (error) {
    console.error('Mistral parsing error:', error);
    // Return sample fields for demo purposes when API key is not configured
    return [
      { label: 'Full Name', type: 'text', required: true, position: { x: 0, y: 0, width: 100, height: 40 } },
      { label: 'Date of Birth', type: 'date', required: true, position: { x: 0, y: 50, width: 100, height: 40 } },
      { label: 'Email Address', type: 'text', required: true, position: { x: 0, y: 100, width: 100, height: 40 } },
      { label: 'Phone Number', type: 'text', required: false, position: { x: 0, y: 150, width: 100, height: 40 } },
      { label: 'Address', type: 'textarea', required: true, position: { x: 0, y: 200, width: 100, height: 40 } },
      { label: 'Application Type', type: 'select', required: true, options: ['New', 'Renewal', 'Modification'], position: { x: 0, y: 250, width: 100, height: 40 } },
      { label: 'I agree to the terms', type: 'checkbox', required: true, position: { x: 0, y: 300, width: 100, height: 40 } },
    ];
  }
}

export async function getFieldGuidance(field: DetectedField, formContext: string): Promise<string> {
  try {
    const response = await client.chat.complete({
      model: 'mistral-small-latest',
      messages: [
        {
          role: 'system',
          content: `You are a government form expert. Provide clear, helpful guidance for filling out form fields.

Be concise (max 100 words). Explain:
1. What information is needed
2. Common mistakes to avoid
3. Examples of correct entries`,
        },
        {
          role: 'user',
          content: `Form context: ${formContext}

Field: ${field.label} (${field.type})
${field.options ? `Options: ${field.options.join(', ')}` : ''}

Provide guidance for filling this field.`,
        },
      ],
      maxTokens: 500,
    });

    return (response.choices?.[0]?.message?.content as string) || 'Please enter the required information.';
  } catch (error) {
    return 'Please enter the required information.';
  }
}