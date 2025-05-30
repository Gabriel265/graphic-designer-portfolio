import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Mail, Download, ExternalLink, Globe, Camera, Palette, Code, ChevronLeft, ChevronRight } from 'lucide-react';

const ModernPortfolioWebsite = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [galleryScrollPosition, setGalleryScrollPosition] = useState(0);
  const videoRef = useRef(null);
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const touchStartX = useRef(null);



  const imageData = [
  { filename: 'Lazybee.jpg', tag: 'Logos' },
  { filename: 'Lazybee_2.jpg', tag: 'Logos' },
  { filename: 'wedding_1.jpg', tag: 'Posters' },
  { filename: 'wedding_2.jpg', tag: 'Posters' },
  { filename: 'nike.jpg', tag: 'Branding' },
  { filename: 'nike_2.jpg', tag: 'Branding' },
  { filename: 'Kadion-Systems.jpg', tag: 'Logos' },
  { filename: 'Kaycee-Tutoring.jpg', tag: 'Logos' },
  { filename: 'wedding_3.jpg', tag: 'Posters' },
  { filename: 'wedding_4.jpg', tag: 'Posters' },
  { filename: 'imperfection.jpg', tag: 'Branding' },
  { filename: 'k-dot.jpg', tag: 'Branding' },
  { filename: 'wedding_5.jpg', tag: 'Posters' },
  { filename: 'wedding_6.jpg', tag: 'Posters' },
  { filename: 'wedding_8.jpg', tag: 'Posters' },
  { filename: 'wedding_9.jpg', tag: 'Posters' },
  { filename: 'boxing-day.jpg', tag: 'Branding' },
  { filename: 'contract.jpg', tag: 'Branding' },
  { filename: 'dice.jpg', tag: 'Branding' },
  { filename: 'goal.jpg', tag: 'Branding' },
  { filename: 'kendrick_Lamar.jpg', tag: 'Branding' },
  { filename: 'planet.jpg', tag: 'Branding' }
];

