import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';

export default function MapView({ jobs, selectedJob, onJobSelect }) {
    // Calculate the map's center based on job locations or a default if no jobs are present.
    const mapCenter = useMemo(() => {
        if (!jobs || jobs.length === 0) {
            // Default center for Australia if no jobs are provided.
            return [-25.2744, 133.7751];
        }

        const totalLatitude = jobs.reduce((sum, job) => sum + job.latitude, 0);
        const totalLongitude = jobs.reduce((sum, job) => sum + job.longitude, 0);

        return [totalLatitude / jobs.length, totalLongitude / jobs.length];
    }, [jobs]);

    // Determine the initial zoom level. Zoom in closer if only one job, or further out for multiple.
    const initialZoom = jobs.length > 1 ? 4 : 5;

    // Use a unique key for MapContainer to force re-render when a job is selected/deselected,
    // or when the filtered jobs list changes (to update the default center/zoom).
    // The key now combines the selected job's companyId (if selected) and a representation of the current job list.
    const mapKey = `${selectedJob ? `selected-${selectedJob.companyId}` : 'no-selection'}-${jobs.length}-${JSON.stringify(mapCenter)}`;

    return (
        <MapContainer
            key={mapKey} // Key helps re-render the map when selectedJob changes or filters apply
            center={selectedJob ? [selectedJob.latitude, selectedJob.longitude] : mapCenter}
            zoom={selectedJob ? 10 : initialZoom} // Increased zoom level to 10 when a job is selected
            scrollWheelZoom={true} // Enable scroll wheel zoom
            dragging={true} // Explicitly enable dragging
            className="h-full w-full rounded-lg z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Conditionally render markers: only the selected job's marker if a job is selected, otherwise all jobs */}
            {selectedJob ? (
                <Marker
                    key={selectedJob.companyId}
                    position={[selectedJob.latitude, selectedJob.longitude]}
                    eventHandlers={{
                        click: () => onJobSelect(selectedJob),
                    }}
                >
                    <Popup>
                        <div className="font-semibold text-gray-900 mb-1">{selectedJob.companyName}</div>
                        <div className="text-sm text-gray-700">{selectedJob.address}</div>
                        <div className="text-xs text-blue-600 mt-2">
                            Currently selected
                        </div>
                    </Popup>
                </Marker>
            ) : (
                jobs.map((job) => (
                    <Marker
                        // Using job.companyId as the key for markers for consistency
                        key={job.companyId}
                        position={[job.latitude, job.longitude]}
                        eventHandlers={{
                            click: () => onJobSelect(job),
                        }}
                    >
                        <Popup>
                            <div className="font-semibold text-gray-900 mb-1">{job.companyName}</div>
                            <div className="text-sm text-gray-700">{job.address}</div>
                            <div className="text-xs text-blue-600 mt-2">
                                Click to select in list
                            </div>
                        </Popup>
                    </Marker>
                ))
            )}
        </MapContainer>
    );
}

