

import { motion } from "framer-motion";
import { Award, Users, MapPin, Calendar } from 'lucide-react'
import Fotografo from '../assets/Fotografo.png'



const About = () => {
    const stats = [
        { icon: Calendar, number: '8+', label: 'Years Experience' },
        { icon: MapPin, number: '15+', label: 'Cities' },
        { icon: Users, number: '500+', label: 'Happy Clients' },
        { icon: Award, number: '25+', label: 'Award Won' },
    ]

    return (
        <section id="about" className="py-20 bg-[#121317]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={Fotografo}
                                alt="Alexandre - Professional Photographer"
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                        </div>

                        {/* Floating Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-8 -right-8 bg-[#0B0C10] rounded-2xl p-6 shadow-elegant"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-center"
                                    >
                                        <stat.icon className="mx-auto mb-2 text-[#C8A24A]" size={20} />
                                        <div className="text-2xl font-bold text-white">{stat.number}</div>
                                        <div className="text-xs text-gray-500">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
                            >
                                I'm very talented.{' '}
                                <span className="text-[#C8A24A]">Check what I can do!</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="text-lg text-white mb-6 leading-relaxed"
                            >
                                Com mais de 8 anos de experiência, especializo-me em capturar momentos únicos
                                que contam histórias autênticas. Meu trabalho combina técnica apurada com
                                sensibilidade artística, resultando em imagens que transcendem o comum.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="text-lg text-white leading-relaxed"
                            >
                                Cada projeto é uma oportunidade de explorar novas perspectivas e criar
                                conexões genuínas com meus clientes. Seja um retrato íntimo, um casamento
                                emocionante ou uma campanha editorial impactante, meu objetivo é sempre
                                superar expectativas.
                            </motion.p>
                        </div>

                      
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center cursor-pointer justify-center h-11 px-5 rounded-xl font-medium
             border transition-colors active:scale-95
             text-[#C8A24A] hover:bg-[#C8A24A] hover:text-black"
                            >
                                Let's work together
                            </motion.button>

                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section >
    )
}
export default About 