const galleryImages = imageData.map((image, index) => {
  let color;
  switch (image.tag) {
    case 'Logos':
      color = "from-purple-500 to-pink-600";
      break;
    case 'Posters':
      color = "from-orange-500 to-purple-600";
      break;
    case 'Branding':
      color = "from-amber-500 to-red-600";
      break;
    default:
      color = "from-gray-400 to-gray-600";
  }

  return {
    id: index + 1,
    title: image.filename.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
    category: image.tag,
    color,
    src: `/portfolio/${image.filename}`
  };
});

  const navLinks = [
    { icon: Globe, label: "Portfolio", href: "#portfolio" },
    { icon: Camera, label: "Gallery", href: "#gallery" },
    { icon: Palette, label: "Gallery", href: "#gallery" },
    { icon: Code, label: "Projects", href: "#projects" },
    { icon: ExternalLink, label: "Blog", href: "#blog" },
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Gallery navigation functions
  const scrollGalleryLeft = () => {
    if (galleryRef.current) {
      const scrollAmount = 320; // width of one card plus gap
      galleryRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollGalleryRight = () => {
    if (galleryRef.current) {
      const scrollAmount = 320; // width of one card plus gap
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Touch handling for mobile swipe
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    galleryRef.current.touchStartX = touch.clientX;
  };

  const handleTouchMove = (e) => {
    if (!galleryRef.current.touchStartX) return;
    
    const touch = e.touches[0];
    const diff = galleryRef.current.touchStartX - touch.clientX;
    
    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0) {
        scrollGalleryRight();
      } else {
        scrollGalleryLeft();
      }
      galleryRef.current.touchStartX = null;
    }
  };

  const handleTouchEnd = () => {
    galleryRef.current.touchStartX = null;
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-purple-50">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        {/* Paint Splash Artwork */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Orange Paint Splash - Top Right */}
          <div className="absolute top-10 right-10 w-80 h-80 opacity-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M50 100 C50 50, 100 20, 150 50 C180 70, 190 120, 160 150 C130 180, 80 170, 60 140 C40 120, 45 110, 50 100 Z"
                fill="url(#orangeSplash)"
                className="animate-pulse-slow"
              />
              <defs>
                <linearGradient id="orangeSplash" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Medium Purple Paint Splash - Bottom Left */}
          <div className="absolute bottom-20 left-5 w-60 h-60 opacity-15">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M100 50 C120 30, 160 40, 170 80 C180 120, 150 160, 110 170 C70 180, 30 150, 40 110 C50 70, 80 60, 100 50 Z"
                fill="url(#purpleSplash)"
                className="animate-float"
              />
              <defs>
                <linearGradient id="purpleSplash" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Small Amber Paint Drip - Top Left */}
          <div className="absolute top-32 left-20 w-40 h-60 opacity-20">
            <svg viewBox="0 0 100 150" className="w-full h-full">
              <path
                d="M50 20 C60 15, 70 25, 65 40 L60 60 C58 80, 55 100, 50 120 C45 140, 40 145, 35 140 C30 135, 35 120, 40 100 C42 80, 45 60, 40 40 C35 25, 40 15, 50 20 Z"
                fill="url(#amberDrip)"
                className="animate-drip"
              />
              <defs>
                <linearGradient id="amberDrip" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Abstract Paint Stroke - Center Right */}
          <div className="absolute top-1/2 right-5 w-32 h-80 opacity-8 transform -translate-y-1/2 rotate-12">
            <svg viewBox="0 0 50 200" className="w-full h-full">
              <path
                d="M25 10 C30 15, 35 25, 30 40 C25 55, 20 70, 25 85 C30 100, 35 115, 30 130 C25 145, 20 160, 25 175 C30 185, 25 190, 20 185 C15 180, 10 165, 15 150 C20 135, 25 120, 20 105 C15 90, 10 75, 15 60 C20 45, 25 30, 20 15 C18 10, 22 8, 25 10 Z"
                fill="url(#strokeGradient)"
                className="animate-wave"
              />
              <defs>
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Small Paint Dots */}
          <div className="absolute top-40 right-40 w-4 h-4 bg-orange-400 rounded-full opacity-30 animate-ping"></div>
          <div className="absolute bottom-40 right-60 w-3 h-3 bg-purple-500 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-60 left-40 w-5 h-5 bg-amber-500 rounded-full opacity-25 animate-bounce"></div>
        </div>

        {/* Video Card */}
        <div className="relative group mb-16 fade-in-up">
          <div className="relative w-80 h-52 md:w-96 md:h-60 lg:w-[480px] lg:h-72 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl">
            {/* Placeholder Video Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-purple-600 to-amber-700">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-purple-500 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-light">Creative Showcase</h3>
                  <p className="text-sm opacity-80 mt-2">Interactive Experience</p>
                </div>
              </div>
            </div>

           {/* Video Card */}
<div className="relative group mb-16 fade-in-up">
  <div className="relative w-80 h-52 md:w-96 md:h-60 lg:w-[480px] lg:h-72 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl">
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      src="/hero_video.mp4"
      autoPlay
      loop
      muted={isMuted}
      playsInline
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-4">
        <button
          onClick={handlePlayPause}
          className="w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 hover:scale-110"
        >
          {isPlaying ? <Pause className="text-white w-6 h-6" /> : <Play className="text-white w-6 h-6 ml-1" />}
        </button>

        <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
          <button onClick={handleMuteToggle} className="text-white hover:scale-110 transition-transform">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 accent-orange-500"
          />
        </div>
      </div>
    </div>

    {/* Decorative Elements */}
    <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
  </div>
</div>


            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        
        {/* Navigation Buttons */}
<div className="flex flex-wrap justify-center gap-6 fade-in-up">
  {/* Email Button */}
  <a
    href="mailto:gabrielkadiwa@gmail.com"
    className="group flex items-center space-x-3 bg-white bg-opacity-80 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-opacity-100 transition-all duration-300 hover:scale-105 shadow-lg text-gray-800"
  >
    <Mail className="w-5 h-5 text-orange-600 group-hover:text-purple-600 transition-colors" />
    <span className="font-medium">Email Gabriel</span>
  </a>

  {/* Download CV Button */}
  <a
    href="/cv.pdf"
    download
    className="group flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-purple-600 px-6 py-3 rounded-full hover:from-orange-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 text-white shadow-lg"
  >
    <Download className="w-5 h-5 group-hover:animate-bounce" />
    <span className="font-medium">Download CV</span>
  </a>
