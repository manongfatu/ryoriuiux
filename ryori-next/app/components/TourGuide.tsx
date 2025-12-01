'use client';

import { useEffect, useMemo, useState } from 'react';

type TourStep = {
	id: string;
	selector?: string;
	title: string;
	body: string;
};

const STORAGE_KEY = 'ryori-tour-dismissed';

const DEFAULT_STEPS: TourStep[] = [
	{
		id: 'sidebar',
		selector: '.dash-sidebar',
		title: 'Navigation',
		body: 'Use the sidebar to access Dashboard, Orders, Menu, Inventory and Settings.',
	},
	{
		id: 'topbar',
		selector: '.dash-topbar',
		title: 'Quick actions',
		body: 'Search and access notifications from the top bar. On mobile, use the bottom nav.',
	},
	{
		id: 'menu',
		selector: '.menu-head, .inv-head, .settings-card',
		title: 'Workspaces',
		body: 'Each page has a header with primary actions, filters and tools.',
	},
	{
		id: 'content',
		selector: '.dash-main',
		title: 'Content area',
		body: 'Your main content appears here. Scroll to explore and tap items to manage.',
	},
];

function getRect(selector?: string): DOMRect | null {
	if (!selector) return null;
	const el = document.querySelector(selector);
	if (!el) return null;
	const rect = el.getBoundingClientRect();
	return new DOMRect(rect.left + window.scrollX, rect.top + window.scrollY, rect.width, rect.height);
}

export default function TourGuide({ steps = DEFAULT_STEPS }: { steps?: TourStep[] }) {
	const [active, setActive] = useState<number>(0);
	const [dismissed, setDismissed] = useState<boolean>(true);
	const step = steps[active];

	useEffect(() => {
		const isDismissed = localStorage.getItem(STORAGE_KEY) === '1';
		setDismissed(isDismissed);
	}, []);

	useEffect(() => {
		if (dismissed) return;
		// Scroll the current step into view if it has a selector
		const rect = getRect(step?.selector);
		if (!rect) return;
		const y = Math.max(0, rect.top - 120);
		window.scrollTo({ top: y, behavior: 'smooth' });
	}, [active, dismissed, step?.selector]);

	if (dismissed || !step) return null;

	function onSkip() {
		localStorage.setItem(STORAGE_KEY, '1');
		setDismissed(true);
	}
	function onNext() {
		if (active < steps.length - 1) setActive((i) => i + 1);
		else onSkip();
	}
	function onBack() {
		if (active > 0) setActive((i) => i - 1);
	}

	// Compute spotlight rect
	const rect = typeof window !== 'undefined' ? getRect(step.selector) : null;

	return (
		<div className="tour-root" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-body">
			<div className="tour-overlay" />
			{rect && (
				<div
					className="tour-spotlight"
					style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
					aria-hidden="true"
				/>
			)}
			<div className="tour-pop">
				<div className="tour-head">
					<div className="tour-step">{active + 1} / {steps.length}</div>
					<button className="btn btn--icon btn--icon-ghost" onClick={onSkip} aria-label="Skip tour">
						<span aria-hidden="true" className="ico ico--close"></span>
					</button>
				</div>
				<h3 id="tour-title" className="tour-title">{step.title}</h3>
				<p id="tour-body" className="tour-body">{step.body}</p>
				<div className="tour-actions">
					<button className="btn btn--ghost btn--sm" onClick={onBack} aria-disabled={active === 0}>
						Back
					</button>
					<button className="btn btn--sm" onClick={onNext}>
						{active < steps.length - 1 ? 'Next' : 'Finish'}
					</button>
				</div>
				<button className="tour-skip" onClick={onSkip}>Skip tour</button>
			</div>
		</div>
	);
}


