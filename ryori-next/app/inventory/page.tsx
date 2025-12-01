'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

type Unit =
	| 'Piece'
	| 'Cup'
	| 'Milligram'
	| 'Milliliter'
	| 'Gram'
	| 'Kilogram';

type InventoryItem = {
	id: string;
	name: string;
	qty: number;
	unit: Unit;
	category: string;
	level: number;
};

const SAMPLE_INVENTORY: InventoryItem[] = [
	{ id: 'i1', name: 'cooe rice', qty: 2, unit: 'Cup', category: 'Rice', level: 2 },
	{ id: 'i2', name: 'broth', qty: -850, unit: 'Milligram', category: 'Soup', level: 1 },
	{ id: 'i3', name: 'C-teriyaki', qty: 50, unit: 'Piece', category: 'Chicken', level: 1 },
	{ id: 'i4', name: 'Oyakudon', qty: 50, unit: 'Piece', category: 'Rice Bowls', level: 1 },
	{ id: 'i5', name: 'Miso noodles', qty: 46, unit: 'Piece', category: 'Noodles', level: 1 },
	{ id: 'i6', name: 'Chupstick', qty: 50, unit: 'Piece', category: 'Utensils', level: 1 },
	{ id: 'i7', name: 'Lemon', qty: 49, unit: 'Piece', category: 'Produce', level: 1 },
	{ id: 'i8', name: 'Gloves', qty: 50, unit: 'Piece', category: 'Supplies', level: 1 }
];

const UNITS: Unit[] = ['Piece', 'Cup', 'Milligram', 'Milliliter', 'Gram', 'Kilogram'];

function statusFromQty(qty: number): 'out' | 'low' | 'ok' {
	if (qty <= 0) return 'out';
	if (qty <= 10) return 'low';
	return 'ok';
}

