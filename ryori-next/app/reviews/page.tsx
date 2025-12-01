'use client';

import { useMemo, useState } from 'react';

type Review = {
	id: string;
	rating: 1 | 2 | 3 | 4 | 5;
	text: string;
	date: string; // ISO
	time: string; // HH:MM:SS
	user?: string;
};

const SAMPLE_REVIEWS: Review[] = [
	{ id: 'r1', rating: 5, text: 'Lami kaayo pero bias ko 😂🤣🤣🤣', date: '2025-02-04', time: '19:36:44', user: 'Anonymous' },
	{ id: 'r2', rating: 5, text: 'Naka limut ko ni kaon diay ko sa kalami sa foods 😉', date: '2025-02-25', time: '09:39:55' },
	{ id: 'r3', rating: 5, text: 'The food was great', date: '2025-05-21', time: '11:55:04' },
	{ id: 'r4', rating: 4, text: 'Ok kaau', date: '2025-10-24', time: '13:00:17' },
	{ id: 'r5', rating: 5, text: '5 star', date: '2025-10-30', time: '15:27:01' }
];

export default function ReviewsPage() {
	const [minRating, setMinRating] = useState<1 | 2 | 3 | 4 | 5 | 0>(0);
	const [query, setQuery] = useState('');

	const items = useMemo(() => {
		let r = SAMPLE_REVIEWS.slice();
		if (minRating) r = r.filter((rev) => rev.rating >= minRating);
		if (query.trim()) {
			const q = query.toLowerCase();
			r = r.filter((rev) => rev.text.toLowerCase().includes(q));
		}
		return r;
	}, [minRating, query]);

	return (
		<div className="rev-page">
			<div className="rev-head">
				<div className="menu-title">
					<h2>Customer Reviews</h2>
					<p className="menu-sub">Read feedback and share highlights</p>
				</div>
				<div className="menu-actions">
					<button className="btn btn--light btn--sm">
						<span aria-hidden="true" className="ico ico--cash"></span>
						RYO Balance
					</button>
					<button className="btn btn--sm">
						<span aria-hidden="true" className="ico ico--wallet"></span>
						Select Wallet
					</button>
				</div>
			</div>

			<div className="rev-tools">
				<div className="chip-row" aria-label="Filter by rating" role="tablist">
					<button className={`chip ${minRating === 0 ? 'is-active' : ''}`} onClick={() => setMinRating(0)} role="tab" aria-selected={minRating === 0}>All</button>
					{([5,4,3,2,1] as const).map((r) => (
						<button key={r} className={`chip ${minRating === r ? 'is-active' : ''}`} onClick={() => setMinRating(r)} role="tab" aria-selected={minRating === r}>
							{r}★+
						</button>
					))}
				</div>
				<div className="search">
					<input placeholder="Search reviews…" value={query} onChange={(e) => setQuery(e.target.value)} />
					<button aria-label="Search">
						<span aria-hidden="true" className="ico ico--search"></span>
					</button>
				</div>
			</div>

			<ul className="rev-list" role="list">
				{items.map((rev) => (
					<li key={rev.id} className="rev-item">
						<div className="rev-avatar" aria-hidden="true"></div>
						<div className="rev-content">
							<div className="rev-rating" aria-label={`${rev.rating} out of 5 stars`}>
								{Array.from({ length: 5 }).map((_, i) => (
									<span key={i} aria-hidden="true" className={`star ${i < rev.rating ? 'is-on' : ''}`}></span>
								))}
							</div>
							<p className="rev-text">{rev.text}</p>
							<div className="rev-meta">Date: {new Date(rev.date).toLocaleDateString()} | Time: {rev.time}</div>
						</div>
						<div className="rev-actions">
							<button className="btn btn--sm">
								<span aria-hidden="true" className="ico ico--send"></span>
								Send
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}


