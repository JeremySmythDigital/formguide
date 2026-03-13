export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  value: string;
  placeholder?: string;
  options?: string[];
  validation?: ValidationRule[];
  helpText?: string;
  position: { x: number; y: number; width: number; height: number };
}

export interface ValidationRule {
  type: 'required' | 'format' | 'length' | 'custom';
  message: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

export interface ParsedForm {
  id: string;
  name: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'in_progress' | 'completed';
}

export interface FormProgress {
  formId: string;
  currentFieldIndex: number;
  completedFields: string[];
  savedAt: Date;
}