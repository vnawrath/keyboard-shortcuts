import React, { useState } from 'react';
import { type Shortcut } from '../types';

interface ShortcutFormProps {
  onSubmit: (shortcut: Shortcut) => void;
}

export default function ShortcutForm({ onSubmit }: ShortcutFormProps) {
  const [formData, setFormData] = useState({
    key: '',
    description: '',
    modifiers: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.key || !formData.description || formData.modifiers.length === 0) return;

    onSubmit({
      id: crypto.randomUUID(),
      ...formData,
    });

    setFormData({
      key: '',
      description: '',
      modifiers: [],
    });
  };

  const toggleModifier = (modifier: string) => {
    setFormData((prev) => ({
      ...prev,
      modifiers: prev.modifiers.includes(modifier)
        ? prev.modifiers.filter((m) => m !== modifier)
        : [...prev.modifiers, modifier],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Key
        </label>
        <input
          type="text"
          value={formData.key}
          onChange={(e) => setFormData((prev) => ({ ...prev, key: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., S"
          maxLength={1}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Save file"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Modifiers
        </label>
        <div className="flex gap-2">
          {['⌘', '⌥', '⇧', '⌃'].map((modifier) => (
            <button
              key={modifier}
              type="button"
              onClick={() => toggleModifier(modifier)}
              className={`
                px-3 py-1 rounded font-mono
                ${
                  formData.modifiers.includes(modifier)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {modifier}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Shortcut
      </button>
    </form>
  );
}