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
    if (customPhotos[filename]) return customPhotos[filename];
    if (customPhotos[filename.toLowerCase()]) return customPhotos[filename.toLowerCase()];
    // Default to direct asset path
    return `/${filename}`;
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
