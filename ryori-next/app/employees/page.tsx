'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	contact: string;
	role: 'manager' | 'kitchen' | 'dining' | 'cashier';
};

const SAMPLE_EMPLOYEES: Employee[] = [
	{ id: 'e1', firstName: 'Manager', lastName: 'Shichiryu', username: 'Manager', email: 'Baj.Manager@gmail.com', contact: '0953 517 6115', role: 'manager' },
	{ id: 'e2', firstName: 'Dining', lastName: 'Shichiryu', username: 'Dining', email: 'Baj.Dining@gmail.com', contact: '0953 517 6115', role: 'dining' },
	{ id: 'e3', firstName: 'Kitchen', lastName: 'Shichiryu', username: 'Kitchen', email: 'Baj.Kitchen@gmail.com', contact: '0953 517 6115', role: 'kitchen' },
	{ id: 'e4', firstName: 'Dining (shift 2)', lastName: 'Shichiryu', username: 'Dining2', email: 'Baj.Dining2@gmail.com', contact: '0953 517 6115', role: 'dining' },
];

const ROLES: Array<Employee['role'] | 'all'> = ['all', 'manager', 'dining', 'kitchen', 'cashier'];

export default function EmployeesPage() {
	const [role, setRole] = useState<(typeof ROLES)[number]>('all');
	const [query, setQuery] = useState('');

	const list = useMemo(() => {
		let r = SAMPLE_EMPLOYEES.slice();
		if (role !== 'all') r = r.filter((e) => e.role === role);
		if (query.trim()) {
			const q = query.toLowerCase();
			r = r.filter(
				(e) =>
					e.firstName.toLowerCase().includes(q) ||
					e.lastName.toLowerCase().includes(q) ||
					e.username.toLowerCase().includes(q) ||
					e.email.toLowerCase().includes(q),
			);
		}
		return r;
	}, [role, query]);

	return (
		<div className="emp-page">
			<div className="emp-head">
				<div className="menu-title">
					<h2>Employees</h2>
					<p className="menu-sub">Manage staff accounts, roles and permissions</p>
				</div>
				<div className="menu-actions">
					<Link href={'/employees/new' as Route} className="btn btn--sm">
						<span aria-hidden="true" className="ico ico--plus"></span>
						Add Employee
					</Link>
				</div>
			</div>

			<div className="emp-tools">
				<div className="chip-row">
					{ROLES.map((r) => (
						<button key={r} className={`chip ${role === r ? 'is-active' : ''}`} onClick={() => setRole(r)}>
							{r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}
						</button>
					))}
				</div>
				<div className="search">
					<input placeholder="Search name, username or email" value={query} onChange={(e) => setQuery(e.target.value)} />
					<button aria-label="Search">
						<span aria-hidden="true" className="ico ico--search"></span>
					</button>
				</div>
			</div>

			<div className="table-wrap">
				<table className="table">
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Contact No.</th>
							<th>Role</th>
							<th style={{ width: 180, textAlign: 'right' }}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{list.map((e) => (
							<tr key={e.id}>
								<td>{e.firstName}</td>
								<td>{e.lastName}</td>
								<td>{e.username}</td>
								<td>{e.email}</td>
								<td>{e.contact}</td>
								<td>
									<span className={`tag ${e.role === 'manager' ? '' : 'tag--ghost'}`}>{e.role}</span>
								</td>
								<td>
									<div className="cell-actions">
										<button className="btn btn--icon btn--icon-outline" aria-label={`View ${e.username}`}><span aria-hidden="true" className="ico ico--user"></span></button>
										<button className="btn btn--icon btn--icon-ghost" aria-label={`Permissions for ${e.username}`}><span aria-hidden="true" className="ico ico--settings"></span></button>
										<button className="btn btn--icon btn--danger" aria-label={`Delete ${e.username}`}><span aria-hidden="true" className="ico ico--trash"></span></button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}


