
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    username: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    { id: 1, quote: "Impressed by the professionalism and attention to detail.", name: "Guy Hawkins", username: "@guyhawkins", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 2, quote: "A seamless experience from start to finish. Highly recommend!", name: "Karla Lynn", username: "@karlalynn8", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 3, quote: "Reliable and trustworthy. Made my life so much easier!", name: "Jane Cooper", username: "@janecooper", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 4, quote: "The level of service exceeded my expectations. Will definitely come back.", name: "Robert Chen", username: "@robertchen", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 5, quote: "An innovative approach that truly solved my problems.", name: "Sarah Miller", username: "@sarahmiller", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
];

const getVisibleCount = (width: number): number => {
    if (width >= 1280) return 3;
    if (width >= 768) return 2;
    return 1;
};

// Avatar com <img> e fallback
const AvatarImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    return (
        <img
            width={48}
            height={48}
            src={imgSrc}
            alt={alt}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
            onError={(e) => {
                // defina um fallback que exista no seu /public ou use um data URL simples
                setImgSrc("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect width='100%' height='100%' fill='%23e5e7eb'/></svg>");
            }}
            referrerPolicy="no-referrer"
        />
    );
};

const TestimonialSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const oldVisible = getVisibleCount(windowWidth);
            const nextVisible = getVisibleCount(newWidth);
            setWindowWidth(newWidth);
            if (oldVisible !== nextVisible) {
                const maxIndexForNew = Math.max(0, testimonials.length - nextVisible);
                setCurrentIndex((prev) => Math.min(prev, maxIndexForNew));
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const tick = () => {
            const visibleCount = getVisibleCount(windowWidth);
            const maxIndex = Math.max(0, testimonials.length - visibleCount);
            setCurrentIndex((prev) => {
                if (prev >= maxIndex) {
                    setDirection(-1);
                    return Math.max(prev - 1, 0);
                }
                if (prev <= 0) {
                    setDirection(1);
                    return Math.min(prev + 1, maxIndex);
                }
                return Math.min(Math.max(prev + direction, 0), maxIndex);
            });
        };
        autoPlayRef.current = setInterval(tick, 4000);
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isAutoPlaying, windowWidth, direction]);

    const visibleCount = getVisibleCount(windowWidth);
    const maxIndex = Math.max(0, testimonials.length - visibleCount);
    const canGoNext = currentIndex < maxIndex;
    const canGoPrev = currentIndex > 0;

    const pauseAutoPlay = () => {
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 8000);
    };

    const goNext = () => {
        if (!canGoNext) return;
        setDirection(1);
        setCurrentIndex((p) => Math.min(p + 1, maxIndex));
        pauseAutoPlay();
    };
    const goPrev = () => {
        if (!canGoPrev) return;
        setDirection(-1);
        setCurrentIndex((p) => Math.max(p - 1, 0));
        pauseAutoPlay();
    };

    const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
        const t = 30;
        if (info.offset.x < -t && canGoNext) goNext();
        else if (info.offset.x > t && canGoPrev) goPrev();
    };

    const goToSlide = (i: number) => {
        setDirection(i > currentIndex ? 1 : -1);
        setCurrentIndex(i);
        pauseAutoPlay();
    };

    return (
        <div className="px-4 py-8 sm:py-16 bg-[#0B0C10] dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-[#C8A24A] text-[#0B0C10] font-medium text-xs sm:text-sm uppercase tracking-wider">
                        Testimonials
                    </span>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3 sm:mt-4 px-4">
                        Transformative <span className="text-[#C8A24A]">Student Experiences</span>
                    </h3>

                    <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-primary/70 dark:from-primary-light dark:to-primary mx-auto mt-4 sm:mt-6" />
                </motion.div>

                <div className="relative">
                    <div className="flex justify-center sm:justify-end sm:absolute sm:-top-16 right-0 space-x-2 mb-4 sm:mb-0">
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                            onClick={goPrev} disabled={!canGoPrev}
                            className={`p-2 rounded-full ${canGoPrev ? "bg-[#121317] hover:bg-gray-50 dark:hover:bg-gray-600 text-[#C8A24A] dark:text-primary-light" : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"} transition-all duration-300`}
                            aria-label="Previous testimonial">
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                            onClick={goNext} disabled={!canGoNext}
                            className={`p-2 rounded-full ${canGoNext ? "bg-[#121317] hover:bg-gray-50 dark:hover:bg-gray-600 text-[#C8A24A] dark:text-primary-light" : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"} transition-all duration-300`}
                            aria-label="Next testimonial">
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                    </div>

                    <div className="overflow-hidden relative px-2 sm:px-0">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
                            transition={{ type: "spring", stiffness: 70, damping: 20 }}
                        >
                            {testimonials.map((t) => (
                                <motion.div
                                    key={t.id}
                                    className={`flex-shrink-0 w-full ${visibleCount === 3 ? "md:w-1/3" : visibleCount === 2 ? "md:w-1/2" : "w-full"
                                        } p-2`}
                                    initial={{ opacity: 0.5, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={handleDragEnd}
                                    whileHover={{ y: -10 }}         // mesmo efeito do service card
                                    style={{ cursor: "grab" }}
                                >
                                    {/* === CARD: mesmo design do Service === */}
                                    <motion.div
                                        className="relative overflow-hidden rounded-3xl p-8 h-full
                 bg-[#121317] border border-transparent
                 hover:border-[#C8A24A] transition-colors duration-300 group"
                                    >
                                        {/* “Icon badge” dourado no topo (como no Service) */}
                                        <div className="mb-6">
                                            <div className="w-16 h-16 rounded-full bg-[#C8A24A] 
                        flex items-center justify-center
                        transition-transform duration-300 group-hover:scale-110">
                                                <Quote size={28} className="text-[#0B0C10]" />
                                            </div>
                                        </div>

                                        {/* Conteúdo */}
                                        <div className="space-y-4">
                                            <p className="text-base text-white leading-relaxed">
                                                &ldquo;{t.quote}&rdquo;
                                            </p>

                                            {/* Linha/Separador opcional para reforçar o layout */}
                                            <div className="pt-4 border-t border-white/10" />

                                            {/* Autor */}
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <AvatarImage src={t.avatar} alt={t.name} />
                                                    {/* halo suave, combinando com o dourado */}
                                                    <motion.div
                                                        className="absolute inset-0 rounded-full"
                                                        style={{ backgroundColor: "rgba(200, 162, 74, 0.25)" }} // #C8A24A com alpha
                                                        animate={{ scale: [1, 1.15, 1], opacity: [0, 0.35, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <h4 className="font-bold text-white">{t.name}</h4>
                                                    <p className="text-sm text-gray-400">{t.username}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>    
                    </div>

                    <div className="flex justify-center mt-6 sm:mt-8">
                        {Array.from({ length: Math.max(1, testimonials.length - visibleCount + 1) }, (_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className="relative mx-1 focus:outline-none"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Go to testimonial ${i + 1}`}
                            >
                                <motion.div
                                    className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-primary dark:bg-primary-light" : "bg-gray-300 dark:bg-gray-600"}`}
                                    animate={{ scale: i === currentIndex ? [1, 1.2, 1] : 1 }}
                                    transition={{ duration: 1.5, repeat: i === currentIndex ? Infinity : 0, repeatDelay: 1 }}
                                />
                                {i === currentIndex && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-primary/30 dark:bg-primary-light/30"
                                        animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;