</div>


        {/* Floating Title */}
        <div className="absolute top-8 left-8 fade-in-up">
          <h1 className="text-2xl md:text-3xl font-light text-gray-800">
            Gabriel's
            <span className="block text-orange-600 font-medium">Portfolio</span>
          </h1>
        </div>
      </section>

     {/* Gallery Section */}
<section className="py-20 px-6 bg-gradient-to-r from-orange-100 via-purple-100 to-amber-100">
  <div className="text-center mb-16 fade-in-up">
    <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
      Featured <span className="text-purple-600">Works</span>
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
      A curated collection of creative projects and artistic endeavors
    </p>
  </div>

  <div className="relative w-full max-w-4xl mx-auto">
<p className="text-gray-600 max-w-2xl mx-auto text-lg">
      Swipe Left or right  for more images...
    </p>
    {/* Navigation Buttons */}
    <button
      onClick={() => setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
      className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white bg-opacity-90 p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
    >
      <ChevronLeft className="w-6 h-6 text-gray-800" />
    </button>

    <button
      onClick={() => setCurrentIndex((prev) => (prev + 1) % galleryImages.length)}
      className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white bg-opacity-90 p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
    >
      <ChevronRight className="w-6 h-6 text-gray-800" />
    </button>

    <div
      className="overflow-hidden w-full h-[400px] relative rounded-xl"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) {
          setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
        } else if (diff < -50) {
          setCurrentIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
          );
        }
        touchStartX.current = null;
      }}
    >
      {galleryImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${
            index === currentIndex
              ? 'opacity-100 rotate-0 scale-100 z-20'
              : 'opacity-0 -rotate-12 scale-95 z-10 pointer-events-none'
          }`}
        >
          <div
            className={`w-full h-full bg-gradient-to-br ${image.color} rounded-xl overflow-hidden relative cursor-pointer`}
            onClick={() => {
              setModalImageSrc(image.src);
              setIsModalOpen(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover opacity-80"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <div className="absolute bottom-0 left-0 p-6 text-white bg-black bg-opacity-40 w-full">
              <p className="text-sm">{image.category}</p>
              <h3 className="text-2xl font-light">{image.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={() =>
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
      }
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-3 rounded-full shadow hover:scale-110 z-10"
    >
      <ChevronRight className="w-6 h-6 text-orange-600" />
    </button>
  </div>
</section>

{/* Modal for enlarged image */}
{isModalOpen && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
    onClick={() => {
      setIsModalOpen(false);
      setModalImageSrc("");
      document.body.style.overflow = 'auto';
    }}
  >
    <img
      src={modalImageSrc}
      alt="Enlarged work"
      className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
    />
  </div>
)}


      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-r from-gray-900 via-purple-900 to-amber-900">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <h3 className="text-3xl font-light text-white mb-8">
            Let's Create <span className="text-orange-400">Together</span>
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:gabrielkadiwa@gmail.com"
              className="group flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm px-8 py-4 rounded-full hover:bg-opacity-20 transition-all duration-300 hover:scale-105 text-white"
            >
              <Mail className="w-5 h-5 group-hover:text-orange-400 transition-colors" />
              <span className="font-medium">Contact via Email</span>
            </a>
            
            <a
              href="/CV_Gabriel_Kadiwa_Graphic_Design.pdf"
              download
              className="group flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-purple-600 px-8 py-4 rounded-full hover:from-orange-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 text-white shadow-lg"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span className="font-medium">Download CV</span>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <p className="text-white text-opacity-60 text-sm">
              © 2025 Creative Portfolio. Crafted with passion and precision.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        
        @keyframes drip {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.1);
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(5px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-drip {
          animation: drip 4s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .fade-in-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Hide scrollbar but allow scrolling */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Custom scrollbar for volume control */
        input[type="range"] {
          background: transparent;
          -webkit-appearance: none;
        }
        
        input[type="range"]::-webkit-slider-track {
          background: rgba(255, 255, 255, 0.3);
          height: 4px;
          border-radius: 2px;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          background: #f97316;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          cursor: pointer;
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .fade-in-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

      `}</style>
    </div>
  );
};

export default ModernPortfolioWebsite;