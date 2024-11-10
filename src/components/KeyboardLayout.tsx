import React from 'react';
import { type Shortcut } from '../types';

export default function KeyboardLayout({ shortcuts }: { shortcuts: Shortcut[] }) {
  const keyRows = [
    ['esc', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'],
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'],
    ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
    ['fn', 'control', 'option', 'command', '', 'command', 'option', 'left', 'right'],
  ];

  const getKeyWidth = (key: string) => {
    switch (key) {
      case 'delete':
      case 'tab':
      case 'caps':
      case 'return':
        return 'w-20';
      case 'shift':
        return 'w-24';
      case 'command':
        return 'w-16';
      case '':
        return 'flex-1';
      default:
        return 'w-12';
    }
  };

  const getShortcutForKey = (key: string) => {
    return shortcuts.find((s) => s.key.toLowerCase() === key.toLowerCase());
  };

  return (
    <div className="select-none">
      <div className="inline-block bg-gray-100 rounded-2xl p-6 shadow-inner">
        {keyRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 mb-1 justify-center">
            {row.map((key, keyIndex) => {
              const shortcut = getShortcutForKey(key);
              return (
                <div
                  key={`${rowIndex}-${keyIndex}`}
                  className={`
                    ${getKeyWidth(key)}
                    h-12
                    rounded
                    bg-white
                    shadow-md
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-medium
                    text-gray-700
                    relative
                    transition-all
                    ${shortcut ? 'bg-blue-100 text-blue-800' : ''}
                  `}
                >
                  {key}
                  {shortcut && (
                    <div className="absolute -top-6 left-0 right-0 text-xs text-blue-600 font-semibold">
                      {shortcut.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}