import React, { useState } from 'react';
import KeyboardLayout from './components/KeyboardLayout';
import ShortcutForm from './components/ShortcutForm';
import ShortcutList from './components/ShortcutList';
import ModifierSelector from './components/ModifierSelector';
import { type Shortcut } from './types';

export default function App() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>(['⌘']);

  const addShortcut = (shortcut: Shortcut) => {
    setShortcuts((prev) => [...prev, shortcut]);
  };

  const deleteShortcut = (id: string) => {
    setShortcuts((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Keyboard Shortcuts Manager</h1>
          <p className="text-gray-600">Keep track of your favorite keyboard shortcuts</p>
        </header>

        <ModifierSelector
          selectedModifiers={selectedModifiers}
          onChange={setSelectedModifiers}
        />

        <div className="bg-white rounded-xl shadow-lg p-8">
          <KeyboardLayout
            shortcuts={shortcuts.filter((s) =>
              s.modifiers.every((m) => selectedModifiers.includes(m))
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Shortcut</h2>
            <ShortcutForm onSubmit={addShortcut} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Shortcuts</h2>
            <ShortcutList shortcuts={shortcuts} onDelete={deleteShortcut} />
          </div>
        </div>
      </div>
    </div>
  );
}