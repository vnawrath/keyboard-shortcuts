import React from 'react';

const modifiers = ['⌘', '⌥', '⇧', '⌃'];

interface ModifierSelectorProps {
  selectedModifiers: string[];
  onChange: (modifiers: string[]) => void;
}

export default function ModifierSelector({
  selectedModifiers,
  onChange,
}: ModifierSelectorProps) {
  const toggleModifier = (modifier: string) => {
    if (selectedModifiers.includes(modifier)) {
      onChange(selectedModifiers.filter((m) => m !== modifier));
    } else {
      onChange([...selectedModifiers, modifier]);
    }
  };

  return (
    <div className="flex justify-center gap-4">
      {modifiers.map((modifier) => (
        <button
          key={modifier}
          onClick={() => toggleModifier(modifier)}
          className={`
            px-4 py-2 rounded-lg font-mono text-lg
            transition-all duration-200
            ${
              selectedModifiers.includes(modifier)
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 shadow hover:shadow-md'
            }
          `}
        >
          {modifier}
        </button>
      ))}
    </div>
  );
}