export default function InventoryPage() {
	const [items, setItems] = useState<InventoryItem[]>(SAMPLE_INVENTORY);
	const [filterUnit, setFilterUnit] = useState<'All Units' | Unit>('All Units');
	const [bulk, setBulk] = useState<string>('Bulk Actions');
	const [selected, setSelected] = useState<Set<string>>(new Set());

	// Form state (left panel)
	const [fName, setFName] = useState('');
	const [fUnit, setFUnit] = useState<Unit>('Piece');
	const [fCategory, setFCategory] = useState('');
	const [fExpiration, setFExpiration] = useState('');
	const [fLowWarn, setFLowWarn] = useState<number | ''>('');
	const [fLockLogs, setFLockLogs] = useState(false);
	const [fHasIngredients, setFHasIngredients] = useState(false);

	const customFieldIdRef = useRef<number>(0);

	const filtered = useMemo(() => {
		let r = items.slice();
		if (filterUnit !== 'All Units') {
			r = r.filter((it) => it.unit === filterUnit);
		}
		return r;
	}, [items, filterUnit]);

	function toggleSelect(id: string) {
		setSelected(prev => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id); else next.add(id);
			return next;
		});
	}
	function toggleSelectAll() {
		if (selected.size === filtered.length) {
			setSelected(new Set());
		} else {
			setSelected(new Set(filtered.map(i => i.id)));
		}
	}

	function handleSaveNew(e: React.FormEvent) {
		e.preventDefault();
		if (!fName.trim()) return;
		const id = 'i' + (++customFieldIdRef.current + 1000);
		setItems(prev => [{ id, name: fName.trim(), qty: 0, unit: fUnit, category: fCategory || 'Uncategorized', level: 1 }, ...prev]);
		// reset minimal fields
		setFName('');
	}

	return (
		<div className="inv-page">
			<div className="inv-head">
				<div className="inv-title">
					<h2>Inventory</h2>
					<p className="menu-sub">Track ingredients and supplies, quickly log changes</p>
				</div>
				<div className="inv-actions">
					<Link href={'/menu' as Route} className="btn btn--sm btn--light">
						<span aria-hidden="true" className="ico ico--list"></span>
						Menu
					</Link>
				</div>
			</div>

			<div className="inv-grid">
				<aside className="card inv-form">
					<button className="btn btn--icon btn--icon-ghost" aria-label="Back">
						<span aria-hidden="true" className="ico ico--chev"></span>
					</button>
					<h3 className="inv-form-title">Add New Inventory</h3>
					<div className="inv-level">Level 1</div>

					<form onSubmit={handleSaveNew} className="stack">
						<label className="sr-only" htmlFor="inv-name">Item</label>
						<input id="inv-name" className="input" placeholder="Item name" value={fName} onChange={(e) => setFName(e.target.value)} />

						<label className="sr-only" htmlFor="inv-unit">Unit</label>
						<select id="inv-unit" className="input select" value={fUnit} onChange={(e) => setFUnit(e.target.value as Unit)}>
							{UNITS.map(u => <option key={u} value={u}>{u}</option>)}
						</select>

						<label className="sr-only" htmlFor="inv-cat">Category</label>
						<input id="inv-cat" className="input" placeholder="Category" value={fCategory} onChange={(e) => setFCategory(e.target.value)} />

						<label className="sr-only" htmlFor="inv-exp">Expiration</label>
						<input id="inv-exp" type="date" className="input" value={fExpiration} onChange={(e) => setFExpiration(e.target.value)} />

						<label className="sr-only" htmlFor="inv-low">Low Stock Warning</label>
						<input id="inv-low" className="input" placeholder="Low stock warning" inputMode="numeric" value={fLowWarn} onChange={(e) => setFLowWarn(e.target.value as unknown as number | '')} />

						<label className="switch">
							<input type="checkbox" checked={fLockLogs} onChange={(e) => setFLockLogs(e.target.checked)} />
							<span className="bg"></span>
							<span className="knob"></span>
						</label>
						<div className="caption">Lock Logs: owners must approve quantity edits</div>

						<div className="seg">
							<button type="button" className={`seg-btn ${fHasIngredients ? '' : 'is-active'}`} onClick={() => setFHasIngredients(false)}>No ingredients</button>
							<button type="button" className={`seg-btn ${fHasIngredients ? 'is-active' : ''}`} onClick={() => setFHasIngredients(true)}>Has ingredients?</button>
						</div>

						<button type="submit" className="btn btn--blue">
							<span aria-hidden="true" className="ico ico--check"></span>
							Save
						</button>
					</form>
				</aside>

				<section className="inv-list card">
					<div className="toolbar">
						<div className="toolbar-left">
							<select className="input select" value={bulk} onChange={(e) => setBulk(e.target.value)}>
								<option>Bulk Actions</option>
								<option>Delete</option>
								<option>Export</option>
							</select>
							<button className="btn btn--subtle btn--sm">Apply</button>
						</div>
						<div className="toolbar-right">
							<div className="chip-row">
								<button className={`chip ${filterUnit === 'All Units' ? 'is-active' : ''}`} onClick={() => setFilterUnit('All Units')}>All Units</button>
								{UNITS.map(u => (
									<button key={u} className={`chip ${filterUnit === u ? 'is-active' : ''}`} onClick={() => setFilterUnit(u)}>{u}</button>
								))}
							</div>
						</div>
					</div>

					<div className="table-wrap">
						<table className="table">
							<thead>
								<tr>
									<th style={{ width: 36 }}>
										<input type="checkbox" aria-label="Select all" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} />
									</th>
									<th>Item</th>
									<th>Qty</th>
									<th>Unit</th>
									<th>Status</th>
									<th>Level</th>
									<th style={{ width: 220, textAlign: 'right' }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filtered.map(it => {
									const st = statusFromQty(it.qty);
									return (
										<tr key={it.id}>
											<td>
												<input type="checkbox" aria-label={`Select ${it.name}`} checked={selected.has(it.id)} onChange={() => toggleSelect(it.id)} />
											</td>
											<td>{it.name}</td>
											<td>{it.qty}</td>
											<td>{it.unit}</td>
											<td>
												<span className={`status-badge status--${st}`}>
													{st === 'ok' ? 'In-Stock' : st === 'low' ? 'Low' : 'Out of Stock'}
												</span>
											</td>
											<td>{it.level}</td>
											<td>
												<div className="cell-actions">
													<button className="btn btn--icon btn--icon-outline" aria-label={`Edit ${it.name}`}><span aria-hidden="true" className="ico ico--edit"></span></button>
													<button className="btn btn--icon btn--icon-ghost" aria-label={`Logs for ${it.name}`}><span aria-hidden="true" className="ico ico--list"></span></button>
													<button className="btn btn--icon btn--danger" aria-label={`Delete ${it.name}`}><span aria-hidden="true" className="ico ico--trash"></span></button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	);
}


