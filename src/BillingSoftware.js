import React, { useState, useRef } from 'react';
import { 
  Menu, X, Users, List, BarChart3, FileText, ShoppingCart, CreditCard, Wallet, Store, Package, RefreshCw, Settings, RotateCcw, Plus, Crown, Bell, TrendingUp, ChevronDown, ChevronRight, 
  Search, Camera, Phone, MessageSquare, Upload, Printer, Download, Calendar, Eye, Calculator, Percent, Receipt, DollarSign, QrCode, MapPin, Mail, Edit, Trash2, Save, ArrowLeft, User, Building, Hash, ScanLine, Image, FileImage, Share2, Smartphone, Wifi, ArrowUp, ArrowDown
} from 'lucide-react';

const BillingSoftware = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [activeTab, setActiveTab] = useState('Parties');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [expandedMenus, setExpandedMenus] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [discountType, setDiscountType] = useState('Percentage');
  const [discountValue, setDiscountValue] = useState(0);
  const [taxRate, setTaxRate] = useState('18% GST');
  const [reportType, setReportType] = useState('Sales Summary');
  const [dateRange, setDateRange] = useState('Today');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', mobile: '9876543210', email: 'john@email.com', dob: '1990-05-15', address: '123 Main St, City', due: 2500, totalSales: 15000 },
    { id: 2, name: 'Jane Smith', mobile: '9876543211', email: 'jane@email.com', dob: '1985-08-20', address: '456 Oak Ave, City', due: 0, totalSales: 8500 },
    { id: 3, name: 'Mike Johnson', mobile: '9876543212', email: 'mike@email.com', dob: '1992-03-10', address: '789 Pine Rd, City', due: 1200, totalSales: 6300 }
  ]);
  
  const [products, setProducts] = useState([
    { id: 1, name: 'Progressive Lens', type: 'Lens', category: 'Progressive', barcode: '1234567890123', price: 2500, stock: 50, supplier: 'Essilor' },
    { id: 2, name: 'Titanium Frame', type: 'Frame', category: 'Premium', barcode: '1234567890124', price: 3500, stock: 25, supplier: 'Luxottica' },
    { id: 3, name: 'Anti-Glare Coating', type: 'Coating', category: 'Treatment', barcode: '1234567890125', price: 500, stock: 100, supplier: 'Zeiss' },
    { id: 4, name: 'Blue Light Filter', type: 'Coating', category: 'Treatment', barcode: '1234567890126', price: 800, stock: 75, supplier: 'Zeiss' },
    { id: 5, name: 'Designer Frame', type: 'Frame', category: 'Designer', barcode: '1234567890127', price: 5000, stock: 15, supplier: 'Ray-Ban' }
  ]);
  
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', customerId: 1, date: '2024-01-15', amount: 5500, tax: 990, total: 6490, status: 'Paid', items: [] },
    { id: 'INV-002', customerId: 2, date: '2024-01-16', amount: 3000, tax: 540, total: 3540, status: 'Due', items: [] },
    { id: 'INV-003', customerId: 3, date: '2024-01-17', amount: 1800, tax: 324, total: 2124, status: 'Partial', items: [] }
  ]);
  
  const [barcodeScanning, setBarcodeScanning] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: 'success' });
  const fileInputRef = useRef(null);

  // Filter functions
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.mobile.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.barcode.includes(productSearchTerm) ||
    product.type.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  // Utility functions
  const showAlertMessage = (message, type = 'success') => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => setShowAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    showAlertMessage(`Navigated to ${view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}`);
  };

  const toggleMenuExpansion = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedCustomer('');
    setInvoiceItems([]);
  };

  // Customer functions
  const addCustomer = (customerData) => {
    const newCustomer = {
      id: customers.length + 1,
      ...customerData,
      due: 0,
      totalSales: 0
    };
    setCustomers([...customers, newCustomer]);
    showAlertMessage('Customer added successfully!');
    closeModal();
  };

  const editCustomer = (customerId) => {
    showAlertMessage('Edit customer functionality - opens edit modal');
    // In real app, would open edit modal with customer data
  };

  const deleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== customerId));
      showAlertMessage('Customer deleted successfully!', 'success');
    }
  };

  const callCustomer = (mobile) => {
    showAlertMessage(`Initiating call to ${mobile}`, 'info');
    // In real app, would integrate with phone system
  };

  const messageCustomer = (mobile) => {
    showAlertMessage(`Opening message to ${mobile}`, 'info');
    // In real app, would open SMS or WhatsApp
  };

  // Product functions
  const addProduct = (productData) => {
    const newProduct = {
      id: products.length + 1,
      ...productData
    };
    setProducts([...products, newProduct]);
    showAlertMessage('Product added successfully!');
    closeModal();
  };

  const editProduct = (productId) => {
    showAlertMessage('Edit product functionality - opens edit modal');
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      showAlertMessage('Product deleted successfully!');
    }
  };

  const generateBarcode = (productId) => {
    showAlertMessage('Generating barcode for product', 'info');
    // In real app, would generate and download barcode
  };

  // Invoice functions
  const addProductToInvoice = (product) => {
    const existingItem = invoiceItems.find(item => item.id === product.id);
    if (existingItem) {
      setInvoiceItems(invoiceItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setInvoiceItems([...invoiceItems, {
        ...product,
        quantity: 1,
        discount: 0,
        total: product.price
      }]);
    }
    showAlertMessage(`${product.name} added to invoice`);
  };

  const updateInvoiceItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setInvoiceItems(invoiceItems.filter(item => item.id !== productId));
    } else {
      setInvoiceItems(invoiceItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price * (1 - item.discount / 100) }
          : item
      ));
    }
  };

  const calculateInvoiceTotal = () => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = discountType === 'Percentage' 
      ? (subtotal * discountValue / 100)
      : discountValue;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = afterDiscount * (parseFloat(taxRate) / 100);
    return {
      subtotal,
      discountAmount,
      taxAmount,
      total: afterDiscount + taxAmount
    };
  };

  const createInvoice = () => {
    if (!selectedCustomer || invoiceItems.length === 0) {
      showAlertMessage('Please select customer and add products', 'error');
      return;
    }

    const { total, taxAmount } = calculateInvoiceTotal();
    const newInvoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      customerId: parseInt(selectedCustomer),
      date: invoiceDate,
      amount: total - taxAmount,
      tax: taxAmount,
      total: total,
      status: 'Due',
      items: [...invoiceItems]
    };

    setInvoices([...invoices, newInvoice]);
    showAlertMessage('Invoice created successfully!');
    closeModal();
  };

  // Report functions
  const generateReport = () => {
    showAlertMessage(`Generating ${reportType} report for ${dateRange} in ${exportFormat} format`, 'info');
    // In real app, would generate and download report
  };

  const downloadReport = () => {
    showAlertMessage(`Downloading report in ${exportFormat} format`, 'info');
  };

  const shareReport = () => {
    showAlertMessage('Opening share options for report', 'info');
  };

  // Invoice actions
  const downloadInvoice = (invoiceId) => {
    showAlertMessage(`Downloading invoice ${invoiceId}`, 'info');
  };

  const shareInvoice = (invoiceId) => {
    showAlertMessage(`Sharing invoice ${invoiceId}`, 'info');
  };

  const printInvoice = (invoiceId) => {
    showAlertMessage(`Printing invoice ${invoiceId}`, 'info');
  };

  const menuItems = [
    { id: 'parties', label: 'Parties', icon: Users, hasDropdown: true },
    { id: 'items', label: 'Items', icon: List },
    { id: 'dashboard', label: 'Business Dashboard', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { 
      id: 'sale', 
      label: 'Sale', 
      icon: ShoppingCart, 
      hasDropdown: true,
      subItems: [
        { id: 'sale-invoice', label: 'Sale Invoice', icon: Receipt },
        { id: 'payment-in', label: 'Payment-In', icon: ArrowDown },
        { id: 'sale-return', label: 'Sale Return', icon: RotateCcw },
        { id: 'estimation', label: 'Estimation/Quote', icon: FileText },
        { id: 'sale-order', label: 'Sale Order', icon: List }
      ]
    },
    { 
      id: 'purchase', 
      label: 'Purchase', 
      icon: CreditCard, 
      hasDropdown: true,
      subItems: [
        { id: 'purchase-bills', label: 'Purchase Bills', icon: Receipt },
        { id: 'payment-out', label: 'Payment-Out', icon: ArrowUp },
        { id: 'purchase-return', label: 'Purchase Return', icon: RotateCcw },
        { id: 'purchase-order', label: 'Purchase Order', icon: List }
      ]
    },
    { id: 'expense', label: 'Expense', icon: Wallet, hasAdd: true },
    { id: 'income', label: 'Other Income', icon: Plus, hasAdd: true },
    { id: 'cash', label: 'Cash & Bank', icon: Wallet, hasDropdown: true },
    { id: 'store', label: 'My Online Store', icon: Store },
    { id: 'products', label: 'Other Products', icon: Package },
    { id: 'sync', label: 'Sync & Share', icon: RefreshCw },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'backup', label: 'Backup/Restore', icon: RotateCcw, hasDropdown: true }
  ];

  // Alert Component
  const Alert = () => {
    if (!showAlert.show) return null;
    
    const bgColor = showAlert.type === 'error' ? 'bg-red-100 border-red-500 text-red-700' : 
                   showAlert.type === 'info' ? 'bg-blue-100 border-blue-500 text-blue-700' :
                   'bg-green-100 border-green-500 text-green-700';
    
    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-sm`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{showAlert.message}</span>
          <button 
            onClick={() => setShowAlert({ show: false, message: '', type: 'success' })}
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const CustomerModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      mobile: '',
      email: '',
      dob: '',
      address: '',
      city: '',
      pincode: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.mobile) {
        showAlertMessage('Name and mobile are required', 'error');
        return;
      }
      addCustomer(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold">Add New Customer</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter customer name" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                <input 
                  type="tel" 
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter mobile number" 
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter email address" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                rows="3" 
                placeholder="Enter complete address"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter city" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                <input 
                  type="text" 
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter PIN code" 
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 mt-6">
              <button type="button" onClick={closeModal} className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save Customer</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ProductModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      type: '',
      category: '',
      barcode: '',
      price: '',
      stock: '',
      supplier: '',
      taxRate: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.type || !formData.price) {
        showAlertMessage('Name, type, and price are required', 'error');
        return;
      }
      addProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold">Add New Product</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter product name" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Type*</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Lens">Lens</option>
                  <option value="Frame">Frame</option>
                  <option value="Coating">Coating</option>
                  <option value="Contact Lens">Contact Lens</option>
                  <option value="Sunglasses">Sunglasses</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Progressive">Progressive</option>
                  <option value="Single Vision">Single Vision</option>
                  <option value="Bifocal">Bifocal</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Economy">Economy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.barcode}
                    onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter or scan barcode" 
                  />
                  <button 
                    type="button"
                    onClick={() => setBarcodeScanning(true)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                  >
                    <QrCode className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter price" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input 
                  type="number" 
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter stock quantity" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input 
                  type="text" 
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter supplier name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                <select 
                  value={formData.taxRate}
                  onChange={(e) => setFormData({...formData, taxRate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Tax Rate</option>
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 mt-6">
              <button type="button" onClick={closeModal} className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save Product</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const InvoiceModal = () => {
    const totals = calculateInvoiceTotal();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold">Create New Invoice</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setBarcodeScanning(true)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  <Camera className="h-5 w-5" />
                </button>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-6">
            {/* Customer Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer*</label>
                <select 
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name} - {customer.mobile}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                <input 
                  type="date" 
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>

            {/* Product Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Add Products</h3>
              <div className="border border-gray-300 rounded-lg">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1 w-full">
                      <input 
                        type="text" 
                        placeholder="Search products or scan barcode..." 
                        value={productSearchTerm}
                        onChange={(e) => setProductSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg" 
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => showAlertMessage('Search functionality working')}
                        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        <Search className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => setBarcodeScanning(true)}
                        className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        <Camera className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {/* Product Search Results */}
                  {productSearchTerm && (
                    <div className="mt-4 bg-white rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
                      {filteredProducts.map(product => (
                        <div 
                          key={product.id}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            addProductToInvoice(product);
                            setProductSearchTerm('');
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-sm">{product.name}</div>
                              <div className="text-xs text-gray-500">{product.type} - {product.category}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-sm">₹{product.price.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">{product.stock} in stock</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Invoice Items */}
                <div className="p-4">
                  {invoiceItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>No products added yet</p>
                      <p className="text-sm">Search and add products to create invoice</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="hidden sm:grid grid-cols-12 gap-2 text-sm font-medium text-gray-700 pb-2 border-b">
                        <div className="col-span-4">Product</div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-2">Qty</div>
                        <div className="col-span-2">Discount</div>
                        <div className="col-span-2">Total</div>
                      </div>
                      {invoiceItems.map(item => (
                        <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 bg-gray-50 rounded-lg">
                          <div className="sm:col-span-4">
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500 sm:hidden">₹{item.price} each</div>
                          </div>
                          <div className="sm:col-span-2 flex sm:block items-center justify-between">
                            <span className="text-sm sm:hidden font-medium">Price:</span>
                            <span className="text-sm">₹{item.price}</span>
                          </div>
                          <div className="sm:col-span-2 flex sm:block items-center justify-between">
                            <span className="text-sm sm:hidden font-medium">Qty:</span>
                            <input 
                              type="number" 
                              value={item.quantity}
                              onChange={(e) => updateInvoiceItemQuantity(item.id, parseInt(e.target.value))}
                              className="w-20 p-1 border border-gray-300 rounded text-sm text-center"
                              min="0"
                            />
                          </div>
                          <div className="sm:col-span-2 flex sm:block items-center justify-between">
                            <span className="text-sm sm:hidden font-medium">Discount:</span>
                            <span className="text-sm">₹{item.discount || 0}</span>
                          </div>
                          <div className="sm:col-span-2 flex sm:block items-center justify-between">
                            <span className="text-sm sm:hidden font-medium">Total:</span>
                            <span className="text-sm font-medium">₹{item.total.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Invoice Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Discount & Tax</h3>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <span className="text-sm">Discount Type:</span>
                      <select 
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        className="p-2 border border-gray-300 rounded text-sm sm:w-32"
                      >
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed Amount</option>
                      </select>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <span className="text-sm">Discount Value:</span>
                      <input 
                        type="number" 
                        value={discountValue}
                        onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                        className="p-2 border border-gray-300 rounded text-sm sm:w-24" 
                        placeholder="0" 
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <span className="text-sm">Tax Rate:</span>
                      <select 
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        className="p-2 border border-gray-300 rounded text-sm sm:w-32"
                      >
                        <option value="18">18% GST</option>
                        <option value="12">12% GST</option>
                        <option value="5">5% GST</option>
                        <option value="0">No Tax</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Invoice Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{totals.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>₹{totals.discountAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>₹{totals.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>₹{totals.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
            <div className="flex space-x-3">
              <button 
                onClick={() => showAlertMessage('Draft saved successfully')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center text-sm"
              >
                <FileImage className="h-4 w-4 mr-2" />
                Save Draft
              </button>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button onClick={closeModal} className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button 
                onClick={createInvoice}
                className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BarcodeScanner = () => (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6 text-center">
          <div className="mb-4">
            <Camera className="h-16 w-16 mx-auto text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Barcode Scanner</h3>
            <p className="text-gray-600 text-sm">Position the barcode within the frame to scan</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 mb-4">
            <div className="border-2 border-dashed border-blue-500 rounded-lg p-8">
              <ScanLine className="h-8 w-8 mx-auto text-blue-500 animate-pulse" />
              <p className="text-sm text-gray-600 mt-2">Scanning...</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setBarcodeScanning(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setBarcodeScanning(false);
                showAlertMessage('Manual entry mode activated');
              }}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Manual Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PartiesView = () => (
    <div className="flex-1 bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Customers</h1>
          </div>
          <button 
            onClick={() => openModal('customer')}
            className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 text-sm"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Add Customer</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative w-full">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search customers..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button 
                onClick={() => showAlertMessage('Filter options opened')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Users className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Customer</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Contact</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Due Amount</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Total Sales</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 sm:p-4">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{customer.name}</div>
                        <div className="text-xs text-gray-500 hidden sm:block">{customer.address}</div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                          <span>{customer.mobile}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1 hidden sm:flex">
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                          <span>{customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.due > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        ₹{customer.due.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="text-xs sm:text-sm font-medium">₹{customer.totalSales.toLocaleString()}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button 
                          onClick={() => editCustomer(customer.id)}
                          className="p-1 sm:p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                          onClick={() => callCustomer(customer.mobile)}
                          className="p-1 sm:p-2 text-green-600 hover:bg-green-100 rounded-lg"
                        >
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                          onClick={() => messageCustomer(customer.mobile)}
                          className="p-1 sm:p-2 text-purple-600 hover:bg-purple-100 rounded-lg"
                        >
                          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                          onClick={() => deleteCustomer(customer.id)}
                          className="p-1 sm:p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const ItemsView = () => (
    <div className="flex-1 bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Products & Inventory</h1>
          </div>
          <button 
            onClick={() => openModal('product')}
            className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 text-sm"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative w-full">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button 
                onClick={() => setBarcodeScanning(true)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <QrCode className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Product</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Type/Category</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Barcode</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Price</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Stock</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 sm:p-4">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                        <div className="text-xs text-gray-500 hidden sm:block">{product.supplier}</div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {product.type}
                        </span>
                        <div className="text-xs text-gray-500 mt-1 hidden sm:block">{product.category}</div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{product.barcode}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="text-sm font-medium">₹{product.price.toLocaleString()}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button 
                          onClick={() => editProduct(product.id)}
                          className="p-1 sm:p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                          onClick={() => generateBarcode(product.id)}
                          className="p-1 sm:p-2 text-green-600 hover:bg-green-100 rounded-lg"
                        >
                          <QrCode className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-1 sm:p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="flex-1 bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Business Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <select 
              onChange={(e) => showAlertMessage(`Filter changed to ${e.target.value}`)}
              className="p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Sales</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">₹1,25,000</p>
                <p className="text-xs sm:text-sm text-green-600">+12% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 sm:h-12 sm:w-12 text-green-500 bg-green-100 p-2 rounded-lg" />
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Due</p>
                <p className="text-lg sm:text-2xl font-bold text-red-600">₹25,000</p>
                <p className="text-xs sm:text-sm text-red-600">From 15 customers</p>
              </div>
              <Receipt className="h-8 w-8 sm:h-12 sm:w-12 text-red-500 bg-red-100 p-2 rounded-lg" />
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Customers</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">450</p>
                <p className="text-xs sm:text-sm text-blue-600">+25 this month</p>
              </div>
              <Users className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500 bg-blue-100 p-2 rounded-lg" />
            </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Low Stock Items</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">8</p>
                <p className="text-xs sm:text-sm text-orange-600">Need reorder</p>
              </div>
              <Package className="h-8 w-8 sm:h-12 sm:w-12 text-orange-500 bg-orange-100 p-2 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Invoice</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Customer</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Date</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Amount</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Status</th>
                  <th className="text-left p-3 sm:p-4 font-medium text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 sm:p-4">
                      <span className="font-medium text-blue-600 text-sm">{invoice.id}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="text-gray-900 text-sm">{customers.find(c => c.id === invoice.customerId)?.name}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="text-gray-600 text-sm">{new Date(invoice.date).toLocaleDateString()}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="font-medium text-sm">₹{invoice.total.toLocaleString()}</span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        invoice.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button 
                          onClick={() => downloadInvoice(invoice.id)}
                          className="p-1 sm:p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                          onClick={() => shareInvoice(invoice.id)}
                          className="p-1 sm:p-2 text-green-600 hover:bg-green-100 rounded-lg"
                        >
                          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                          onClick={() => printInvoice(invoice.id)}
                          className="p-1 sm:p-2 text-purple-600 hover:bg-purple-100 rounded-lg"
                        >
                          <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const ReportsView = () => (
    <div className="flex-1 bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Reports & Analytics</h1>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 space-y-6">
        {/* Report Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { icon: BarChart3, title: 'Sales Report', desc: 'Daily, weekly & monthly sales analysis', color: 'blue' },
            { icon: Calculator, title: 'Profit Report', desc: 'Detailed profit & loss analysis', color: 'green' },
            { icon: Users, title: 'Customer Report', desc: 'Customer analysis & due reports', color: 'purple' },
            { icon: Package, title: 'Inventory Report', desc: 'Stock levels & reorder alerts', color: 'orange' },
            { icon: Receipt, title: 'Tax Report', desc: 'GST & tax calculation reports', color: 'red' },
            { icon: Eye, title: 'Prescription Report', desc: 'Eye power analysis trends', color: 'indigo' }
          ].map((report, index) => (
            <div 
              key={index}
              onClick={() => showAlertMessage(`Opening ${report.title}`)}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <report.icon className={`h-10 w-10 sm:h-12 sm:w-12 text-${report.color}-500 bg-${report.color}-100 p-2 rounded-lg`} />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{report.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{report.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Report Generation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Generate Quick Report</h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option>Sales Summary</option>
                  <option>Profit Analysis</option>
                  <option>Customer Due</option>
                  <option>Inventory Status</option>
                  <option>Tax Summary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <select 
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={generateReport}
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2 text-sm"
              >
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Generate Report</span>
              </button>
              <button 
                onClick={downloadReport}
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2 text-sm"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Download</span>
              </button>
              <button 
                onClick={shareReport}
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2 text-sm"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="flex-1 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Rohit</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg border border-gray-200 w-80 z-40">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {[
              { message: 'Low stock alert: Progressive Lens (5 left)', type: 'warning' },
              { message: 'New customer John Doe added', type: 'info' },
              { message: 'Invoice INV-003 payment received', type: 'success' }
            ].map((notif, index) => (
              <div key={index} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                <p className="text-sm text-gray-700">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200">
            <button 
              onClick={() => setShowNotifications(false)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800"
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation with proper spacing */}
      <div className="px-2 sm:px-4 mt-4 mb-6">
        <div className="flex justify-center space-x-4 overflow-x-auto scrollbar-hide">
          {['Parties', 'Transactions', 'Items'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'Transactions') {
                  showAlertMessage('Transactions view opened');
                } else if (tab === 'Items') {
                  handleNavigation('items');
                }
              }}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 rounded-full font-medium transition-colors text-sm ${
                activeTab === tab
                  ? 'bg-pink-100 text-pink-600 border-2 border-pink-300'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'Parties' && (
          <>
            {/* New Party Button */}
            <div className="px-2 sm:px-4 mb-6">
              <button 
                onClick={() => openModal('customer')}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-200 transition-colors text-sm"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">New Party</span>
              </button>
            </div>

            {/* Add Parties Section */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
              <div className="flex space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                <div className="bg-teal-100 p-3 sm:p-4 rounded-lg">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
                </div>
                <div className="bg-teal-200 p-2 rounded-lg">
                  <div className="h-3 sm:h-4 bg-teal-400 rounded w-12 sm:w-16 mb-1"></div>
                  <div className="h-2 sm:h-3 bg-teal-300 rounded w-8 sm:w-12"></div>
                </div>
              </div>
              <div className="flex space-x-2 sm:space-x-4 mb-6 sm:mb-8">
                <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                </div>
                <div className="bg-yellow-200 p-2 rounded-lg">
                  <div className="h-3 sm:h-4 bg-yellow-400 rounded w-12 sm:w-16 mb-1"></div>
                  <div className="h-2 sm:h-3 bg-yellow-300 rounded w-8 sm:w-12"></div>
                </div>
                <div className="bg-red-100 p-3 sm:p-4 rounded-lg">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                </div>
                <div className="bg-red-200 p-2 rounded-lg">
                  <div className="h-3 sm:h-4 bg-red-400 rounded w-12 sm:w-16 mb-1"></div>
                  <div className="h-2 sm:h-3 bg-red-300 rounded w-8 sm:w-12"></div>
                </div>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Add Parties</h2>
              <p className="text-gray-500 text-center mb-6 sm:mb-8 text-sm sm:text-base">
                Add customers (parties) of<br />
                your business
              </p>
            </div>
          </>
        )}

        {activeTab === 'Transactions' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Transactions</h2>
              <p className="text-gray-500 text-center mb-6 text-sm sm:text-base">
                View and manage all your<br />
                business transactions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <button 
                  onClick={() => handleNavigation('dashboard')}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                >
                  <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                  <div className="font-medium text-gray-900">View Dashboard</div>
                  <div className="text-sm text-gray-500">Sales & analytics</div>
                </button>
                <button 
                  onClick={() => openModal('invoice')}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                >
                  <Plus className="h-8 w-8 text-green-600 mb-2" />
                  <div className="font-medium text-gray-900">New Transaction</div>
                  <div className="text-sm text-gray-500">Create invoice</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Items' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Package className="h-12 w-12 text-purple-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Items & Inventory</h2>
              <p className="text-gray-500 text-center mb-6 text-sm sm:text-base">
                Manage your products and<br />
                inventory stock
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <button 
                  onClick={() => handleNavigation('items')}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                >
                  <List className="h-8 w-8 text-purple-600 mb-2" />
                  <div className="font-medium text-gray-900">View Products</div>
                  <div className="text-sm text-gray-500">Manage inventory</div>
                </button>
                <button 
                  onClick={() => openModal('product')}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                >
                  <Plus className="h-8 w-8 text-blue-600 mb-2" />
                  <div className="font-medium text-gray-900">Add Product</div>
                  <div className="text-sm text-gray-500">New item</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 p-3 sm:p-4 mt-auto">
        <div className="flex items-center justify-between space-x-2 sm:space-x-4">
          <button 
            onClick={() => showAlertMessage('Take Payment functionality opened')}
            className="bg-blue-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-blue-600 transition-colors text-sm sm:text-base flex-1 max-w-[140px]"
          >
            Take Payment
          </button>
          <button 
            onClick={() => openModal('invoice')}
            className="border-2 border-blue-500 text-blue-500 p-3 sm:p-4 rounded-full hover:bg-blue-50 transition-colors"
          >
            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button 
            onClick={() => openModal('invoice')}
            className="bg-red-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-red-600 transition-colors text-sm sm:text-base flex-1 max-w-[140px]"
          >
            Add Sale
          </button>
        </div>
      </div>
    </div>
  );

  const SideMenu = () => (
    <div className={`fixed inset-0 z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-full">
        <div className="bg-white w-80 max-w-[85vw] shadow-xl">
          {/* Menu Header */}
          <div className="bg-blue-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-full p-2">
                  <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                </div>
                <div>
                  <span className="font-medium text-sm sm:text-base">Change Company</span>
                  <ChevronDown className="h-4 w-4 inline ml-1" />
                </div>
              </div>
              <button 
                onClick={toggleMenu}
                className="p-1 hover:bg-blue-600 rounded"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id}>
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => {
                      if (item.hasDropdown) {
                        toggleMenuExpansion(item.id);
                      } else {
                        handleNavigation(item.id);
                      }
                    }}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-900 font-medium text-sm sm:text-base">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.hasAdd && (
                        <Plus className="h-4 w-4 text-gray-400" />
                      )}
                      {item.hasDropdown && (
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                          expandedMenus[item.id] ? 'rotate-180' : ''
                        }`} />
                      )}
                    </div>
                  </button>
                </div>
                
                {/* Submenu Items */}
                {item.hasDropdown && item.subItems && expandedMenus[item.id] && (
                  <div className="bg-gray-50 border-b border-gray-100">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavigation(subItem.id)}
                        className="w-full flex items-center space-x-3 p-4 pl-12 hover:bg-gray-100 transition-colors text-left"
                      >
                        <subItem.icon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 text-sm">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Rohit's Store</p>
                <p className="text-xs sm:text-sm text-gray-500">Optical Store</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-black bg-opacity-50" onClick={toggleMenu}></div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'parties':
        return <PartiesView />;
      case 'items':
        return <ItemsView />;
      case 'dashboard':
        return <DashboardView />;
      case 'reports':
        return <ReportsView />;
      case 'sale-invoice':
      case 'payment-in':
      case 'sale-return':
      case 'estimation':
      case 'sale-order':
      case 'purchase-bills':
      case 'payment-out':
      case 'purchase-return':
      case 'purchase-order':
        return (
          <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {currentView.replace('-', ' ')}
              </h2>
              <p className="text-gray-600 mb-6">This feature is coming soon!</p>
              <button 
                onClick={() => setCurrentView('home')}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {renderCurrentView()}
      
      {/* Side Menu */}
      <SideMenu />
      
      {/* Modals */}
      {showModal && modalType === 'customer' && <CustomerModal />}
      {showModal && modalType === 'product' && <ProductModal />}
      {showModal && modalType === 'invoice' && <InvoiceModal />}
      
      {/* Barcode Scanner */}
      {barcodeScanning && <BarcodeScanner />}
      
      {/* Alert Component */}
      <Alert />
    </div>
  );
};

export default BillingSoftware;