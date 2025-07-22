import { useState, useEffect } from 'react';
import { Filter, X, Search, Users, Sparkles, ChevronDown } from 'lucide-react';
import MapView from './MapView';
import AnimateOnScroll from './AnimateJobCardOnScroll'
import listOfJobs from '../companies.json'

const states = ['All States', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];
const industries = ['All Industries', 'Retail & Tourism', 'Hospitality', 'Technology', 'Agriculture', 'Construction', 'Healthcare'];

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [searchTerm, setSearchTerm] = useState('');
  const [contactedJobs, setContactedJobs] = useState(new Set());
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setJobs(listOfJobs);
    setFilteredJobs(listOfJobs);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (selectedState !== 'All States') {
      filtered = filtered.filter(job => job.state === selectedState);
    }

    if (selectedIndustry !== 'All Industries') {
      filtered = filtered.filter(job => job.industry === selectedIndustry);
    }

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);

    if (selectedJob && !filtered.find(job => job.companyId === selectedJob.companyId)) {
        setSelectedJob(null);
    }
  }, [jobs, selectedState, selectedIndustry, searchTerm, selectedJob]);

  useEffect(() => {
    setSelectedJob(null);
  }, [selectedState, selectedIndustry, searchTerm]);


  const toggleJobContact = (jobId) => {
    const newContactedJobs = new Set(contactedJobs);
    if (newContactedJobs.has(jobId)) {
      newContactedJobs.delete(jobId);
    } else {
      newContactedJobs.add(jobId);
    }
    setContactedJobs(newContactedJobs);
  };

  const clearFilters = () => {
    setSelectedState('All States');
    setSelectedIndustry('All Industries');
    setSearchTerm('');
  };

  const contactedCount = contactedJobs.size;
  const hasActiveFilters = selectedState !== 'All States' || selectedIndustry !== 'All Industries' || searchTerm;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-700 p-3 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Job Finder
                </h1>
                <p className="text-gray-300 font-medium">Find your next opportunity in Australia</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                <Sparkles className="w-4 h-4 inline mr-2" />
                <span className="font-semibold">{contactedCount}</span> contacted
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <span className="font-semibold">{filteredJobs.length}</span> opportunities
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8 hover:border-gray-600 transition-colors duration-200">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-64 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search companies, locations, or contacts..."
                className="w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 hover:border-gray-500 transition-colors duration-200 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* State Filter */}
            <div className="relative">
              <select
                className="appearance-none px-4 py-3 pr-10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white hover:border-gray-500 transition-colors duration-200 font-medium cursor-pointer"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /> {/* Custom arrow */}
            </div>

            {/* Industry Filter*/}
            <div className="relative">
              <select
                className="appearance-none px-4 py-3 pr-10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white hover:border-gray-500 transition-colors duration-200 font-medium cursor-pointer"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center px-4 py-3 text-gray-300 hover:text-red-400 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-red-400 transition-all duration-200 font-medium group"
              >
                <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-240px)]">
          {/* Job List */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors duration-200">
            <div className="p-6 border-b border-gray-700 bg-gray-700">
              <h2 className="text-xl font-bold text-white">
                Job Opportunities ({filteredJobs.length})
              </h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-76px)] p-6 space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-16 animate-fade-in">
                  <Filter className="w-16 h-16 text-gray-500 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-3">No jobs found</h3>
                  <p className="text-gray-400">Try adjusting your filters to see more opportunities.</p>
                </div>
              ) : (
                filteredJobs.map((job, index) => (
                  <AnimateOnScroll
                    key={job.companyId}
                    job={job}
                    isContacted={contactedJobs.has(job.companyId)}
                    onToggleContact={toggleJobContact}
                    isSelected={selectedJob?.companyId === job.companyId}
                    onSelect={() => setSelectedJob(job)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Map */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors duration-200">
            <div className="p-6 border-b border-gray-700 bg-gray-700">
              <h2 className="text-xl font-bold text-white">Map View</h2>
              {selectedJob && (
                <p className="text-sm text-gray-400 mt-2 animate-fade-in">
                  Selected: <span className="font-semibold text-blue-400">{selectedJob.companyName}</span>
                </p>
              )}
            </div>
            <div className="h-[calc(100%-76px)] p-6">
              <div className="h-full w-full rounded-lg overflow-hidden border border-gray-700">
                <MapView
                  jobs={filteredJobs}
                  selectedJob={selectedJob}
                  onJobSelect={setSelectedJob}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default App;