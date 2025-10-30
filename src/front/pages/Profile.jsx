import React from "react";
import { fakeUsers } from "../assets/FakeUsers";
import "../css/profile_pages.css";
import "../index.css";

export function Profile({ userId = 1 }) {
  const user = fakeUsers.find((u) => u.id === userId) || fakeUsers[0];

  const formatPhone = (n) => {
    if (!n) return "—";
    const s = String(n);
    const last10 = s.slice(-10);
    const m = last10.match(/^(\d{3})(\d{3})(\d{4})$/);
    return m ? `+1 ${m[1]}-${m[2]}-${m[3]}` : `+${s}`;
  };

  return (
    <main className="li-profile-page">
      <div className="li-container">
        {/* Left column: Profile card */}
        <section className="li-card">
          <div className="li-photo-wrap">
            <img
              className="li-photo"
              src={
                user.profile_image ||
                "https://api.dicebear.com/9.x/avataaars/svg?seed=LoveIsland"
              }
              alt={user.username}
              onError={(e) => {
                e.currentTarget.src =
                  "https://api.dicebear.com/9.x/avataaars/svg?seed=Fallback";
              }}
            />
          </div>

          <div className="li-card-body">
            <h2 className="li-title text-pink">@{user.username}</h2>

            <div className="li-row">
              <span className="li-label text-turquoise">Email</span>
              <span className="li-value">{user.email}</span>
            </div>
            <hr className="li-divider" />

            <div className="li-row">
              <span className="li-label text-turquoise">Phone</span>
              <span className="li-value">{formatPhone(user.phonenumber)}</span>
            </div>
            <hr className="li-divider" />

            <div className="li-row">
              <span className="li-label text-turquoise">Favorites</span>
              <span className="li-chip">{user.favorite_islanders.length}</span>
            </div>
          </div>
        </section>

        {/* Right column: Matches + Account */}
        <section className="li-side">
          <div className="li-box">
            <h3 className="li-box-title">My Matches</h3>
            <div className="li-matches">
              {[0, 1].map((i) => (
                <div key={i} className="li-match">
                  <div className="li-match-placeholder" />
                </div>
              ))}
            </div>
          </div>

          <div className="li-box">
            <h3 className="li-box-title">My Love Island’s account</h3>
            <button className="li-danger-btn islander-pink">Delete account</button>
          </div>
        </section>
      </div>
    </main>
  );
}
