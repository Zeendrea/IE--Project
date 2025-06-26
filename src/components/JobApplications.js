import React, { useState, useEffect } from 'react';

// Mock data for demonstration
const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    applicationStatus: "pending",
    dateApplied: "2025-06-20",
    lastUpdated: "2025-06-22",
    jobType: "Full-time",
    salary: "$120,000 - $150,000"
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: "DesignStudio Inc",
    location: "New York, NY",
    applicationStatus: "accepted",
    dateApplied: "2025-06-15",
    lastUpdated: "2025-06-25",
    jobType: "Full-time",
    salary: "$90,000 - $110,000"
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    company: "InnovateLabs",
    location: "Austin, TX",
    applicationStatus: "rejected",
    dateApplied: "2025-06-10",
    lastUpdated: "2025-06-24",
    jobType: "Full-time",
    salary: "$130,000 - $160,000"
  },
  {
    id: 4,
    jobTitle: "Data Scientist",
    company: "DataFlow Analytics",
    location: "Remote",
    applicationStatus: "cancelled",
    dateApplied: "2025-06-05",
    lastUpdated: "2025-06-18",
    jobType: "Contract",
    salary: "$95,000 - $125,000"
  }
];

const JobApplications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [filteredApplications, setFilteredApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Navigation function
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback - you can change this to your homepage route
      window.location.href = '/homepage';
    }
  };

  const handleBrowseJobs = () => {
    window.location.href = '/homepage';
  };

  // Status configuration
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Under Review',
        className: 'status-pending',
        icon: '⏳',
        dotColor: '#F59E0B'
      },
      accepted: {
        label: 'Accepted',
        className: 'status-accepted',
        icon: '✅',
        dotColor: '#10B981'
      },
      rejected: {
        label: 'Rejected',
        className: 'status-rejected',
        icon: '❌',
        dotColor: '#EF4444'
      },
      cancelled: {
        label: 'Cancelled',
        className: 'status-cancelled',
        icon: '🚫',
        dotColor: '#6B7280'
      }
    };
    return configs[status] || configs.pending;
  };

  // Calculate status counts
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.applicationStatus] = (acc[app.applicationStatus] || 0) + 1;
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {});

  // Filter applications
  useEffect(() => {
    let filtered = applications;
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.applicationStatus === statusFilter);
    }
    
    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const StatsCard = ({ title, count, percentage }) => (
    <div className="stats-card">
      <div className="stats-content">
        <div className="stats-info">
          <div className="stats-title">{title}</div>
          <div className="stats-number">{count || 0}</div>
          {percentage && (
            <div className="stats-trend">
              📈 +{percentage}% this month
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ApplicationCard = ({ application }) => {
    const statusConfig = getStatusConfig(application.applicationStatus);
    const canCancel = application.applicationStatus === 'pending';
    
    return (
      <div className="application-card">
        <div className="card-header">
          <div className="card-main-info">
            <div className="company-avatar">
              {application.company.charAt(0)}
            </div>
            <div className="job-info">
              <h3 className="job-title">{application.jobTitle}</h3>
              <div className="company-info">
                <span className="icon">🏢</span>
                <span>{application.company}</span>
              </div>
              <div className="location-info">
                <span className="icon">📍</span>
                <span>{application.location}</span>
              </div>
            </div>
          </div>
          <div className={`status-chip ${statusConfig.className}`}>
            <span className="status-icon">{statusConfig.icon}</span>
            <span>{statusConfig.label}</span>
          </div>
        </div>
        
        <div className="card-divider"></div>
        
        <div className="card-footer">
          <div className="date-info">
            <span className="icon">📅</span>
            <span>Applied {formatDate(application.dateApplied)}</span>
          </div>
          <div className="card-actions">
            <button 
              className="btn btn-outline"
              onClick={() => {
                setSelectedApplication(application);
                setShowDetails(true);
              }}
            >
              👁️ View Details
            </button>
            {canCancel && (
              <button className="btn btn-outline-danger">
                ❌ Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ApplicationDetailsModal = () => {
    if (!selectedApplication) return null;
    
    const statusConfig = getStatusConfig(selectedApplication.applicationStatus);
    
    return (
      <div className={`modal-overlay ${showDetails ? 'show' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Application Details</h2>
            <button 
              className="modal-close"
              onClick={() => setShowDetails(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="modal-body">
            <div className="detail-header">
              <div className="detail-company-avatar">
                {selectedApplication.company.charAt(0)}
              </div>
              <div className="detail-job-info">
                <h3>{selectedApplication.jobTitle}</h3>
                <div className="detail-company">
                  <span className="icon">🏢</span>
                  <span>{selectedApplication.company}</span>
                </div>
                <div className="detail-location">
                  <span className="icon">📍</span>
                  <span>{selectedApplication.location}</span>
                </div>
              </div>
              <div className={`status-chip ${statusConfig.className}`}>
                <span className="status-icon">{statusConfig.icon}</span>
                <span>{statusConfig.label}</span>
              </div>
            </div>
            
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">JOB TYPE</div>
                <div className="detail-value">{selectedApplication.jobType}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">SALARY RANGE</div>
                <div className="detail-value">{selectedApplication.salary}</div>
              </div>
            </div>
            
            <div className="timeline-section">
              <h4>Application Timeline</h4>
              <div className="timeline">
                <div className="timeline-item">
                  <div 
                    className="timeline-dot" 
                    style={{ backgroundColor: statusConfig.dotColor }}
                  ></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Application Submitted</div>
                    <div className="timeline-date">{formatDate(selectedApplication.dateApplied)}</div>
                  </div>
                </div>
                
                {selectedApplication.lastUpdated !== selectedApplication.dateApplied && (
                  <div className="timeline-item">
                    <div 
                      className="timeline-dot" 
                      style={{ backgroundColor: statusConfig.dotColor }}
                    ></div>
                    <div className="timeline-content">
                      <div className="timeline-title">Status Updated to {statusConfig.label}</div>
                      <div className="timeline-date">{formatDate(selectedApplication.lastUpdated)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>
            {selectedApplication.applicationStatus === 'pending' && (
              <button className="btn btn-danger">
                ❌ Cancel Application
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .header {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 1rem 0;
          margin-bottom: 2rem;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .back-btn {
          background: none;
          border: 1px solid #d1d5db;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: #f3f4f6;
        }

        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .browse-jobs-btn {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .browse-jobs-btn:hover {
          background: #45a049;
          transform: translateY(-1px);
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stats-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }

        .stats-content {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .stats-title {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .stats-number {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .stats-trend {
          font-size: 0.75rem;
          color: #10b981;
          font-weight: 500;
        }

        .stats-icon {
          display: none;
        }

        .gradient-blue { background: #4CAF50; }
        .gradient-orange { background: #FF9800; }
        .gradient-green { background: #4CAF50; }
        .gradient-red { background: #F44336; }

        .filters-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }

        .filters-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1.5rem;
          align-items: center;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/%3e%3c/svg%3e");
          background-position: 0.75rem center;
          background-repeat: no-repeat;
          background-size: 1rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }

        .status-select {
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background: white;
          font-size: 0.875rem;
          min-width: 200px;
        }

        .status-select:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }

        .applications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .application-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
          transition: all 0.3s ease;
        }

        .application-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .card-main-info {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
        }

        .company-avatar {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          background: #4CAF50;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .job-info {
          flex: 1;
        }

        .job-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
        }

        .company-info, .location-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .icon {
          font-size: 0.875rem;
        }

        .status-chip {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
          border-color: #fcd34d;
        }

        .status-accepted {
          background: #d1fae5;
          color: #065f46;
          border-color: #34d399;
        }

        .status-rejected {
          background: #fee2e2;
          color: #991b1b;
          border-color: #fca5a5;
        }

        .status-cancelled {
          background: #f3f4f6;
          color: #374151;
          border-color: #d1d5db;
        }

        .card-divider {
          height: 1px;
          background: #f3f4f6;
          margin: 1rem 0;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .date-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .btn-outline {
          background: white;
          color: #4CAF50;
          border-color: #4CAF50;
        }

        .btn-outline:hover {
          background: #f1f8e9;
        }

        .btn-outline-danger {
          background: white;
          color: #ef4444;
          border-color: #ef4444;
        }

        .btn-outline-danger:hover {
          background: #fef2f2;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border-color: #d1d5db;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .btn-danger {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
        }

        .btn-danger:hover {
          background: #dc2626;
        }

        .empty-state {
          background: white;
          border-radius: 1rem;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }

        .empty-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 1rem;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
          font-size: 2rem;
        }

        .empty-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
        }

        .empty-description {
          color: #6b7280;
          margin: 0 0 1.5rem 0;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .modal-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          transform: scale(0.9);
          transition: transform 0.3s ease;
        }

        .modal-overlay.show .modal-content {
          transform: scale(1);
        }

        .modal-header {
          background: #4CAF50;
          color: white;
          padding: 1.5rem;
          border-radius: 1rem 1rem 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .modal-close {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: background 0.2s;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .detail-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-company-avatar {
          width: 4rem;
          height: 4rem;
          border-radius: 1rem;
          background: #4CAF50;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.5rem;
        }

        .detail-job-info {
          flex: 1;
        }

        .detail-job-info h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
        }

        .detail-company, .detail-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
        }

        .detail-label {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .detail-value {
          font-weight: 500;
          color: #1f2937;
        }

        .timeline-section {
          border-top: 1px solid #f3f4f6;
          padding-top: 1.5rem;
        }

        .timeline-section h4 {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 1rem 0;
        }

        .timeline {
          border-left: 2px solid #f3f4f6;
          padding-left: 1rem;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 1.5rem;
          padding-left: 1rem;
        }

        .timeline-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          position: absolute;
          left: -1.375rem;
          top: 0.375rem;
        }

        .timeline-title {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .timeline-date {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .modal-footer {
          padding: 1.5rem;
          border-top: 1px solid #f3f4f6;
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .filters-content {
            grid-template-columns: 1fr;
          }
          
          .applications-grid {
            grid-template-columns: 1fr;
          }
          
          .card-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .detail-grid {
            grid-template-columns: 1fr;
          }
          
          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-btn" onClick={handleGoBack}>
              ← Back
            </button>
            <h1 className="page-title">Your Applications</h1>
          </div>
          <button className="browse-jobs-btn" onClick={handleBrowseJobs}>
            Browse Jobs
          </button>
        </div>
      </div>

      <div className="main-content">
        {/* Stats Grid */}
        <div className="stats-grid">
          <StatsCard 
            title="Total Applications" 
            count={statusCounts.total} 
            percentage="12"
          />
          <StatsCard 
            title="Under Review" 
            count={statusCounts.pending} 
          />
          <StatsCard 
            title="Accepted" 
            count={statusCounts.accepted} 
          />
          <StatsCard 
            title="Rejected" 
            count={statusCounts.rejected} 
          />
        </div>

        {/* Filters */}
        <div className="filters-card">
          <div className="filters-content">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Under Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Applications Grid */}
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💼</div>
            <h3 className="empty-title">No applications found</h3>
            <p className="empty-description">
              {searchTerm || statusFilter !== 'all' 
                ? "Try adjusting your search or filter criteria." 
                : "You haven't applied to any jobs yet. Start browsing to find your next opportunity!"}
            </p>
            <button className="browse-jobs-btn" onClick={handleBrowseJobs}>
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="applications-grid">
            {filteredApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      <ApplicationDetailsModal />
    </div>
  );
};

export default JobApplications;