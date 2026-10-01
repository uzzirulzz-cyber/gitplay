import React, { useState, useEffect } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

export const AdminOverview: React.FC = () => {
  const {
    orders,
    products,
    connectedIntegrations,
    toggleIntegration,
    chatMessages,
    sendChatMessage,
    setAdminSection,
    addToast
  } = useCommerce();

  const [loading, setLoading] = useState(true);
  const [waInput, setWaInput] = useState('');
  const [activeModalKey, setActiveModalKey] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Compute live metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const pendingOrders = orders.length - completedOrders;

  const handleWaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waInput.trim()) return;
    sendChatMessage(waInput.trim(), 'agent');
    setWaInput('');
    addToast('WhatsApp message sent', 'whatsapp');
  };

  const integrationsConfig = [
    {
      key: 'whatsapp',
      name: 'WhatsApp Business',
      icon: 'bi-whatsapp',
      color: 'bg-[#25d366]',
      desc: 'Receive and answer customer messages through the WhatsApp Business Platform.',
      perms: ['Manage your WhatsApp Business account', 'Send and receive messages']
    },
    {
      key: 'facebook',
      name: 'Facebook',
      icon: 'bi-facebook',
      color: 'bg-[#1877f2]',
      desc: 'Log in with Facebook and link your Page for Messenger inbox and staff sign-in.',
      perms: ['Public profile and email', 'List your Pages', 'Read and send Page messages']
    },
    {
      key: 'instagram',
      name: 'Instagram',
      icon: 'bi-instagram',
      color: 'bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]',
      desc: 'Connect an Instagram professional account to manage DMs and comments.',
      perms: ['Basic profile', 'Manage messages and comments']
    },
    {
      key: 'tiktok',
      name: 'TikTok',
      icon: 'bi-tiktok',
      color: 'bg-black',
      desc: 'Log in with TikTok to show profile info and sync your videos.',
      perms: ['Basic profile info', 'View your public videos']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Skeleton Loading State */}
      {loading ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-[var(--pb-content-width,1600px)] mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl p-5 space-y-4 min-h-[460px] flex flex-col"
            >
              <div className="skel h-4 w-3/5 rounded"></div>
              <div className="skel h-3 w-2/5 rounded"></div>
              <div className="skel h-24 w-full rounded-xl"></div>
              <div className="skel h-3 w-4/5 rounded"></div>
              <div className="skel h-32 w-full rounded-xl mt-auto"></div>
            </div>
          ))}
        </section>
      ) : (
        /* Real 4-Column KPI Dashboard */
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-[var(--pb-content-width,1600px)] mx-auto">
          {/* Column 1: Dashboard Overview */}
          <article className="bg-[var(--panel)] border border-[var(--line)] border-t-[3px] border-t-[var(--accent)] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-3 pb-3 border-b border-[var(--line)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs flex-none">
                1
              </div>
              <div>
                <h2 className="text-xs font-bold text-[var(--text)]">Dashboard overview</h2>
                <p className="text-[11px] text-[var(--muted)]">Complete business snapshot at a glance.</p>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-[var(--text)]">Welcome back, Muhammad Uzair! 👋</div>
              <div className="text-[11px] text-[var(--muted)]">Here is what is happening with your business today.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--accent)] space-y-1">
              <div className="text-[11px] text-[var(--muted)] flex items-center gap-1">
                <i className="bi bi-currency-dollar text-[var(--accent)]"></i>
                <span>Total Revenue</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mono flex items-baseline gap-2">
                Rs {totalRevenue.toLocaleString()}
                <span className="text-[11px] text-[var(--green)] font-semibold">
                  {orders.length} orders
                </span>
              </div>
              {/* Sparkline curve */}
              <svg viewBox="0 0 120 24" width="100%" height="24" preserveAspectRatio="none">
                <path
                  d="M0 20 C25 20 30 6 55 12 S90 8 120 6"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.8"
                />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="p-2.5 rounded-xl bg-[var(--inner)] border border-[var(--line)]">
                <span className="text-[var(--muted)] block">Total Orders</span>
                <b className="text-base text-[var(--text)] block mono">{orders.length}</b>
                <span className="text-[var(--green)]">Live count</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--inner)] border border-[var(--line)]">
                <span className="text-[var(--muted)] block">Catalog Items</span>
                <b className="text-base text-[var(--text)] block mono">{products.length}</b>
                <span className="text-[var(--green)]">68 published</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--inner)] border border-[var(--line)]">
                <span className="text-[var(--muted)] block">Stock Alerts</span>
                <b className="text-base text-[var(--text)] block mono">0</b>
                <span className="text-[var(--amber)]">All in stock</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] mt-auto">
              <div className="flex justify-between items-center text-xs font-semibold text-[var(--text)]">
                <span>Live 14-Day Performance</span>
                <span className="text-[10px] bg-[var(--chip)] border border-[var(--line)] px-2 py-0.5 rounded text-[var(--navtext)]">
                  14 Days ▾
                </span>
              </div>
              <div className="h-28 flex items-end gap-1 pt-4 pb-1 border-b border-[var(--line)]">
                {[8, 6, 10, 7, 6, 9, 12, 8, 6, 7, 20, 10, 6, 14].map((h, idx) => (
                  <i
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-[var(--accent2)] to-[var(--accent)] rounded-t-xs hover:brightness-125 transition-all"
                    style={{ height: `${h * 4}%` }}
                    title={`Day ${idx + 1}: ${h} orders`}
                  />
                ))}
              </div>
            </div>
          </article>

          {/* Column 2: Revenue Analytics */}
          <article className="bg-[var(--panel)] border border-[var(--line)] border-t-[3px] border-t-[var(--amber)] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-3 pb-3 border-b border-[var(--line)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--amber)] text-black flex items-center justify-center font-bold text-xs flex-none">
                2
              </div>
              <div>
                <h2 className="text-xs font-bold text-[var(--text)]">Revenue analytics</h2>
                <p className="text-[11px] text-[var(--muted)]">Track revenue performance and peaks.</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-[var(--text)]">Revenue Overview</span>
              <span className="text-[10px] bg-[var(--chip)] border border-[var(--line)] px-2 py-0.5 rounded text-[var(--navtext)]">
                14 Days ▾
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-extrabold text-[var(--text)] mono flex items-baseline gap-2">
              Rs {(totalRevenue * 0.45).toFixed(0)}
              <span className="text-[11px] text-[var(--green)] font-semibold">
                +{orders.length} orders
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] flex-1 flex flex-col justify-end">
              <div className="h-32 flex items-end gap-1.5 border-b border-[var(--line)] pb-1">
                {[15, 20, 12, 28, 45, 30, 50, 65, 40, 55, 75, 60, 48, 85].map((h, i) => (
                  <i
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[var(--amber)]/40 to-[var(--amber)] rounded-t-xs hover:brightness-125 transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-[var(--muted)] pt-2 mono">
                <span>Sep 15</span>
                <span>Sep 19</span>
                <span>Sep 23</span>
                <span>Sep 28</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[var(--muted)] pt-1">
              <div>
                Average Daily
                <div className="text-xs font-bold text-[var(--text)] mono mt-0.5">
                  Rs {(totalRevenue / 14).toFixed(0)}
                </div>
              </div>
              <div>
                Best Day
                <div className="text-xs font-bold text-[var(--text)] mono mt-0.5">Sep 28</div>
              </div>
              <div>
                Transactions
                <div className="text-xs font-bold text-[var(--text)] mono mt-0.5">{orders.length}</div>
              </div>
            </div>
          </article>

          {/* Column 3: Order & Traffic Insights */}
          <article className="bg-[var(--panel)] border border-[var(--line)] border-t-[3px] border-t-[var(--violet)] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-3 pb-3 border-b border-[var(--line)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--violet)] text-white flex items-center justify-center font-bold text-xs flex-none">
                3
              </div>
              <div>
                <h2 className="text-xs font-bold text-[var(--text)]">Order &amp; traffic insights</h2>
                <p className="text-[11px] text-[var(--muted)]">Understand order funnel &amp; traffic sources.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] space-y-3">
              <div className="text-xs font-semibold text-[var(--text)]">Order Breakdown</div>
              <div className="flex items-center gap-4">
                {/* Donut Chart */}
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-[conic-gradient(var(--accent)_0_73%,var(--violet)_73%_100%)] flex-none">
                  <div className="w-14 h-14 rounded-full bg-[var(--inner)] flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-extrabold text-[var(--text)] mono leading-tight">
                      {orders.length}
                    </span>
                    <span className="text-[8px] text-[var(--muted)] font-semibold">TOTAL</span>
                  </div>
                </div>

                <div className="text-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-[var(--text)] font-semibold">{completedOrders} Completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--violet)]" />
                    <span>{pendingOrders} Pending / Processing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] flex-1 flex flex-col justify-between space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-[var(--text)]">
                <span>Traffic Sources</span>
                <span className="text-[10px] bg-[var(--chip)] border border-[var(--line)] px-2 py-0.5 rounded text-[var(--navtext)]">
                  Last 14 Days
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { domain: 'playbeat.digital/store', pct: 45, count: 184, color: 'bg-[var(--accent)]' },
                  { domain: 'wa.me/direct-orders', pct: 32, count: 112, color: 'bg-[var(--green)]' },
                  { domain: 'instagram.com/playbeat', pct: 23, count: 68, color: 'bg-[var(--violet)]' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] mono text-[var(--muted)]">
                      <span className="truncate pr-2">{item.domain}</span>
                      <span className="flex-none">{item.pct}% ({item.count})</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--chip)] rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Column 4: Top Selling Products */}
          <article className="bg-[var(--panel)] border border-[var(--line)] border-t-[3px] border-t-[var(--red)] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-3 pb-3 border-b border-[var(--line)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--red)] text-white flex items-center justify-center font-bold text-xs flex-none">
                4
              </div>
              <div>
                <h2 className="text-xs font-bold text-[var(--text)]">Top selling products</h2>
                <p className="text-[11px] text-[var(--muted)]">See which digital products drive sales.</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-[var(--text)]">Top Products</span>
              <span className="text-[10px] bg-[var(--chip)] border border-[var(--line)] px-2 py-0.5 rounded text-[var(--navtext)]">
                All Time ▾
              </span>
            </div>

            {/* List of top items */}
            <div className="space-y-2.5 flex-1">
              {[
                { name: 'YouTube Premium 12M', price: 2400, sales: '6 sales · 4 orders', rank: '#1', color: 'bg-red-500/20 text-red-400' },
                { name: 'Canva Pro Lifetime', price: 850, sales: '8 sales · 7 orders', rank: '#2', color: 'bg-cyan-500/20 text-cyan-400' },
                { name: 'IPTV 4K VIP Premium', price: 3500, sales: '5 sales · 5 orders', rank: '#3', color: 'bg-violet-500/20 text-violet-400' },
                { name: 'ChatGPT Plus & Claude', price: 2900, sales: '3 sales · 3 orders', rank: '#4', color: 'bg-amber-500/20 text-amber-400' }
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[var(--inner)] border border-[var(--line)] flex items-center gap-3"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-none ${p.color}`}>
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[var(--text)] truncate">{p.name}</div>
                    <div className="text-[10px] text-[var(--muted)]">{p.sales}</div>
                  </div>
                  <div className="text-right flex-none">
                    <div className="text-xs font-extrabold text-[var(--text)] mono">
                      Rs {p.price.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[var(--amber)] font-bold">{p.rank}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setAdminSection('catalog')}
              className="w-full py-2 rounded-xl bg-[var(--inner)] hover:bg-[var(--chip)] border border-[var(--line)] text-xs font-semibold text-[var(--text)] transition-colors mt-auto flex items-center justify-center gap-1.5"
            >
              <span>Manage Entire Catalog</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </article>
        </section>
      )}

      {/* Social Integrations & WhatsApp Live CRM Section */}
      <section className="p-4 max-w-[var(--pb-content-width,1600px)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Social Login & Integrations */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text)]">
              Social login &amp; integrations
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Connect your channels to receive messages, sync content, and let staff sign in.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {integrationsConfig.map((item) => {
              const isConnected = !!connectedIntegrations[item.key];
              return (
                <div
                  key={item.key}
                  className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl p-4 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-none ${item.color}`}>
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[var(--text)] truncate">{item.name}</div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                          isConnected
                            ? 'bg-[var(--green)]/20 text-[var(--green)]'
                            : 'bg-[var(--chip)] text-[var(--muted)]'
                        }`}
                      >
                        {isConnected ? 'Connected' : 'Not connected'}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-2 border-t border-[var(--line)]">
                    {isConnected ? (
                      <button
                        onClick={() => toggleIntegration(item.key, false)}
                        className="w-full py-1.5 px-3 rounded-lg border border-[var(--line)] text-xs font-semibold text-[var(--muted)] hover:text-[var(--red)] transition-colors"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveModalKey(item.key)}
                        className="w-full py-1.5 px-3 rounded-lg bg-[var(--accent)] text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Log in with {item.name.split(' ')[0]}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: WhatsApp Live Chat CRM */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-[var(--text)]">
              WhatsApp live chat (Meta CRM)
            </h3>
            <a
              href="https://wa.me/923000000000?text=Hello%20PlayBeat"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[var(--green)] text-white text-xs font-semibold flex items-center gap-1.5 hover:brightness-110 transition-all"
            >
              <i className="bi bi-whatsapp"></i>
              <span>Open in WhatsApp</span>
            </a>
          </div>

          <div className="bg-[#0b141a] border border-[var(--line)] rounded-2xl overflow-hidden flex flex-col min-h-[440px] text-white">
            {/* Header */}
            <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-[#2a3942]">
              <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white text-base">
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="leading-tight">
                <div className="text-xs font-bold text-white">Customer chat desk</div>
                <small className="text-[11px] text-[#8696a0]">
                  Connected: messages sync with Storefront
                </small>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-2.5 overflow-y-auto wa-bg-pattern max-h-[300px]">
              {chatMessages.map((msg) => {
                const isOut = msg.sender === 'agent';
                return (
                  <div
                    key={msg.id}
                    className={`max-w-[78%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      isOut
                        ? 'ml-auto bg-[#005c4b] text-[#e9edef] rounded-br-none'
                        : 'mr-auto bg-[#202c33] text-[#e9edef] rounded-bl-none'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <small className="block text-right text-[9px] text-white/50 mt-1 mono">
                      {msg.timestamp} {isOut ? '✓✓' : ''}
                    </small>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form onSubmit={handleWaSubmit} className="bg-[#202c33] p-2.5 flex items-center gap-2 border-t border-[#2a3942]">
              <input
                type="text"
                placeholder="Type a message to customer..."
                value={waInput}
                onChange={(e) => setWaInput(e.target.value)}
                className="flex-1 bg-[#2a3942] text-xs text-[#e9edef] placeholder-[#8696a0] rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#25d366]"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:brightness-110 flex-none"
                aria-label="Send message"
              >
                <i className="bi bi-send-fill text-xs"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Integration OAuth Modal */}
      {activeModalKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-[var(--text)]">
                Connect {integrationsConfig.find((i) => i.key === activeModalKey)?.name}
              </h4>
              <button
                onClick={() => setActiveModalKey(null)}
                className="text-[var(--muted)] hover:text-[var(--text)]"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {integrationsConfig.find((i) => i.key === activeModalKey)?.desc}
            </p>

            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-[var(--text)]">Permissions requested:</span>
              <ul className="list-disc pl-4 text-[var(--muted)] space-y-1 text-[11px]">
                {integrationsConfig
                  .find((i) => i.key === activeModalKey)
                  ?.perms.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-[var(--amber)]/10 border border-[var(--amber)]/30 text-[11px] text-[var(--amber)] flex items-start gap-2">
              <i className="bi bi-info-circle flex-none mt-0.5"></i>
              <span>
                To configure live OAuth client credentials, enter your Meta Developer App ID in profile settings.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActiveModalKey(null)}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--line)] text-xs text-[var(--muted)] hover:text-[var(--text)]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toggleIntegration(activeModalKey, true);
                  setActiveModalKey(null);
                  addToast(
                    `${integrationsConfig.find((i) => i.key === activeModalKey)?.name} connected!`,
                    'check-circle'
                  );
                }}
                className="px-4 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-semibold hover:brightness-110"
              >
                Authorize &amp; Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
