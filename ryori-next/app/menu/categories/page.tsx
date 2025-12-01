'use client';

import { useId, useMemo, useRef, useState } from 'react';

type Category = {
	id: string;
	name: string;
	imageName?: string;
};

const INITIAL_CATEGORIES: Category[] = [
	{ id: 'c1', name: 'Shichiryu Pizza' },
	{ id: 'c2', name: 'Donburi / Rice Bowls' },
	{ id: 'c3', name: 'All Time Favorite' },
	{ id: 'c4', name: 'Serve without Rice' },
	{ id: 'c5', name: 'Ramen' },
	{ id: 'c6', name: 'Burgers' },
	{ id: 'c7', name: 'Desserts' },
	{ id: 'c8', name: 'Add ons' },
	{ id: 'c9', name: 'Beers' },
];

export default function MenuCategoriesPage() {
	const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
	const [name, setName] = useState('');
	const [imageName, setImageName] = useState<string | undefined>();
	const [editingId, setEditingId] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const formId = useId();

	function handlePickImage() {
		fileInputRef.current?.click();
	}
	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const f = e.target.files?.[0];
		setImageName(f ? f.name : undefined);
	}
	function resetForm() {
		setName('');
		setImageName(undefined);
		setEditingId(null);
		if (fileInputRef.current) fileInputRef.current.value = '';
	}

	function handleSave(e: React.FormEvent) {
		e.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) return;
		if (editingId) {
			setCategories((prev) =>
				prev.map((c) => (c.id === editingId ? { ...c, name: trimmed, imageName } : c)),
			);
		} else {
			const id = Math.random().toString(36).slice(2, 10);
			setCategories((prev) => [{ id, name: trimmed, imageName }, ...prev]);
		}
		resetForm();
	}

	function handleEdit(id: string) {
		const cat = categories.find((c) => c.id === id);
		if (!cat) return;
		setEditingId(id);
		setName(cat.name);
		setImageName(cat.imageName);
	}
	function handleDelete(id: string) {
		if (!confirm('Delete this category?')) return;
		setCategories((prev) => prev.filter((c) => c.id !== id));
		if (editingId === id) resetForm();
	}

	const isEditing = editingId !== null;

	return (
		<div className="categories-page">
			<h2 className="eyebrow">Menu Categories</h2>

			<form id={formId} className="card cat-form" onSubmit={handleSave}>
				<div className="form-row">
					<label className="sr-only" htmlFor="cat-name">
						Category Name
					</label>
					<input
						id="cat-name"
						className="input"
						placeholder="Category Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-row">
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						style={{ display: 'none' }}
					/>
					<button type="button" className="btn" onClick={handlePickImage}>
						<span aria-hidden="true" className="ico ico--upload"></span>
						{imageName ? `Image: ${imageName}` : 'Upload Image'}
					</button>
				</div>
				<div className="form-actions">
					<button type="submit" className="btn btn--blue">
						<span aria-hidden="true" className="ico ico--check"></span>
						{isEditing ? 'Update' : 'Save'}
					</button>
					{isEditing && (
						<button type="button" className="btn btn--ghost" onClick={resetForm}>
							<span aria-hidden="true" className="ico ico--close"></span>
							Cancel
						</button>
					)}
				</div>
			</form>

			<div className="card">
				<div className="cat-table-wrap table-wrap">
					<table className="table">
						<thead>
							<tr>
								<th>Category Name</th>
								<th style={{ width: 100, textAlign: 'right' }}>Action</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((c) => (
								<tr key={c.id}>
									<td>{c.name}</td>
									<td>
										<div className="cell-actions">
											<button
												className="icon-btn"
												aria-label={`Edit ${c.name}`}
												onClick={() => handleEdit(c.id)}
											>
												<span aria-hidden="true" className="ico ico--edit"></span>
											</button>
											<button
												className="icon-btn"
												aria-label={`Delete ${c.name}`}
												onClick={() => handleDelete(c.id)}
											>
												<span aria-hidden="true" className="ico ico--trash"></span>
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
	);
}


