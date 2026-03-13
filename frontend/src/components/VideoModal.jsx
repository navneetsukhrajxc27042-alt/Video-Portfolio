import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const VideoModal = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  // Check if project has multiple images (graphic design with gallery)
  const hasImageGallery = project.images && project.images.length > 0;
  const isGraphicDesign = project.category === 'Graphic Design';

  // Function to get embeddable video URL
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }

    // Google Drive
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/[-\w]{25,}/);
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId[0]}/preview`;
      }
    }

    // Direct video URL (MP4, WEBM, etc.)
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return url;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(project.videoUrl);
  const isDirect = project.videoUrl?.match(/\.(mp4|webm|ogg)$/i);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleModalClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-5xl bg-zinc-900 border-zinc-800 text-white p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-zinc-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white mb-2">
                {project.title}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <Badge className="bg-red-600/20 text-red-500 border-red-600/30">
                  {project.category}
                </Badge>
                {project.duration && (
                  <span className="text-sm text-gray-400">{project.duration}</span>
                )}
                {hasImageGallery && (
                  <span className="text-sm text-gray-400">
                    {currentImageIndex + 1} / {project.images.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content Area */}
        <div className="relative aspect-video bg-black">
          {hasImageGallery ? (
            // Image Gallery with Navigation
            <div className="relative w-full h-full">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <Button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-3"
                    size="icon"
                  >
                    <ChevronLeft size={24} />
                  </Button>
                  <Button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-3"
                    size="icon"
                  >
                    <ChevronRight size={24} />
                  </Button>
                </>
              )}

              {/* Thumbnail Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-red-500 w-8'
                        : 'bg-gray-400 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : isGraphicDesign ? (
            // Single Image for Graphic Design
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          ) : embedUrl ? (
            // Video Player
            isDirect ? (
              <video
                src={embedUrl}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={project.title}
              ></iframe>
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <p className="text-gray-400">Video URL not available or invalid format</p>
              </div>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="p-6 space-y-4">
          <p className="text-gray-300 leading-relaxed">{project.description}</p>

          {/* Software Used */}
          {project.software && project.software.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Software Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.software.map((tool, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-300 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
