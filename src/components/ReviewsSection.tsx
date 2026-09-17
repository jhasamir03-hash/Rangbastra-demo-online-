import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Sparkles, Check } from 'lucide-react';
import { BRAND_REVIEWS } from '../data/products';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(BRAND_REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [occasion, setOccasion] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      reviewer: name.trim(),
      location: city.trim() || 'India',
      occasion: occasion.trim() || 'Navratri Celebration',
      rating,
      date: 'Just now',
      comment: comment.trim(),
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setName('');
    setCity('');
    setOccasion('');
    setComment('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
    }, 1800);
  };

  return (
    <section
      id="reviews-section"
      className="w-full bg-[#FAF8F5] text-[#1C1817] py-20 sm:py-28 border-b border-[rgba(184,147,88,0.22)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#9B2226]/10 text-[#9B2226] text-[10px] font-sans font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#B89358]" />
              <span>CLIENT DIARIES & WORDS</span>
            </div>
            <h2
              id="reviews-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1817] tracking-tight"
            >
              RATINGS & EXPERIENCES
            </h2>
            <p className="text-xs sm:text-sm text-[#574F48] font-sans font-normal mt-2 max-w-lg">
              Read real accounts from clients, brides, and Garba dancers who commissioned bespoke Rangbastra silhouettes.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="write-review-btn"
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[rgba(184,147,88,0.4)] hover:border-[#B89358] text-[#1C1817] text-xs font-sans font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#B89358]" />
              <span>Share Your Review</span>
            </button>
          </div>
        </div>

        {/* Ratings Overview Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8 bg-[#FFFFFF] border border-[rgba(184,147,88,0.25)] rounded-xs mb-12 items-center shadow-sm">
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[rgba(184,147,88,0.2)] pb-6 md:pb-0 md:pr-8">
            <span className="font-serif text-5xl sm:text-6xl text-[#1C1817] font-bold leading-none block">
              4.9
            </span>
            <div className="flex items-center justify-center md:justify-start gap-1 text-[#CA8A04] my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-[#574F48] font-sans font-medium">
              Overall Client Satisfaction &bull; 100% Verified Orders
            </span>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6E6259] block font-sans font-medium">Zardozi & Zari</span>
              <span className="font-serif text-xl text-[#1C1817] font-bold">5.0 / 5.0</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6E6259] block font-sans font-medium">Bespoke Fit</span>
              <span className="font-serif text-xl text-[#1C1817] font-bold">4.9 / 5.0</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6E6259] block font-sans font-medium">Ghera Flare</span>
              <span className="font-serif text-xl text-[#1C1817] font-bold">5.0 / 5.0</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6E6259] block font-sans font-medium">Consultation</span>
              <span className="font-serif text-xl text-[#1C1817] font-bold">5.0 / 5.0</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 bg-[#FFFFFF] border border-[rgba(184,147,88,0.22)] hover:border-[#B89358] rounded-xs space-y-4 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#CA8A04]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#1E7E34] font-sans font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Commission</span>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#574F48] font-normal leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(184,147,88,0.18)] flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="font-bold text-[#1C1817] block">{rev.reviewer}</span>
                  <span className="text-[11px] text-[#6E6259]">{rev.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#B89358] block font-semibold">{rev.occasion}</span>
                  <span className="text-[10px] text-[#6E6259]">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Share Review Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1817]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-lg bg-[#FFFFFF] border border-[rgba(184,147,88,0.35)] p-6 sm:p-8 rounded-xs text-[#1C1817] space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[rgba(184,147,88,0.2)] pb-3">
              <div>
                <h3 className="font-serif text-2xl text-[#1C1817] font-bold">Share Your Client Experience</h3>
                <p className="text-xs text-[#574F48] font-sans">Rangbastra Digital Showroom</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#6E6259] hover:text-[#1C1817] text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-6 bg-[#FAF8F5] border border-[#1E7E34]/40 rounded-xs text-center space-y-2">
                <Check className="w-8 h-8 text-[#1E7E34] mx-auto" />
                <h4 className="font-serif text-xl text-[#1C1817] font-bold">Thank You!</h4>
                <p className="text-xs text-[#574F48] font-sans">
                  Your review has been shared and added to the client diaries.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[#1C1817] font-medium mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Radhika Singhania"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1C1817] font-medium mb-1">City / Country</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai / London"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1C1817] font-medium mb-1">Occasion Worn</label>
                    <input
                      type="text"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      placeholder="e.g. Navratri Garba / Reception"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1C1817] font-medium mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                  >
                    <option value={5}>★★★★★ (5 Stars - Royal & Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars - Highly Satisfied)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#1C1817] font-medium mb-1">Your Thoughts & Experience</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share feedback on zardozi finish, ghera flare volume, consultation with Bhagirathi..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[rgba(184,147,88,0.3)] rounded-xs text-[#1C1817] focus:border-[#B89358] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1C1817] hover:bg-[#332D29] text-[#FFFFFF] font-semibold uppercase tracking-wider text-xs rounded-xs transition-colors cursor-pointer"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
