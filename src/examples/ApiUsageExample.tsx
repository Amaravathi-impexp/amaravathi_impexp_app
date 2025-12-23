/**
 * API Usage Examples
 * This file demonstrates how to use the API services in React components
 * You can reference these patterns when integrating APIs into your screens
 */

import { useState, useEffect } from 'react';
import { shipmentsService, partnersService, invoicesService } from '../services';
import { useApi, useMutation } from '../hooks/useApi';
import type { Shipment, CreateShipmentRequest } from '../types';

/**
 * Example 1: Fetching data with useApi hook
 */
export function ShipmentsListExample() {
  const { data, loading, error, execute } = useApi(shipmentsService.getAll);

  useEffect(() => {
    // Fetch shipments on component mount
    execute({ page: 1, limit: 10 });
  }, []);

  if (loading) return <div>Loading shipments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Shipments</h2>
      {data?.data.map((shipment: Shipment) => (
        <div key={shipment.id}>
          {shipment.id} - {shipment.cargo}
        </div>
      ))}
    </div>
  );
}

/**
 * Example 2: Creating data with useMutation hook
 */
export function CreateShipmentExample() {
  const { loading, error, mutate } = useMutation(
    shipmentsService.create,
    (newShipment) => {
      console.log('Shipment created:', newShipment);
      alert('Shipment created successfully!');
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const shipmentData: CreateShipmentRequest = {
      shipmentId: 'AMRV-2024-009',
      customerName: 'ABC Corp',
      origin: 'Mumbai',
      destination: 'New York',
      departureDate: '2024-12-25',
      arrivalDate: '2025-01-05',
      containerType: '40ft',
      cargoType: 'Electronics',
      weight: 5000,
      volume: 60,
      value: 50000,
      currency: 'USD',
      incoterms: 'FOB',
    };

    await mutate(shipmentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Shipment'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

/**
 * Example 3: Manual API calls without hooks
 */
export function ManualApiCallExample() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const response = await shipmentsService.getAll({ page: 1, limit: 10 });
      setShipments(response.data);
    } catch (error) {
      console.error('Failed to fetch shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div>
      {loading ? 'Loading...' : `${shipments.length} shipments loaded`}
    </div>
  );
}

/**
 * Example 4: Search functionality
 */
export function SearchExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Shipment[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const searchResults = await shipmentsService.search(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search shipments..."
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        {results.map((shipment) => (
          <div key={shipment.id}>{shipment.cargo}</div>
        ))}
      </div>
    </div>
  );
}

/**
 * Example 5: Update/Delete operations
 */
export function UpdateDeleteExample({ shipmentId }: { shipmentId: string }) {
  const handleUpdate = async () => {
    try {
      const updated = await shipmentsService.update(shipmentId, {
        status: 'In Transit',
        currentLocation: 'Port of Singapore',
      });
      console.log('Updated:', updated);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await shipmentsService.delete(shipmentId);
      console.log('Deleted successfully');
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

/**
 * Example 6: Multiple API calls in sequence
 */
export function MultipleCallsExample() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch partners first
        const partners = await partnersService.getAll({ page: 1, limit: 10 });
        
        // Then fetch invoices
        const invoices = await invoicesService.getAll({ page: 1, limit: 10 });
        
        setData({ partners, invoices });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? 'Data loaded' : 'Loading...'}</div>;
}

/**
 * Example 7: Parallel API calls
 */
export function ParallelCallsExample() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Execute all API calls in parallel
        const [partners, invoices, shipments] = await Promise.all([
          partnersService.getAll({ page: 1, limit: 10 }),
          invoicesService.getAll({ page: 1, limit: 10 }),
          shipmentsService.getAll({ page: 1, limit: 10 }),
        ]);

        setData({ partners, invoices, shipments });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchAllData();
  }, []);

  return <div>{data ? 'All data loaded' : 'Loading...'}</div>;
}

/**
 * Example 8: Pagination
 */
export function PaginationExample() {
  const [page, setPage] = useState(1);
  const { data, loading, execute } = useApi(shipmentsService.getAll);

  useEffect(() => {
    execute({ page, limit: 10 });
  }, [page]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      
      {data && (
        <>
          <div>
            Showing {data.data.length} of {data.total} shipments
          </div>
          
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          
          <span>Page {page} of {data.totalPages}</span>
          
          <button 
            onClick={() => setPage(p => p + 1)}
            disabled={page >= data.totalPages}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}
