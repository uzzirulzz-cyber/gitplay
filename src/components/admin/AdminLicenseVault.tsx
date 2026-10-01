import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

interface VaultKey {
  id: string;
  service: string;
  keyText: string;
  type: string;
  status: 'available' | 'assigned' | 'reserved';
  assignedTo?: string;
}

export const AdminLicenseVault: React.FC = () => {
  const { orders, addToast } = useCommerce();
  const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'available'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Initial vault pool
  const [vaultKeys, setVaultKeys] = useState<VaultKey[]>([
    { id: 'vk-1', service: 'Windows 11 Pro Retail', keyText: 'W269N-WFGWX-YVC9B-4J6C9-T83GX', type: 'Product Key', status: 'assigned', assignedTo: 'ahmad.tech@gmail.com' },
    { id: 'vk-2', service: 'YouTube Premium 12M', keyText: 'PB-YTP-INV-88319-VIP', type: 'Invite Token', status: 'assigned', assignedTo: 'hamza.tariq@gmail.com' },
    { id: 'vk-3', service: 'Canva Pro Lifetime', keyText: 'PB-CNV-TEAM-99210-MEM', type: 'Team Seat', status: 'assigned', assignedTo: 'zainab.design@outlook.com' },
    { id: 'vk-4', service: 'IPTV 4K VIP 12M', keyText: 'http://vip.playbeat-stream.org:8080/get.php?u=usr8812&p=pass9912', type: 'M3U Stream URL', status: 'available' },
    { id: 'vk-5', service: 'Netflix 4K Profile #4', keyText: 'Email: netflix4k@playbeat.io | PIN: 8492', type: 'Credentials', status: 'available' },
    { id: 'vk-6', service: 'ChatGPT Plus Shared', keyText: 'Email: gptpro@playbeat.io | Token: sk-pb-994', type: 'Credentials', status: 'available' },
    { id: 'vk-7', service: 'Windows 11 Pro Retail', keyText: 'VK7JG-NPHTM-C97JM-9MPGT-3V66T', type: 'Product Key', status: 'available' },
  ]);

  const [genService, setGenService] = useState('Windows 11 Pro Retail');

  const handleGenerate = () => {
    let key = '';
    let type = 'Product Key';
    if (genService.includes('Windows')) {
      const seg = () => Math.random().toString(36).substring(2, 7).toUpperCase();
      key = `${seg()}-${seg()}-${seg()}-${seg()}-${seg()}`;
      type = 'Product Key';
    } else if (genService.includes('YouTube') || genService.includes('Canva')) {
      key = `PB-INV-${Math.random().toString(36).substring(2, 7).toUpperCase()}-TOKEN`;
      type = 'Invite Token';
    } else if (genService.includes('IPTV')) {
      key = `http://live.playbeat.tv:8080/get.php?u=pb_${Math.floor(Math.random() * 8999 + 1000)}&p=${Math.random().toString(36).substring(2, 8)}`;
      type = 'M3U Stream URL';
    } else {
      key = `pb_acc_${Math.floor(Math.random() * 899 + 100)}@stream.org | PIN: ${Math.floor(Math.random() * 8999 + 1000)}`;
      type = 'Credentials';
    }

    const newVk: VaultKey = {
      id: `vk-${Date.now()}`,
      service: genService,
      keyText: key,
      type,
      status: 'available'
    };

    setVaultKeys((prev) => [newVk, ...prev]);
    addToast(`New license key generated for ${genService}`, 'key');
  };

  const filtered = vaultKeys
    .filter((k) => (activeTab === 'all' ? true : k.status === activeTab))
    .filter(
      (k) =>
        k.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.keyText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (k.assignedTo && k.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="p-4 sm:p-6 max-w-[var(--pb-content-width,1600px)] mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text)] font-syne">
              Digital License Vault
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30">
              {vaultKeys.length} KEYS SECURED
            </span>
          </div>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            Store, generate, and dispatch genuine software product keys, IPTV stream links, and account invite credentials.
          </p>
        </div>

        {/* Instant Key Generator Row */}
        <div className="flex items-center gap-2">
          <select
            value={genService}
            onChange={(e) => setGenService(e.target.value)}
            className="bg-[var(--inner)] text-[var(--text)] border border-[var(--line)] rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="Windows 11 Pro Retail">Windows 11 Pro Key</option>
            <option value="YouTube Premium 12M">YouTube Premium Invite</option>
            <option value="Canva Pro Lifetime">Canva Pro Seat</option>
            <option value="IPTV 4K VIP 12M">IPTV M3U Stream</option>
            <option value="Netflix 4K Profile">Netflix Credentials</option>
          </select>
          <button
            onClick={handleGenerate}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <i className="bi bi-key-fill"></i>
            <span>Generate &amp; Store</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {['all', 'available', 'assigned'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[var(--accent)] text-white shadow-sm'
                  : 'bg-[var(--inner)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)]'
              }`}
            >
              {tab} ({vaultKeys.filter((k) => (tab === 'all' ? true : k.status === tab)).length})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <i className="bi bi-search absolute left-3 top-2.5 text-xs text-[var(--muted)]"></i>
          <input
            type="text"
            placeholder="Search key, service, customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[var(--inner)] border border-[var(--line)] rounded-xl py-1.5 pl-8 pr-3 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </div>

      {/* Vault Table */}
      <div className="bg-[var(--panel)] border border-[var(--line)] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--text)]">
            <thead className="bg-[var(--inner)] text-[var(--muted)] uppercase text-[10px] tracking-wider border-b border-[var(--line)]">
              <tr>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">License Key / Payload</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {filtered.map((vk) => (
                <tr key={vk.id} className="hover:bg-[var(--hover)] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--text)]">{vk.service}</td>
                  <td className="py-3.5 px-4 text-[var(--muted)]">{vk.type}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[var(--accent)] max-w-sm truncate">
                    {vk.keyText}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        vk.status === 'available'
                          ? 'bg-[var(--green)]/15 text-[var(--green)] border-[var(--green)]/30'
                          : 'bg-[var(--chip)] text-[var(--muted)] border-[var(--line)]'
                      }`}
                    >
                      {vk.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[var(--muted)]">
                    {vk.assignedTo || <span className="italic">Unassigned</span>}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(vk.keyText);
                        addToast('License copied from vault', 'clipboard-check');
                      }}
                      className="p-1.5 rounded-lg border border-[var(--line)] bg-[var(--inner)] text-[var(--muted)] hover:text-[var(--text)]"
                      title="Copy Key"
                    >
                      <i className="bi bi-copy text-xs"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
