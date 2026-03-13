'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FormField } from '@/types/form';

export default function FormWizard() {
  const [step, setStep] = useState<'upload' | 'parsing' | 'wizard' | 'complete'>('upload');
  const [fields, setFields] = useState<FormField[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formName, setFormName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFormName(file.name);
    setStep('parsing');
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse form');
      }

      const parsedFields: FormField[] = data.fields.map((f: any, index: number) => ({
        id: `field-${index}`,
        label: f.label || `Field ${index + 1}`,
        type: f.type || 'text',
        required: f.required ?? true,
        value: '',
        placeholder: f.placeholder,
        options: f.options,
        position: { x: 0, y: index * 60, width: 100, height: 40 },
        helpText: '',
      }));

      setFields(parsedFields);
      setStep('wizard');

      // Save session
      const saveResponse = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: parsedFields,
          formName: file.name,
        }),
      });
      const saveData = await saveResponse.json();
      if (saveData.sessionId) {
        setSessionId(saveData.sessionId);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to process form');
      setStep('upload');
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  const updateFieldValue = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  const nextField = () => {
    if (currentFieldIndex < fields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    }
  };

  const prevField = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };

  const validateField = (field: FormField): string[] => {
    const errors: string[] = [];
    if (field.required && !field.value.trim()) {
      errors.push('This field is required');
    }
    if (field.type === 'number' && field.value && isNaN(Number(field.value))) {
      errors.push('Please enter a valid number');
    }
    if (field.type === 'date' && field.value) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(field.value)) {
        errors.push('Please use YYYY-MM-DD format');
      }
    }
    return errors;
  };

  const handleComplete = async () => {
    // Save final state
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          fields,
          status: 'completed',
        }),
      });
    } catch (err) {
      console.error('Failed to save final state:', err);
    }
    setStep('complete');
  };

  const renderUpload = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Upload Your Form</h1>
          <p className="text-white/60">Upload a PDF or image of any government form</p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition
            ${isDragActive ? 'border-purple-400 bg-purple-400/10' : 'border-white/20 hover:border-purple-400/50'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-purple-400">Drop the form here...</p>
          ) : (
            <div>
              <p className="text-white/80 mb-2">Drag & drop your form here</p>
              <p className="text-white/40 text-sm">or click to browse files</p>
              <p className="text-white/30 text-xs mt-2">Supports PDF, PNG, JPG</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );

  const renderParsing = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-spin" />
        <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Form</h2>
        <p className="text-white/60">AI is detecting all form fields...</p>
      </div>
    </div>
  );

  const renderWizard = () => {
    const currentField = fields[currentFieldIndex];
    const errors = validateField(currentField);
    const progress = ((currentFieldIndex + 1) / fields.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60 text-sm">{formName}</span>
              <span className="text-white/60 text-sm">
                Field {currentFieldIndex + 1} of {fields.length}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        {/* Field */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-xl w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{currentField.label}</h2>
              {currentField.required && (
                <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded">Required</span>
              )}
            </div>

            {currentField.type === 'checkbox' ? (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentField.value === 'true'}
                  onChange={(e) => updateFieldValue(currentFieldIndex, e.target.checked ? 'true' : 'false')}
                  className="w-5 h-5 rounded border-white/20 bg-white/5"
                />
                <span className="text-white/80">Yes, this applies to me</span>
              </label>
            ) : currentField.type === 'select' && currentField.options ? (
              <select
                value={currentField.value}
                onChange={(e) => updateFieldValue(currentFieldIndex, e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
              >
                <option value="">Select an option...</option>
                {currentField.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : currentField.type === 'textarea' ? (
              <textarea
                value={currentField.value}
                onChange={(e) => updateFieldValue(currentFieldIndex, e.target.value)}
                placeholder={currentField.placeholder}
                rows={4}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-purple-400 focus:outline-none resize-none"
              />
            ) : (
              <input
                type={currentField.type === 'number' ? 'number' : currentField.type === 'date' ? 'date' : 'text'}
                value={currentField.value}
                onChange={(e) => updateFieldValue(currentFieldIndex, e.target.value)}
                placeholder={currentField.placeholder}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-purple-400 focus:outline-none"
              />
            )}

            {errors.length > 0 && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                {errors.map((err, i) => (
                  <p key={i} className="text-red-400 text-sm">{err}</p>
                ))}
              </div>
            )}

            {/* Guidance hint */}
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-purple-200 text-sm">
                💡 <strong>Tip:</strong> This is a {currentField.type} field. 
                {currentField.type === 'text' && ' Enter the information as clearly as possible.'}
                {currentField.type === 'number' && ' Enter only numeric values.'}
                {currentField.type === 'date' && ' Use the date format YYYY-MM-DD.'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <footer className="border-t border-white/10 p-4">
          <div className="max-w-3xl mx-auto flex justify-between">
            <button
              onClick={prevField}
              disabled={currentFieldIndex === 0}
              className="px-6 py-2 rounded-lg text-white/60 hover:text-white disabled:opacity-30 transition"
            >
              Previous
            </button>
            {currentFieldIndex === fields.length - 1 ? (
              <button
                onClick={handleComplete}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-2 rounded-lg text-white font-semibold transition flex items-center gap-2"
              >
                Complete <CheckCircle2 className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={nextField}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-2 rounded-lg text-white font-semibold transition flex items-center gap-2"
              >
                Next <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </footer>
      </div>
    );
  };

  const renderComplete = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Form Completed!</h1>
        <p className="text-white/60 mb-8">
          You've filled all {fields.length} fields. Your form data has been saved.
        </p>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Form Summary</h3>
          <div className="space-y-2 text-left">
            {fields.slice(0, 5).map((field) => (
              <div key={field.id} className="flex justify-between text-sm">
                <span className="text-white/60">{field.label}</span>
                <span className="text-white font-medium">{field.value || '(empty)'}</span>
              </div>
            ))}
            {fields.length > 5 && (
              <div className="text-white/40 text-sm">...and {fields.length - 5} more fields</div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setStep('upload');
              setFields([]);
              setCurrentFieldIndex(0);
              setSessionId('');
            }}
            className="border border-white/30 hover:border-white/50 text-white px-6 py-3 rounded-lg transition"
          >
            Upload Another Form
          </button>
          <button
            onClick={() => {
              const data = JSON.stringify(fields, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${formName.replace(/\.[^/.]+$/, '')}_filled.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
          >
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {step === 'upload' && renderUpload()}
      {step === 'parsing' && renderParsing()}
      {step === 'wizard' && renderWizard()}
      {step === 'complete' && renderComplete()}
    </>
  );
}