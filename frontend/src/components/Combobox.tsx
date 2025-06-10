import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption} from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { capitalizeWords } from '../utils/Capitalizer';

interface ComboboxSelectProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

export default function ComboboxSelect({label,options,value,onChange}: ComboboxSelectProps) {
  const [query, setQuery] = useState('');

  const filteredOptions = query === '' ? options.map(capitalizeWords) : options .filter((option) =>option.toLowerCase().includes(query.toLowerCase())).map(capitalizeWords);

  return (
    <div>
      <Combobox value={value} onChange={onChange}>
        <div className="relative w-full">
          <div className="flex w-full border-black border-2 py-1 rounded-md overflow-hidden">
            <ComboboxInput className="px-3 py-2 w-full focus:outline-none" onChange={(e) => setQuery(e.target.value)} displayValue={(item: string | null) => item ?? ''} placeholder={`Select a ${label.toLowerCase()}`} />
            <ComboboxButton className="px-3 py-2 bg-white"><IoIosArrowDown /></ComboboxButton>
          </div>

          <ComboboxOptions className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto rounded-md border-2 border-black bg-white shadow-md hide-scrollbar">
            {filteredOptions.map((option) => (
              <ComboboxOption
                key={option}
                value={option}
                className={({ selected }) =>
                  `p-3 m-px rounded-md cursor-pointer transition ${
                    selected
                      ? 'bg-black text-white'
                      : 'bg-black/5 hover:bg-black hover:text-white'
                  }`
                }>
                {({ selected }) => (
                  <span className="flex justify-between w-full">{option}{selected && <span className="mr-2">✔</span>}</span>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
