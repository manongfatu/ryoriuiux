'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';

type MenuItem = {
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	category: string;
	isPopular?: boolean;
	isNew?: boolean;
};

const CATEGORIES = ['All', 'Pizza', 'Rice Bowls', 'Ramen', 'Sushi', 'Drinks'] as const;
const BLANK_IMAGE =
	'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1600 1200%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23f3f4f6%22/%3E%3C/svg%3E';

const SAMPLE_MENU: MenuItem[] = [
	{ name: 'All Cheese', description: 'Shichiryu Pizza', price: 430, imageUrl: 'https://images.unsplash.com/photo-1601924572300-6f8f2f95bfa6?q=80&w=1200&auto=format&fit=crop', category: 'Pizza', isPopular: true },
	{ name: 'Ham & Cheese', description: 'Ham & Cheese', price: 430, imageUrl: 'https://images.unsplash.com/photo-1548365328-9f547fb0953f?q=80&w=1200&auto=format&fit=crop', category: 'Pizza' },
	{ name: 'Hawaiian', description: 'Hawaiian Pizza', price: 430, imageUrl: 'https://images.unsplash.com/photo-1548365328-9f547fb0953f?q=80&w=1200&auto=format&fit=crop', category: 'Pizza', isNew: true },
	{ name: 'Pepperoni', description: 'Pepperoni Pizza', price: 430, imageUrl: 'https://images.unsplash.com/photo-1548365325-80f7c2b09581?q=80&w=1200&auto=format&fit=crop', category: 'Pizza', isPopular: true },
	{ name: 'Beef Gyudon', description: 'Beef Gyudon', price: 250, imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop', category: 'Rice Bowls', isPopular: true },
	{ name: 'Buta Agi Don', description: 'Japanese Liempo', price: 200, imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop', category: 'Rice Bowls' },
	{ name: 'California Maki', description: 'California Maki', price: 210, imageUrl: 'https://images.unsplash.com/photo-1562158070-9a7b87a0b10f?q=80&w=1200&auto=format&fit=crop', category: 'Sushi' },
	{ name: 'Chashu Don', description: 'Japanese Humba', price: 230, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop', category: 'Rice Bowls' },
	{ name: 'Teriyaki Chicken', description: 'Teriyaki Chicken Pizza', price: 430, imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=1200&auto=format&fit=crop', category: 'Pizza' },
];

function formatPricePHP(value: number): string {
	return `₱ ${value}`;
}

export default function MenuPage() {
	const [query, setQuery] = useState('');
	const [category, setCategory] = useState<typeof CATEGORIES[number]>('All');
	const [sort, setSort] = useState<'popular' | 'priceLow' | 'priceHigh' | 'newest'>('popular');

	const items = useMemo(() => {
		let result = SAMPLE_MENU.slice();
		if (category !== 'All') {
			result = result.filter((m) => m.category === category);
		}
		if (query.trim()) {
			const q = query.toLowerCase();
			result = result.filter(
				(m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q),
			);
		}
		switch (sort) {
			case 'priceLow':
				result.sort((a, b) => a.price - b.price);
				break;
			case 'priceHigh':
				result.sort((a, b) => b.price - a.price);
				break;
			case 'newest':
				result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
				break;
			default:
				result.sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
		}
		return result;
	}, [query, category, sort]);

	return (
		<div className="menu-page">
			<div className="menu-head">
				<div className="menu-title">
					<h2>Menu</h2>
					<p className="menu-sub">Browse and manage your offerings</p>
				</div>
				<div className="menu-actions">
					<Link href={'/menu/new' as Route} className="btn btn--sm btn--ghost">
						<span aria-hidden="true" className="ico ico--plus"></span>
						Add Item
					</Link>
					<Link href={'/menu/categories' as Route} className="btn btn--sm">
						<span aria-hidden="true" className="ico ico--sliders"></span>
						Categories
					</Link>
				</div>
			</div>

			<div className="menu-filters" role="region" aria-label="Menu filters">
				<div className="chip-row" role="tablist" aria-label="Categories">
					{CATEGORIES.map((c) => (
						<button
							key={c}
							role="tab"
							aria-selected={category === c}
							className={`chip ${category === c ? 'is-active' : ''}`}
							onClick={() => setCategory(c)}
						>
							{c}
						</button>
					))}
				</div>
				<div className="menu-tools">
					<label className="sr-only" htmlFor="menu-search">
						Search menu
					</label>
					<input
						id="menu-search"
						className="input"
						placeholder="Search dishes..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<label className="sr-only" htmlFor="menu-sort">
						Sort
					</label>
					<select
						id="menu-sort"
						className="input select"
						value={sort}
						onChange={(e) => setSort(e.target.value as typeof sort)}
					>
						<option value="popular">Most popular</option>
						<option value="priceLow">Price: Low to High</option>
						<option value="priceHigh">Price: High to Low</option>
						<option value="newest">New</option>
					</select>
				</div>
			</div>

			<ul className="menu-grid" role="list">
				{items.map((m) => (
					<li key={m.name}>
						<article className="menu-card">
							<div className="media">
								<Image
									src={BLANK_IMAGE}
									alt=""
									fill
									sizes="(max-width: 960px) 50vw, (max-width: 640px) 100vw, 260px"
									priority={false}
								/>
								{(m.isPopular || m.isNew) && (
									<div className="pill-row">
										{m.isPopular && <span className="pill pill--pop">Popular</span>}
										{m.isNew && <span className="pill pill--new">New</span>}
									</div>
								)}
							</div>
							<div className="body">
								<div className="title-row">
									<h3 className="title">{m.name}</h3>
									<div className="price">{formatPricePHP(m.price)}</div>
								</div>
								<p className="desc">{m.description}</p>
								<div className="card-actions">
									<button className="btn btn--ghost btn--sm">
										<span aria-hidden="true" className="ico ico--edit"></span>
										Edit
									</button>
									<button className="btn btn--sm">
										<span aria-hidden="true" className="ico ico--plus"></span>
										Add to order
									</button>
								</div>
							</div>
						</article>
					</li>
				))}
			</ul>
		</div>
	);
}



