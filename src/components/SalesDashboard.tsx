import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, DollarSign, ShoppingCart, Users, Activity, X, Maximize2 } from 'lucide-react';

interface Transaction {
  id: number;
  product: string;
  category: string;
  quantity: number;
  revenue: number;
  profit: number;
  timestamp: string;
  customerType: string;
  region: string;
}

const PRODUCTS = [
  { name: 'Monitor', category: 'Electronics', price: 15000, cost: 10000 },
  { name: 'Keyboard', category: 'Accessories', price: 2500, cost: 1200 },
  { name: 'Laptop', category: 'Electronics', price: 75000, cost: 55000 },
  { name: 'Shirt', category: 'Clothing', price: 1200, cost: 400 },
  { name: 'Jeans', category: 'Clothing', price: 2500, cost: 1000 },
  { name: 'Chair', category: 'Furniture', price: 8500, cost: 4500 },
  { name: 'Headphones', category: 'Accessories', price: 4500, cost: 2000 },
  { name: 'Desk', category: 'Furniture', price: 12000, cost: 7000 },
];

const REGIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'];
const CUSTOMER_TYPES = ['New', 'Returning', 'VIP'];

export const SalesDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalProfit: 0,
    totalOrders: 0,
    conversionRate: 3.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const discount = Math.floor(Math.random() * 500);
      const revenue = (product.price * quantity) - discount;
      const profit = revenue - (product.cost * quantity);
      
      const newTransaction: Transaction = {
        id: Math.floor(Math.random() * 9000) + 1000,
        product: product.name,
        category: product.category,
        quantity,
        revenue,
        profit,
        timestamp: new Date().toLocaleTimeString(),
        customerType: CUSTOMER_TYPES[Math.floor(Math.random() * CUSTOMER_TYPES.length)],
        region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
      };

      setTransactions(prev => [newTransaction, ...prev].slice(0, 10));
      setStats(prev => ({
        totalRevenue: prev.totalRevenue + revenue,
        totalProfit: prev.totalProfit + profit,
        totalOrders: prev.totalOrders + 1,
        conversionRate: +(prev.conversionRate + (Math.random() * 0.1 - 0.05)).toFixed(2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-6xl h-full max-h-[800px] glass-panel rounded-3xl overflow-hidden border border-outline-variant/20 flex flex-col relative shadow-2xl"
      >
        {/* Header */}
        <div className="bg-surface-container-high/40 px-8 py-6 flex items-center justify-between border-b border-outline-variant/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Activity className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">Sales Streamline Live</h2>
              <p className="text-xs text-on-surface-variant font-mono uppercase tracking-widest opacity-60">Real-Time Data Engine // ID: TR-9942</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-error/10 hover:text-error rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <StatCard 
              icon={DollarSign} 
              label="Total Revenue" 
              value={`₹${stats.totalRevenue.toLocaleString()}`} 
              trend="+12.5%" 
              color="text-primary" 
            />
            <StatCard 
              icon={TrendingUp} 
              label="Total Profit" 
              value={`₹${stats.totalProfit.toLocaleString()}`} 
              trend="+8.2%" 
              color="text-tertiary" 
            />
            <StatCard 
              icon={ShoppingCart} 
              label="Total Orders" 
              value={stats.totalOrders.toString()} 
              trend="+24" 
              color="text-secondary" 
            />
            <StatCard 
              icon={Users} 
              label="Conversion" 
              value={`${stats.conversionRate}%`} 
              trend="-0.4%" 
              color="text-error" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Feed */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                Live Transaction Stream
              </h3>
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {transactions.map((tx) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="glass-panel p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between group hover:bg-surface-container-low/40 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest/50 flex items-center justify-center font-bold text-xs">
                          #{tx.id}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{tx.product}</p>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter opacity-60">
                            {tx.category} • {tx.region} • {tx.customerType}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹{tx.revenue.toLocaleString()}</p>
                        <p className="text-[10px] text-tertiary font-mono">+{tx.profit.toLocaleString()} Profit</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Regional Analysis */}
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-outline-variant/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Regional Distribution</h3>
                <div className="space-y-4">
                  {REGIONS.map((region, i) => (
                    <div key={region} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        <span>{region}</span>
                        <span>{Math.floor(Math.random() * 40 + 60)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                          className={`h-full bg-gradient-to-r ${i % 2 === 0 ? 'from-primary to-primary-fixed-dim' : 'from-tertiary to-tertiary-fixed-dim'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-outline-variant/10 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <Maximize2 className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">System Insights</h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Real-time synchronization active. Predictive engine estimating <span className="text-primary font-bold">₹1.2M</span> monthly recurring revenue based on current velocity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="glass-panel p-6 rounded-2xl border border-outline-variant/15 hover:bg-surface-container-low/40 transition-colors">
    <div className={`p-2 rounded-lg w-fit mb-3 ${color} bg-current/10`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <h4 className="text-xl font-black text-on-surface">{value}</h4>
      <span className="text-[10px] font-bold text-tertiary">{trend}</span>
    </div>
  </div>
);
