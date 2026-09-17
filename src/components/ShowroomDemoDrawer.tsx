import React, { useState } from 'react';
import { Sparkles, Upload, MessageCircle, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { BRAND_DETAILS, PRODUCTS } from '../data/products';

export const ShowroomDemoDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { registerUploadedPhotos, customPhotos } = usePhotos();
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      registerUploadedPhotos(files);
    }
  };

  const loadedCount = Object.keys(customPhotos).length;

  return (
    <div id="demo-showcase-bar" className="w-full bg-[#0D0D0D] border-b border-[#C5A880]/30 text-[#E0DDD5] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
          <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium">
            Demo Showcase for Bhagirathi &bull; Rangbastra Showroom
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-[11px] tracking-wider uppercase text-[#F5F2EC] hover:text-[#C5A880] transition-colors py-0.5"
          >
            <span>{isOpen ? 'Close Demo Guide' : 'Sales Demo Guide & Photo Sync'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="px-4 py-4 bg-[#141414] border-t border-white/10 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Owner & Brand Specs */}
            <div className="p-3 bg-[#1A1A1A] rounded-xs border border-white/5 space-y-1.5">
              <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase block">
                1. Brand & Contact Clarity
              </span>
              <p className="text-xs text-[#F5F2EC] font-serif text-sm">
                Brand: <strong className="font-normal text-[#C5A880] uppercase tracking-wider">RANGBASTRA</strong>
              </p>
              <p className="text-xs text-[#A0A0A0]">
                Contact / Owner: <strong className="text-[#F5F2EC] font-normal">Bhagirathi</strong>
              </p>
              <p className="text-[11px] text-[#808080]">
                Strictly adhering to business identity: Rangbastra is the brand; Bhagirathi is the founder/curator.
              </p>
            </div>

            {/* WhatsApp Integration */}
            <div className="p-3 bg-[#1A1A1A] rounded-xs border border-white/5 space-y-1.5">
              <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase block">
                2. Direct WhatsApp Conversion
              </span>
              <p className="text-[11px] text-[#A0A0A0]">
                Every product generates a pre-formatted WhatsApp enquiry:
              </p>
              <div className="p-2 bg-[#0F0F0F] rounded-xs border border-[#25D366]/30 text-[11px] text-[#25D366] italic">
                "Hi Rangbastra, I'm interested in the [Product] priced at ₹[Price]. Please share more details."
              </div>
            </div>

            {/* Photo Sync Option for Owner Preview */}
            <div
              className={`p-3 rounded-xs border transition-colors flex flex-col justify-between ${
                dragActive ? 'bg-[#252525] border-[#C5A880]' : 'bg-[#1A1A1A] border-white/5'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleFiles(e.dataTransfer.files);
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase block">
                    3. Live Photo Sync (Optional)
                  </span>
                  {loadedCount > 0 && (
                    <span className="text-[10px] text-[#25D366] flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> {loadedCount} active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#A0A0A0] mt-1">
                  Drag & drop the 7 original camera files here if viewing on a device without files copied to public.
                </p>
              </div>

              <label className="mt-3 inline-flex items-center justify-center gap-2 py-1.5 px-3 bg-[#222] hover:bg-[#2a2a2a] text-[#F5F2EC] rounded-xs border border-white/10 text-xs cursor-pointer transition-colors">
                <Upload className="w-3 h-3 text-[#C5A880]" />
                <span>Select JPG Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
