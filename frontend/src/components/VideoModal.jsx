import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const VideoModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-zinc-800"
            >
              <X size={24} />
            </Button>
          </div>
        </DialogHeader>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          {embedUrl ? (
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
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Open in New Tab
                  </a>
                )}
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

          {/* External Link */}
          {project.videoUrl && (
            <div className="pt-2">
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors"
              >
                <ExternalLink size={16} />
                Watch on Original Platform
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;