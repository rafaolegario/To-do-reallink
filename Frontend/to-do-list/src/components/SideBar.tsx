import { FaFilter, FaPen } from "react-icons/fa";

function SideBar({ setActiveTab, activeTab }: { setActiveTab: (value: 'add' | 'filter') => void, activeTab: 'add' | 'filter' }) {
  return (
   <div className='flex md:flex-col flex-row gap-4 bg-[#252526] p-4 rounded-xl'>
        <button 
          onClick={() => setActiveTab('add')}
          className={`p-3 rounded-full hover:bg-[#3c3c3c] cursor-pointer ${activeTab === 'add' ? 'bg-[#007acc] text-white' : 'text-[#d4d4d4]'}`}
        >
          <FaPen size={20} />
        </button>
        <button
          onClick={() => setActiveTab('filter')}
          className={`p-3 rounded-full hover:bg-[#3c3c3c] cursor-pointer ${activeTab === 'filter' ? 'bg-[#007acc] text-white' : 'text-[#d4d4d4]'}`}
        >
          <FaFilter size={20} />
        </button>
      </div>
  );
}

export default SideBar
