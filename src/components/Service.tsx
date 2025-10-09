import { Heart, Briefcase, Edit, Calendar, Video, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion'



const Services = () => {


    const services = [
        {
            icon: Heart,
            title: 'Portraits',
            description: 'Professional headshots and personal portraits that capture your unique personality and style.',
            features: ['Studio & Location', 'Professional Lighting', 'Retouching Included'],
        },
        {
            icon: Heart,
            title: 'Weddings',
            description: 'Elegant wedding photography that tells your love story with artistic vision and emotion.',
            features: ['Full Day Coverage', 'Two Photographers', 'Online Gallery'],
        },
        {
            icon: Briefcase,
            title: 'Commercial',
            description: 'High-impact commercial photography for brands, products, and corporate communications.',
            features: ['Brand Photography', 'Product Shoots', 'Corporate Events'],
        },
        {
            icon: Edit,
            title: 'Editorial',
            description: 'Fashion and lifestyle editorial photography for magazines, campaigns, and publications.',
            features: ['Fashion Shoots', 'Lifestyle Content', 'Magazine Quality'],
        },
        {
            icon: Calendar,
            title: 'Events',
            description: 'Professional event photography that captures the energy and important moments.',
            features: ['Corporate Events', 'Private Parties', 'Same-Day Delivery'],
        },
        {
            icon: Video,
            title: 'Videography',
            description: 'Cinematic video production for weddings, events, and commercial projects.',
            features: ['4K Quality', 'Drone Footage', 'Professional Editing'],
        },
    ];

    return (
        <section id='Servicos' className="py-20 bg-[#0B0C10]">
            <div className="container px-4 mx-auto h-full">
                <div className="text-center mb-20">
                    <h2 className='text-4xl md:text-5xl font-display font-bold text-white mb-6'>
                        My  <span className='text-[#C8A24A]'>Services</span>
                    </h2>
                    <p className='text-lg text-white mb-6 leading-relaxed'>De retratos íntimos a grandes celebrações, ofereço uma gama completa de serviços fotográficos adaptados para atender à sua visão e necessidades únicas.</p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-[#121317] rounded-3xl p-8 group cursor-pointer border border-transparent hover:border-[#C8A24A] transition-colors duration-300"
                        >
                            <div className="mb-6">
                                <div className="w-16 h-16 rounded-full bg-[#C8A24A] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <service.icon size={28} className="text-background" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-display font-bold text-white transition-colors duration-300 group-hover:text-[#C8A24A]">
                                    {service.title}
                                </h3>

                                <p className="text-white leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="text-sm text-gray-500 flex items-center">
                                            <div className="w-1.5 h-1.5 bg-[#C8A24A] rounded-full mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <motion.div
                                    className="pt-4"
                                    whileHover={{ x: 5 }}
                                >
                                    <button className="text-[#C8A24A] hover:text-[#a8842f] transition-colors duration-200 flex items-center font-medium">
                                        See details
                                        <ArrowRight size={16} className="ml-2" />
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-white mb-8">
                        Ready to create something amazing together?
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#C8A24A] px-3 py-2 rounded-2xl font-semibold cursor-pointer"
                    >
                        Book a Consultation
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Services