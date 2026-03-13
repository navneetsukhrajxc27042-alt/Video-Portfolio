import React, { useState } from 'react';
import { Play, Image as ImageIcon, Filter } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { portfolioProjects, graphicDesigns } from '../data/mock';
import VideoModal from './VideoModal';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const allProjects = [...portfolioProjects, ...graphicDesigns];

  const categories = ['All', 'Shorts', 'Motion Graphics', 'Documentary', 'Graphic Design'];

  const filteredProjects =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-6xl md:text-7xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
              Featured
            </span>
            <span className="text-white"> Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A curated selection of my best video editing and motion graphics projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Filter className="text-gray-500" size={20} />
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? 'default' : 'outline'}
              className={
                activeFilter === category
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white border-0'
                  : 'border-gray-700 text-gray-300 hover:border-red-500 hover:text-white bg-transparent'
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="bg-zinc-900 border-zinc-800 overflow-hidden group cursor-pointer hover:border-red-500 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.category === 'Graphic Design' ? (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="text-white" size={48} />
                        <span className="text-white text-sm font-medium">View Design</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-4 bg-red-600/90 rounded-full">
                          <Play className="text-white fill-white" size={32} />
                        </div>
                        <span className="text-white text-sm font-medium">Watch Video</span>
                      </div>
                    )}
                  </div>
                </div>
                {project.duration && (
                  <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-white text-xs">
                    {project.duration}
                  </div>
                )}
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <Badge className="mb-3 bg-red-600/20 text-red-500 border-red-600/30">
                  {project.category}
                </Badge>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((tool, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-500 bg-zinc-800 px-2 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} displayed
          </p>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </section>
  );
};

export default Portfolio;