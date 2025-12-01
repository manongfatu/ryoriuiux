'use client';

export default function DashboardHome() {
  const today = new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="dash-content">
      {/* Store header */}
      <section className="dash-section" aria-labelledby="store-title">
        <div className="section-head" style={{ justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 id="store-title" className="section-title">Ryori Store</h2>
            <p className="section-subtitle">Mintal Branch</p>
          </div>
          <p className="section-subtitle" aria-hidden="true" style={{ visibility: 'hidden' }}>{today}</p>
        </div>
        <div className="grid grid--4">
          <article className="kpi kpi--brand" aria-label="Total menus">
            <div className="kpi-top">
              <span className="kpi-label">Total Menus</span>
              <span aria-hidden="true" className="ico ico--menu"></span>
            </div>
            <div className="kpi-value">5</div>
          </article>
          <article className="kpi kpi--brand" aria-label="Total orders">
            <div className="kpi-top">
              <span className="kpi-label">Total Orders</span>
              <span aria-hidden="true" className="ico ico--orders"></span>
            </div>
            <div className="kpi-value">291</div>
          </article>
          <article className="kpi kpi--brand" aria-label="Total customers">
            <div className="kpi-top">
              <span className="kpi-label">Total Customers</span>
              <span aria-hidden="true" className="ico ico--user"></span>
            </div>
            <div className="kpi-value">291</div>
          </article>
          <article className="kpi kpi--brand" aria-label="Total revenues">
            <div className="kpi-top">
              <span className="kpi-label">Total Revenues</span>
              <span aria-hidden="true" className="ico ico--cash"></span>
            </div>
            <div className="kpi-value">185682.75</div>
          </article>
        </div>
      </section>

      <section className="dash-section" aria-labelledby="summary-and-consumption">
        <div className="grid grid--2">
          <article className="card card--stretch" aria-labelledby="order-summary-title">
            <div className="card-head">
              <h3 id="order-summary-title">Order Summary</h3>
              <div className="summary-filters">Monthly <span aria-hidden="true">|</span> Weekly <span aria-hidden="true">|</span> Today</div>
            </div>
            <div className="summary-grid">
              {[
                {label: 'Draft', color: 'draft'},
                {label: 'Cooking', color: 'cooking'},
                {label: 'Served', color: 'served'},
                {label: 'Waiting for Payment', color: 'waiting'},
                {label: 'Done', color: 'done'},
                {label: 'Cancelled', color: 'cancelled'}
              ].map(item => (
                <div className={`summary-item summary--${item.color}`} key={item.label}>
                  <div className="summary-value">0</div>
                  <div className="summary-label">{item.label}</div>
                </div>
              ))}
            </div>
          </article>
          <article className="card card--stretch" aria-labelledby="consumption-title">
            <div className="card-head">
              <h3 id="consumption-title">Consumption</h3>
            </div>
            <div className="donut-wrap" role="img" aria-label="Consumption donut chart">
              <div className="donut" style={{ background: 'conic-gradient(#10b981 0 209deg, #ef4444 0)' }}>
                <div className="donut-inner">
                  <div className="donut-label">
                    <div><strong>290</strong> of <strong>500</strong></div>
                    <div className="donut-sub">Transactions</div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Notifications */}
      <section className="dash-section" aria-labelledby="notes-title">
        <div className="card">
          <div className="card-head">
            <h3 id="notes-title">Notifications</h3>
          </div>
          <ul className="notes" role="list">
            {Array.from({ length: 3 }).map((_, i) => (
              <li className="note-item" key={i}>
                <div className="note-main">
                  <div className="note-from"><strong>From</strong></div>
                  <div className="note-text">Unlock Request: Inventory item #Roasted Beans</div>
                </div>
                <div className="note-actions">
                  <button className="btn btn--sm">Unlock</button>
                  <span className="note-time">9 months ago</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}


