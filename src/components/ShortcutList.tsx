import React from 'react';
import { Trash2 } from 'lucide-react';
import { type Shortcut } from '../types';

interface ShortcutListProps {
  shortcuts: Shortcut[];
  onDelete: (id: string) => void;
}

export default function ShortcutList({ shortcuts, onDelete }: ShortcutListProps) {
  if (shortcuts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No shortcuts added yet. Add your first shortcut using the form.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {shortcuts.map((shortcut) => (
        <div
          key={shortcut.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
        >
          <div>
            <div className="flex items-center gap-1 text-sm font-mono mb-1">
              {shortcut.modifiers.map((mod) => (
                <span
                  key={mod}
                  className="bg-gray-200 px-2 py-0.5 rounded text-gray-700"
                >
                  {mod}
                </span>
              ))}
              <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">
                {shortcut.key}
              </span>
            </div>
            <div className="text-sm text-gray-600">{shortcut.description}</div>
          </div>
          <button
            onClick={() => onDelete(shortcut.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}