import { MapPin, Phone, Mail, Building2, Check } from 'lucide-react';

export default function JobCard({ job, isContacted, onToggleContact, isSelected, onSelect }) {
  return (
    <div
      className={`bg-gray-700 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-blue-700 transform hover:scale-[1.02] ${
        isSelected 
          ? 'border-blue-600 bg-blue-900 bg-opacity-20' 
          : 'border-gray-600'
      } ${
        isContacted 
          ? 'opacity-80 bg-green-900 bg-opacity-20 border-green-700' 
          : ''
      }`}
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-200 ${
              isSelected ? 'text-blue-300' : 'text-white'
            }`}>
              {job.companyName}
            </h3>
            <p className="text-sm text-gray-400 mb-3 font-medium">
              Contact: <span className="text-gray-200">{job.firstName} {job.lastName}</span>
            </p>
            <div className="flex items-center mb-3">
              <Building2 className="w-4 h-4 mr-2 text-gray-500" />
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                job.industry === 'Technology' ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' :
                job.industry === 'Hospitality' ? 'bg-pink-800 text-pink-200 hover:bg-pink-700' :
                job.industry === 'Agriculture' ? 'bg-green-800 text-green-200 hover:bg-green-700' :
                job.industry === 'Healthcare' ? 'bg-red-800 text-red-200 hover:bg-red-700' :
                job.industry === 'Construction' ? 'bg-orange-800 text-orange-200 hover:bg-orange-700' :
                'bg-blue-800 text-blue-200 hover:bg-blue-700'
              }`}>
                {job.industry}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-105 ${
              job.state === 'NSW' ? 'bg-red-800 text-red-200 hover:bg-red-700' :
              job.state === 'VIC' ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' :
              job.state === 'QLD' ? 'bg-yellow-800 text-yellow-200 hover:bg-yellow-700' :
              job.state === 'WA' ? 'bg-green-800 text-green-200 hover:bg-green-700' :
              job.state === 'SA' ? 'bg-orange-800 text-orange-200 hover:bg-orange-700' :
              'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}>
              {job.state}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleContact(job.companyId);
              }}
              className={`p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 ${
                isContacted
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-600 text-gray-400 hover:bg-blue-800 hover:text-blue-300'
              }`}
              title={isContacted ? 'Already contacted' : 'Mark as contacted'}
            >
              <Check className={`w-5 h-5 transition-all duration-300 ${
                isContacted ? 'scale-110' : 'hover:scale-110'
              }`} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-400 group hover:text-gray-200 transition-colors duration-200">
            <MapPin className="w-4 h-4 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="truncate font-medium">{job.address}</span>
          </div>
          <div className="flex items-center text-gray-400 group">
            <Phone className="w-4 h-4 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors duration-200" />
            <a 
              href={`tel:${job.phoneNumber}`} 
              className="hover:text-blue-400 transition-all duration-200 font-medium hover:underline hover:scale-105 transform inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              {job.phoneNumber}
            </a>
          </div>
          <div className="flex items-center text-gray-400 group">
            <Mail className="w-4 h-4 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors duration-200" />
            <a 
              href={`mailto:${job.email}`} 
              className="hover:text-blue-400 transition-all duration-200 truncate font-medium hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {job.email}
            </a>
          </div>
        </div>

        {/* Clean selection indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
            SELECTED
          </div>
        )}
      </div>
    </div>
  );
}