import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PhotoContextType {
  customPhotos: Record<string, string>;
  registerUploadedPhotos: (files: FileList | File[]) => void;
  getPhotoSrc: (filename: string) => string;
  hasCustomPhoto: (filename: string) => boolean;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load cached photo dataUrls from session if available
    try {
      const saved = sessionStorage.getItem('rangbastra_photos');
      if (saved) {
        setCustomPhotos(JSON.parse(saved));
      }
    } catch {
      // Ignore sessionStorage issues in sandboxes
    }
  }, []);

  const registerUploadedPhotos = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setCustomPhotos((prev) => {
            const updated = {
              ...prev,
              [file.name]: result,
              // Also map without extension or normalized
              [file.name.toLowerCase()]: result,
            };
            try {
              sessionStorage.setItem('rangbastra_photos', JSON.stringify(updated));
            } catch {
              // quota limits
            }
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const getPhotoSrc = (filename: string): string => {
    if (!filename) return '/images/products/product-1.jpg';
    if (customPhotos[filename]) return customPhotos[filename];
    if (customPhotos[filename.toLowerCase()]) return customPhotos[filename.toLowerCase()];

    // If already absolute URL or root-relative path
    if (filename.startsWith('/') || filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }

    // Direct mapping from original filenames to production public assets
    const nameMap: Record<string, string> = {
      'img-20260917-wa0002.jpg': '/images/products/product-1.jpg',
      'img-20260917-wa0001.jpg': '/images/products/product-2.jpg',
      'img-20260917-wa0003.jpg': '/images/products/product-3.jpg',
      'img-20260917-wa0004.jpg': '/images/products/product-4.jpg',
      'img-20260917-wa0005.jpg': '/images/products/product-5.jpg',
      'img-20260917-wa0006.jpg': '/images/products/product-6.jpg',
      'img-20260917-wa0000.jpg': '/images/products/product-7.jpg',
      'product-1.jpg': '/images/products/product-1.jpg',
      'product-2.jpg': '/images/products/product-2.jpg',
      'product-3.jpg': '/images/products/product-3.jpg',
      'product-4.jpg': '/images/products/product-4.jpg',
      'product-5.jpg': '/images/products/product-5.jpg',
      'product-6.jpg': '/images/products/product-6.jpg',
      'product-7.jpg': '/images/products/product-7.jpg',
    };

    const key = filename.toLowerCase();
    if (nameMap[key]) {
      return nameMap[key];
    }

    // Default to public images directory
    return `/images/products/${filename}`;
  };

  const hasCustomPhoto = (filename: string): boolean => {
    return Boolean(customPhotos[filename] || customPhotos[filename.toLowerCase()]);
  };

  return (
    <PhotoContext.Provider
      value={{
        customPhotos,
        registerUploadedPhotos,
        getPhotoSrc,
        hasCustomPhoto,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
};
