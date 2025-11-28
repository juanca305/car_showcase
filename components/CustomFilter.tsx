'use client'

import { Fragment } from 'react';
import Image from 'next/image';
import { Listbox, Transition } from '@headlessui/react';
import { CustomFilterProps } from '@/types';

const CustomFilter = ({ title, options, value, handleChange }: CustomFilterProps) => {
  return (
    <div className='w-fit'>
      <Listbox value={value} onChange={handleChange}>
        <div className='relative w-fit z-10'>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{options.find(opt => opt.value === value)?.title || options[0].title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className='ml-4 object-contain'
              alt='chevron-up-down'
            />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {options.map(option => (
                <Listbox.Option
                  // key={option.title}
                  key={`${option.title}-${option.value}`}
                  value={option.value} // ✅ pass value string
                  disabled={option.value === ""}
                  className={({ active, disabled }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      disabled ? 'text-gray-400 cursor-not-allowed' :
                      active ? 'bg-primary-blue text-white' :
                      'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter;


//***************************************************** */
// 'use client'

// import { Fragment } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Listbox, Transition } from '@headlessui/react';
// import { CustomFilterProps } from '@/types';

// const CustomFilter = ({ title, options, value, handleChange }: CustomFilterProps) => {
//   const router = useRouter();
//   //const [selected, setSelected] = useState(options[0]);
//   const selected = options.find(option => option.value === value) || options[0];


//   // const handleUpdateParams = (e: { title: string, value: string }) => {
//   //   const newPathName = updateSearchParams(title, e.value.toLowerCase());

//   //   router.push(newPathName);
//   // }

//   return (
//     <div className='w-fit'>
//       <Listbox
//         value={selected}
//         // onChange={(e) => {
//         //   setSelected(e)
//         //   handleUpdateParams(e)CustomFilter.tsx now looks like this: 
//         // }}

//         onChange={(e) => handleChange?.(e.value)}
//  >
//         <div className='relative w-fit z-10'>
//           <Listbox.Button className='custom-filter__btn'>
//             <span className='block truncate'>{selected.title}</span>
//             <Image
//               src="/chevron-up-down.svg"
//               width={20}
//               height={20}
//               className='ml-4 object-contain'
//               alt='chevron-up-down'
//             />
//           </Listbox.Button>
//           <Transition
//             as={Fragment}
//             leave='transition ease-in duration-100'
//             leaveFrom='opacity-100'
//             leaveTo='opacity-0'
//           >
//             <Listbox.Options className='custom-filter__options'>
//               {options.map((option) => (
//                 <Listbox.Option
//                   key={option.title}
//                   value={option}
//                   disabled={option.value === ""} // 👈 disable the placeholder option
//                   className={({ active, disabled }) =>
//                     `relative cursor-default select-none py-2 px-4 ${disabled
//                       ? 'text-gray-400 cursor-not-allowed' // style for disabled option
//                       : active
//                         ? 'bg-primary-blue text-white'
//                         : 'text-gray-900'
//                     }`
//                   }
//                 >
//                   {({ selected }) => (
//                     <span
//                       className={`block truncate ${selected ? 'font-medium' : 'font-normal'
//                         }`}
//                     >
//                       {option.title}
//                     </span>
//                   )}
//                 </Listbox.Option>
//               ))}

//             </Listbox.Options>

//           </Transition>

//         </div>
//       </Listbox>
//     </div>
//   )
// }

// export default CustomFilter