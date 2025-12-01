'use client';

import { useRef, useState } from 'react';

type StoreForm = {
	logoDataUrl?: string;
	storeName: string;
	branch: string;
	contact: string;
	email: string;
	address: string;
	chargeToCustomer: boolean;
	processType: 'Pay To Serve' | 'Prepay' | 'Pay After';
	paymentChain: 'Solana' | 'Polygon' | 'Ethereum';
	fee: number;
	taxRate: number;
	website?: string;
};

const INITIAL: StoreForm = {
	storeName: 'Ryori',
	branch: 'Bajada Branch',
	contact: '09123456789',
	email: 'ryori2.0@gmail.com',
	address: 'Bajada, Davao City',
	chargeToCustomer: false,
	processType: 'Pay To Serve',
	paymentChain: 'Solana',
	fee: 8,
	taxRate: 12
};

export default function StoreSettingsPage() {
	const [form, setForm] = useState<StoreForm>(INITIAL);
	const [isEditing, setIsEditing] = useState(true);
	const fileRef = useRef<HTMLInputElement>(null);

	function handlePickLogo() {
		fileRef.current?.click();
	}
	function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
		const f = e.target.files?.[0];
		if (!f) return;
		const reader = new FileReader();
		reader.onload = () => {
			setForm((prev) => ({ ...prev, logoDataUrl: String(reader.result) }));
		};
		reader.readAsDataURL(f);
	}

	function update<K extends keyof StoreForm>(key: K, value: StoreForm[K]) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsEditing(false);
		// TODO: wire to API
	}

	function handleEdit() {
		setIsEditing(true);
	}

	return (
		<div className="settings-page">
			<h2 className="eyebrow">Store Details</h2>

			<form className="card settings-card" onSubmit={handleSubmit}>
				<div className="settings-header">
					<button type="button" className="logo-upload" onClick={handlePickLogo} aria-label="Change logo">
						<img
							src={
								form.logoDataUrl ||
								'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 160 160%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 rx=%2228%22 fill=%22%23f3f4f6%22/%3E%3C/svg%3E'
							}
							alt=""
							aria-hidden="true"
						/>
						<span className="logo-overlay"><span aria-hidden="true" className="ico ico--upload"></span> Change</span>
					</button>
					<input ref={fileRef} type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
				</div>

				<div className="settings-grid">
					<label className="field">
						<span className="label">Store Name</span>
						<input className="input" value={form.storeName} onChange={(e) => update('storeName', e.target.value)} disabled={!isEditing} />
					</label>
					<div className="field-row">
						<label className="field">
							<span className="label">Branch</span>
							<input className="input" value={form.branch} onChange={(e) => update('branch', e.target.value)} disabled={!isEditing} />
						</label>
						<label className="field">
							<span className="label">Contact No.</span>
							<input className="input" value={form.contact} onChange={(e) => update('contact', e.target.value)} disabled={!isEditing} />
						</label>
					</div>
					<label className="field">
						<span className="label">Email</span>
						<input type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} disabled={!isEditing} />
					</label>
					<label className="field">
						<span className="label">Address</span>
						<input className="input" value={form.address} onChange={(e) => update('address', e.target.value)} disabled={!isEditing} />
					</label>

					<div className="field-row">
						<label className="field">
							<span className="label">Charge To Customer</span>
							<label className="switch">
								<input type="checkbox" checked={form.chargeToCustomer} onChange={(e) => update('chargeToCustomer', e.target.checked)} disabled={!isEditing} />
								<span className="bg"></span>
								<span className="knob"></span>
							</label>
						</label>
						<label className="field">
							<span className="label">Process Type</span>
							<select className="input select" value={form.processType} onChange={(e) => update('processType', e.target.value as StoreForm['processType'])} disabled={!isEditing}>
								<option>Pay To Serve</option>
								<option>Prepay</option>
								<option>Pay After</option>
							</select>
						</label>
					</div>

					<div className="field-row">
						<label className="field">
							<span className="label">Payment Chain</span>
							<div className="seg">
								<button type="button" className={`seg-btn ${form.paymentChain === 'Solana' ? 'is-active' : ''}`} aria-pressed={form.paymentChain === 'Solana'} onClick={() => isEditing && update('paymentChain', 'Solana')}>Solana</button>
								<button type="button" className={`seg-btn ${form.paymentChain === 'Polygon' ? 'is-active' : ''}`} aria-pressed={form.paymentChain === 'Polygon'} onClick={() => isEditing && update('paymentChain', 'Polygon')}>Polygon</button>
								<button type="button" className={`seg-btn ${form.paymentChain === 'Ethereum' ? 'is-active' : ''}`} aria-pressed={form.paymentChain === 'Ethereum'} onClick={() => isEditing && update('paymentChain', 'Ethereum')}>Ethereum</button>
							</div>
						</label>
						<label className="field">
							<span className="label">Website</span>
							<input className="input" placeholder="https://yourstore.com" value={form.website || ''} onChange={(e) => update('website', e.target.value)} disabled={!isEditing} />
						</label>
					</div>

					<div className="field-row">
						<label className="field">
							<span className="label">Fee (₱)</span>
							<input className="input" inputMode="numeric" value={form.fee} onChange={(e) => update('fee', Number(e.target.value || 0))} disabled={!isEditing} />
						</label>
						<label className="field">
							<span className="label">Tax Rate (%)</span>
							<input className="input" inputMode="numeric" value={form.taxRate} onChange={(e) => update('taxRate', Number(e.target.value || 0))} disabled={!isEditing} />
						</label>
					</div>
				</div>

				<div className="settings-actions">
					{isEditing ? (
						<button type="submit" className="btn btn--blue">
							<span aria-hidden="true" className="ico ico--check"></span>
							Save Changes
						</button>
					) : (
						<button type="button" className="btn" onClick={handleEdit}>
							<span aria-hidden="true" className="ico ico--edit"></span>
							Edit
						</button>
					)}
				</div>
			</form>
		</div>
	);
}


