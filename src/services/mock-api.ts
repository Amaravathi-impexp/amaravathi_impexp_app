/**
 * Mock API Implementation
 * Simulates successful API responses without requiring a backend
 * All operations return success by default
 */

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  Shipment,
  CreateShipmentRequest,
  UpdateShipmentRequest,
  TrackingInfo,
  Partner,
  CreatePartnerRequest,
  CreateUserRequest,
  Invoice,
  CreateInvoiceRequest,
  DashboardStats,
  AnalyticsData,
  Document,
  PaginatedResponse,
} from '../types';

// Mock data storage
let mockShipments: Shipment[] = [
  {
    id: 'AMRV-2024-001',
    cargo: 'Electronics',
    currentLocation: 'Singapore Port',
    status: 'In Transit',
    eta: '2024-12-28',
    origin: 'Mumbai',
    destination: 'New York',
    containerNumber: 'CONT-001',
    weight: 5000,
    volume: 60,
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'AMRV-2024-002',
    cargo: 'Textiles',
    currentLocation: 'Dubai Port',
    status: 'In Transit',
    eta: '2024-12-25',
    origin: 'Chennai',
    destination: 'London',
    containerNumber: 'CONT-002',
    weight: 3000,
    volume: 40,
    createdAt: '2024-12-05T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'AMRV-2024-003',
    cargo: 'Machinery',
    currentLocation: 'Los Angeles',
    status: 'Cleared',
    eta: '2024-12-23',
    origin: 'Bangalore',
    destination: 'Los Angeles',
    containerNumber: 'CONT-003',
    weight: 8000,
    volume: 80,
    createdAt: '2024-12-10T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'AMRV-2024-004',
    cargo: 'Pharmaceuticals',
    currentLocation: 'Frankfurt',
    status: 'Delayed',
    eta: '2024-12-30',
    alert: 'Customs inspection required',
    origin: 'Hyderabad',
    destination: 'Frankfurt',
    containerNumber: 'CONT-004',
    weight: 2000,
    volume: 30,
    createdAt: '2024-12-12T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'AMRV-2024-005',
    cargo: 'Automotive Parts',
    currentLocation: 'Tokyo',
    status: 'Delivered',
    eta: '2024-12-20',
    origin: 'Pune',
    destination: 'Tokyo',
    containerNumber: 'CONT-005',
    weight: 6000,
    volume: 70,
    createdAt: '2024-12-08T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },
];

let mockPartners: Partner[] = [
  {
    id: 'PART-001',
    companyName: 'Global Shipping Lines',
    contactPerson: 'John Smith',
    email: 'john@globalshipping.com',
    phone: '+1-555-0001',
    country: 'United States',
    partnerType: 'Carrier',
    status: 'Active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'PART-002',
    companyName: 'Euro Customs Services',
    contactPerson: 'Maria Garcia',
    email: 'maria@eurocustoms.com',
    phone: '+44-20-5550002',
    country: 'United Kingdom',
    partnerType: 'Customs Broker',
    status: 'Active',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'PART-003',
    companyName: 'Asia Freight Forwarding',
    contactPerson: 'Lee Chen',
    email: 'lee@asiafreight.com',
    phone: '+65-6555-0003',
    country: 'Singapore',
    partnerType: 'Freight Forwarder',
    status: 'Active',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'PART-004',
    companyName: 'Mumbai Port Logistics',
    contactPerson: 'Raj Patel',
    email: 'raj@mumbaiport.com',
    phone: '+91-22-5550004',
    country: 'India',
    partnerType: 'Port Operator',
    status: 'Active',
    createdAt: '2024-04-05T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'PART-005',
    companyName: 'Swift Warehousing',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@swiftware.com',
    phone: '+1-555-0005',
    country: 'United States',
    partnerType: 'Warehouse',
    status: 'Pending',
    createdAt: '2024-11-20T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
];

let mockUsers: User[] = [
  {
    id: 'USER-001',
    name: 'Admin User',
    email: 'admin@gmail.com',
    role: 'Admin',
    phone: '+1-555-1001',
    cell: '+1-555-2001',
    notifications: { email: true, sms: true, push: true },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'USER-002',
    name: 'John Manager',
    email: 'john@amaravathi.com',
    role: 'Manager',
    phone: '+1-555-1002',
    cell: '+1-555-2002',
    notifications: { email: true, sms: false, push: true },
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
  {
    id: 'USER-003',
    name: 'Sarah Operator',
    email: 'sarah@amaravathi.com',
    role: 'Operator',
    phone: '+1-555-1003',
    cell: '+1-555-2003',
    notifications: { email: true, sms: true, push: false },
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-12-22T00:00:00Z',
  },
];

let mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2024-001',
    customerName: 'TechCorp Solutions',
    amount: 5500,
    currency: 'USD',
    status: 'Paid',
    issueDate: '2024-12-01',
    dueDate: '2024-12-31',
    paidDate: '2024-12-15',
    shipmentId: 'AMRV-2024-001',
    items: [
      { description: 'Ocean Freight', quantity: 1, unitPrice: 5000, total: 5000 },
      { description: 'Documentation Fee', quantity: 1, unitPrice: 500, total: 500 },
    ],
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z',
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2024-002',
    customerName: 'Global Traders Inc',
    amount: 3200,
    currency: 'USD',
    status: 'Pending',
    issueDate: '2024-12-10',
    dueDate: '2025-01-10',
    shipmentId: 'AMRV-2024-002',
    items: [
      { description: 'Ocean Freight', quantity: 1, unitPrice: 3000, total: 3000 },
      { description: 'Insurance', quantity: 1, unitPrice: 200, total: 200 },
    ],
    createdAt: '2024-12-10T00:00:00Z',
    updatedAt: '2024-12-10T00:00:00Z',
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2024-003',
    customerName: 'Manufacturing Co',
    amount: 8500,
    currency: 'USD',
    status: 'Overdue',
    issueDate: '2024-11-15',
    dueDate: '2024-12-15',
    shipmentId: 'AMRV-2024-003',
    items: [
      { description: 'Ocean Freight', quantity: 1, unitPrice: 8000, total: 8000 },
      { description: 'Customs Clearance', quantity: 1, unitPrice: 500, total: 500 },
    ],
    createdAt: '2024-11-15T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z',
  },
];

// Delay to simulate network latency
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API implementation
export const mockApi = {
  // Auth APIs
  auth: {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
      await delay();
      
      if (credentials.email === 'admin@gmail.com' && credentials.password === 'admin') {
        return {
          token: 'mock-jwt-token-' + Date.now(),
          user: mockUsers[0],
        };
      }
      
      throw new Error('Invalid username and password');
    },

    register: async (userData: RegisterRequest): Promise<LoginResponse> => {
      await delay();
      
      const newUser: User = {
        id: 'USER-' + (mockUsers.length + 1).toString().padStart(3, '0'),
        name: userData.name,
        email: userData.email,
        role: 'Operator',
        notifications: { email: true, sms: false, push: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockUsers.push(newUser);
      
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: newUser,
      };
    },

    logout: async (): Promise<void> => {
      await delay(200);
    },

    getCurrentUser: async (): Promise<User> => {
      await delay();
      return mockUsers[0];
    },
  },

  // Shipments APIs
  shipments: {
    getAll: async (params?: any): Promise<PaginatedResponse<Shipment>> => {
      await delay();
      
      let filtered = [...mockShipments];
      
      if (params?.status) {
        filtered = filtered.filter(s => s.status === params.status);
      }
      
      if (params?.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(s => 
          s.id.toLowerCase().includes(search) ||
          s.cargo.toLowerCase().includes(search) ||
          s.currentLocation.toLowerCase().includes(search)
        );
      }
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return {
        data: filtered.slice(start, end),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      };
    },

    getById: async (id: string): Promise<Shipment> => {
      await delay();
      const shipment = mockShipments.find(s => s.id === id);
      if (!shipment) throw new Error('Shipment not found');
      return shipment;
    },

    create: async (data: CreateShipmentRequest): Promise<Shipment> => {
      await delay();
      
      const newShipment: Shipment = {
        id: data.shipmentId,
        cargo: data.cargoType,
        currentLocation: data.origin,
        status: 'Booked',
        eta: data.arrivalDate,
        origin: data.origin,
        destination: data.destination,
        containerNumber: 'CONT-' + (mockShipments.length + 1).toString().padStart(3, '0'),
        weight: data.weight,
        volume: data.volume,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockShipments.unshift(newShipment);
      return newShipment;
    },

    update: async (id: string, updates: UpdateShipmentRequest): Promise<Shipment> => {
      await delay();
      
      const index = mockShipments.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Shipment not found');
      
      mockShipments[index] = {
        ...mockShipments[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      return mockShipments[index];
    },

    delete: async (id: string): Promise<{ message: string }> => {
      await delay();
      
      const index = mockShipments.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Shipment not found');
      
      mockShipments.splice(index, 1);
      return { message: 'Shipment deleted successfully' };
    },

    track: async (shipmentId: string): Promise<TrackingInfo> => {
      await delay();
      
      const shipment = mockShipments.find(s => s.id === shipmentId);
      if (!shipment) throw new Error('Shipment not found');
      
      return {
        shipmentId: shipment.id,
        currentLocation: shipment.currentLocation,
        status: shipment.status,
        timeline: [
          {
            date: '2024-12-15',
            location: shipment.origin || 'Origin Port',
            status: 'Departed',
            description: 'Container loaded and departed',
          },
          {
            date: '2024-12-20',
            location: shipment.currentLocation,
            status: 'In Transit',
            description: 'Container in transit',
          },
        ],
      };
    },

    search: async (query: string): Promise<Shipment[]> => {
      await delay();
      
      const search = query.toLowerCase();
      return mockShipments.filter(s => 
        s.id.toLowerCase().includes(search) ||
        s.cargo.toLowerCase().includes(search) ||
        s.currentLocation.toLowerCase().includes(search)
      );
    },
  },

  // Partners APIs
  partners: {
    getAll: async (params?: any): Promise<PaginatedResponse<Partner>> => {
      await delay();
      
      let filtered = [...mockPartners];
      
      if (params?.status) {
        filtered = filtered.filter(p => p.status === params.status);
      }
      
      if (params?.partnerType) {
        filtered = filtered.filter(p => p.partnerType === params.partnerType);
      }
      
      if (params?.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.companyName.toLowerCase().includes(search) ||
          p.contactPerson.toLowerCase().includes(search) ||
          p.email.toLowerCase().includes(search)
        );
      }
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return {
        data: filtered.slice(start, end),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      };
    },

    getById: async (id: string): Promise<Partner> => {
      await delay();
      const partner = mockPartners.find(p => p.id === id);
      if (!partner) throw new Error('Partner not found');
      return partner;
    },

    create: async (data: CreatePartnerRequest): Promise<Partner> => {
      await delay();
      
      const newPartner: Partner = {
        id: 'PART-' + (mockPartners.length + 1).toString().padStart(3, '0'),
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        country: data.country,
        partnerType: data.partnerType,
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockPartners.unshift(newPartner);
      return newPartner;
    },

    update: async (id: string, updates: Partial<CreatePartnerRequest>): Promise<Partner> => {
      await delay();
      
      const index = mockPartners.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Partner not found');
      
      mockPartners[index] = {
        ...mockPartners[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      return mockPartners[index];
    },

    delete: async (id: string): Promise<{ message: string }> => {
      await delay();
      
      const index = mockPartners.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Partner not found');
      
      mockPartners.splice(index, 1);
      return { message: 'Partner deleted successfully' };
    },
  },

  // Users APIs
  users: {
    getAll: async (params?: any): Promise<PaginatedResponse<User>> => {
      await delay();
      
      let filtered = [...mockUsers];
      
      if (params?.role) {
        filtered = filtered.filter(u => u.role === params.role);
      }
      
      if (params?.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(u => 
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
        );
      }
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return {
        data: filtered.slice(start, end),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      };
    },

    getById: async (id: string): Promise<User> => {
      await delay();
      const user = mockUsers.find(u => u.id === id);
      if (!user) throw new Error('User not found');
      return user;
    },

    create: async (data: CreateUserRequest): Promise<User> => {
      await delay();
      
      const newUser: User = {
        id: 'USER-' + (mockUsers.length + 1).toString().padStart(3, '0'),
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        cell: data.cell,
        notifications: data.notifications || { email: true, sms: false, push: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockUsers.unshift(newUser);
      return newUser;
    },

    update: async (id: string, updates: Partial<CreateUserRequest>): Promise<User> => {
      await delay();
      
      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) throw new Error('User not found');
      
      mockUsers[index] = {
        ...mockUsers[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      return mockUsers[index];
    },

    delete: async (id: string): Promise<{ message: string }> => {
      await delay();
      
      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) throw new Error('User not found');
      
      mockUsers.splice(index, 1);
      return { message: 'User deleted successfully' };
    },
  },

  // Invoices APIs
  invoices: {
    getAll: async (params?: any): Promise<PaginatedResponse<Invoice>> => {
      await delay();
      
      let filtered = [...mockInvoices];
      
      if (params?.status) {
        filtered = filtered.filter(i => i.status === params.status);
      }
      
      if (params?.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(i => 
          i.invoiceNumber.toLowerCase().includes(search) ||
          i.customerName.toLowerCase().includes(search)
        );
      }
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return {
        data: filtered.slice(start, end),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
      };
    },

    getById: async (id: string): Promise<Invoice> => {
      await delay();
      const invoice = mockInvoices.find(i => i.id === id);
      if (!invoice) throw new Error('Invoice not found');
      return invoice;
    },

    create: async (data: CreateInvoiceRequest): Promise<Invoice> => {
      await delay();
      
      const total = data.items.reduce((sum, item) => sum + item.total, 0);
      
      const newInvoice: Invoice = {
        id: 'INV-' + (mockInvoices.length + 1).toString().padStart(3, '0'),
        invoiceNumber: 'INV-2024-' + (mockInvoices.length + 1).toString().padStart(3, '0'),
        customerName: data.customerName,
        amount: total,
        currency: data.currency,
        status: 'Pending',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: data.dueDate,
        shipmentId: data.shipmentId,
        items: data.items,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockInvoices.unshift(newInvoice);
      return newInvoice;
    },

    update: async (id: string, updates: Partial<CreateInvoiceRequest>): Promise<Invoice> => {
      await delay();
      
      const index = mockInvoices.findIndex(i => i.id === id);
      if (index === -1) throw new Error('Invoice not found');
      
      mockInvoices[index] = {
        ...mockInvoices[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      return mockInvoices[index];
    },

    delete: async (id: string): Promise<{ message: string }> => {
      await delay();
      
      const index = mockInvoices.findIndex(i => i.id === id);
      if (index === -1) throw new Error('Invoice not found');
      
      mockInvoices.splice(index, 1);
      return { message: 'Invoice deleted successfully' };
    },

    markAsPaid: async (id: string): Promise<Invoice> => {
      await delay();
      
      const index = mockInvoices.findIndex(i => i.id === id);
      if (index === -1) throw new Error('Invoice not found');
      
      mockInvoices[index] = {
        ...mockInvoices[index],
        status: 'Paid',
        paidDate: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString(),
      };
      
      return mockInvoices[index];
    },
  },

  // Dashboard APIs
  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      await delay();
      
      return {
        totalShipments: mockShipments.length,
        activeShipments: mockShipments.filter(s => s.status === 'In Transit').length,
        pendingDeliveries: mockShipments.filter(s => s.status === 'In Transit' || s.status === 'Booked').length,
        completedShipments: mockShipments.filter(s => s.status === 'Delivered').length,
        revenue: {
          total: mockInvoices.reduce((sum, inv) => sum + inv.amount, 0),
          currency: 'USD',
          growth: 12.5,
        },
        alerts: mockShipments.filter(s => s.alert).length,
      };
    },

    getAnalytics: async (): Promise<AnalyticsData> => {
      await delay();
      
      return {
        shipmentsByStatus: {
          'In Transit': mockShipments.filter(s => s.status === 'In Transit').length,
          'Delivered': mockShipments.filter(s => s.status === 'Delivered').length,
          'Delayed': mockShipments.filter(s => s.status === 'Delayed').length,
          'Cleared': mockShipments.filter(s => s.status === 'Cleared').length,
          'Booked': mockShipments.filter(s => s.status === 'Booked').length,
        },
        shipmentsByMonth: [
          { month: 'Jan', count: 12 },
          { month: 'Feb', count: 15 },
          { month: 'Mar', count: 18 },
          { month: 'Apr', count: 14 },
          { month: 'May', count: 20 },
          { month: 'Jun', count: 22 },
        ],
        revenueByMonth: [
          { month: 'Jan', revenue: 50000 },
          { month: 'Feb', revenue: 62000 },
          { month: 'Mar', revenue: 58000 },
          { month: 'Apr', revenue: 71000 },
          { month: 'May', revenue: 65000 },
          { month: 'Jun', revenue: 78000 },
        ],
        topRoutes: [
          { route: 'Mumbai - New York', count: 25 },
          { route: 'Chennai - London', count: 18 },
          { route: 'Bangalore - Frankfurt', count: 15 },
          { route: 'Hyderabad - Singapore', count: 12 },
          { route: 'Pune - Tokyo', count: 10 },
        ],
      };
    },
  },
};
